# =============================================================================
# extract-team-photos.ps1
# -----------------------------------------------------------------------------
# Extrai as 11 fotos da equipe do arquivo equipe.docx e renomeia conforme
# a ordem em que cada pessoa aparece no documento.
#
# Saída: public/equipe/<slug>.jpg (ou .png conforme original)
#
# Uso:
#   pwsh scripts/extract-team-photos.ps1
#   (no Windows) powershell -ExecutionPolicy Bypass -File scripts\extract-team-photos.ps1
# =============================================================================

param(
    [string]$DocxPath = "D:\Projetos_NOVOS\__Raquel___\PLANURBI\____MODIFICOES-PARA-SITE\equipe.docx",
    [string]$OutputDir = (Join-Path $PSScriptRoot "..\public\equipe")
)

# Ordem dos membros conforme aparece no documento (validada na sessão Claude)
$teamOrder = @(
    "melissa",
    "rute",
    "geovane",
    "mariana",
    "jailson",
    "karina",
    "pablo",
    "mayara",
    "ricardo",
    "charles",
    "rafael"
)

# Resolver paths absolutos
$DocxPath = [System.IO.Path]::GetFullPath($DocxPath)
$OutputDir = [System.IO.Path]::GetFullPath($OutputDir)

if (-not (Test-Path $DocxPath)) {
    Write-Error "Arquivo docx nao encontrado: $DocxPath"
    exit 1
}

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
}

Write-Host ""
Write-Host "==> Extraindo fotos da equipe" -ForegroundColor Cyan
Write-Host "    Origem:  $DocxPath"
Write-Host "    Destino: $OutputDir"
Write-Host ""

Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)

try {
    # ---------------------------------------------------------------------
    # 1. Ler document.xml e extrair a SEQUENCIA de rIds das imagens
    # ---------------------------------------------------------------------
    $docEntry = $zip.Entries | Where-Object { $_.FullName -eq "word/document.xml" }
    if (-not $docEntry) {
        throw "word/document.xml nao encontrado no docx"
    }

    $reader = [System.IO.StreamReader]::new($docEntry.Open())
    $docXml = $reader.ReadToEnd()
    $reader.Close()

    # Padroes possiveis: r:embed="rIdN" e r:link="rIdN" (a:blip de DrawingML)
    $rIdMatches = [regex]::Matches($docXml, 'r:embed="([^"]+)"|r:link="([^"]+)"')
    $rIdSequence = @()
    foreach ($m in $rIdMatches) {
        $val = if ($m.Groups[1].Success) { $m.Groups[1].Value } else { $m.Groups[2].Value }
        $rIdSequence += $val
    }

    Write-Host "Imagens referenciadas no fluxo do documento: $($rIdSequence.Count)" -ForegroundColor Yellow

    # ---------------------------------------------------------------------
    # 2. Ler document.xml.rels e construir mapa rId -> arquivo de midia
    # ---------------------------------------------------------------------
    $relsEntry = $zip.Entries | Where-Object { $_.FullName -eq "word/_rels/document.xml.rels" }
    if (-not $relsEntry) {
        throw "word/_rels/document.xml.rels nao encontrado"
    }

    $reader = [System.IO.StreamReader]::new($relsEntry.Open())
    $relsXml = $reader.ReadToEnd()
    $reader.Close()

    $relsMap = @{}
    $relMatches = [regex]::Matches($relsXml, '<Relationship[^>]+Id="([^"]+)"[^>]+Target="([^"]+)"')
    foreach ($m in $relMatches) {
        $relsMap[$m.Groups[1].Value] = $m.Groups[2].Value
    }

    # ---------------------------------------------------------------------
    # 3. Para cada rId na ordem do documento, achar o arquivo de midia
    #    e copiar com o nome da pessoa correspondente.
    # ---------------------------------------------------------------------
    $extracted = 0
    $idx = 0
    foreach ($rId in $rIdSequence) {
        if (-not $relsMap.ContainsKey($rId)) {
            Write-Host "  [pular] rId $rId nao mapeado em rels" -ForegroundColor DarkGray
            continue
        }
        $target = $relsMap[$rId]
        # Targets vem como "media/image1.jpg" -> entry path completo eh "word/media/image1.jpg"
        $entryPath = "word/" + $target.TrimStart('/').Replace('\', '/')

        $mediaEntry = $zip.Entries | Where-Object { $_.FullName -eq $entryPath }
        if (-not $mediaEntry) {
            Write-Host "  [pular] entry nao encontrado: $entryPath" -ForegroundColor DarkGray
            continue
        }

        if ($idx -ge $teamOrder.Count) {
            Write-Host "  [pular] mais imagens que membros conhecidos ($idx >= $($teamOrder.Count))" -ForegroundColor DarkGray
            continue
        }

        $slug = $teamOrder[$idx]
        $ext = [System.IO.Path]::GetExtension($entryPath)
        $outFile = Join-Path $OutputDir ("{0}{1}" -f $slug, $ext)

        # Extrair
        $stream = $mediaEntry.Open()
        $fileStream = [System.IO.File]::Create($outFile)
        $stream.CopyTo($fileStream)
        $fileStream.Close()
        $stream.Close()

        $sizeKB = [math]::Round($mediaEntry.Length / 1024, 1)
        Write-Host ("  [{0,2}] {1,-10} <- {2,-20} ({3,7} KB)" -f ($idx + 1), $slug, (Split-Path $entryPath -Leaf), $sizeKB) -ForegroundColor Green

        $idx++
        $extracted++
    }

    Write-Host ""
    if ($extracted -eq $teamOrder.Count) {
        Write-Host "OK: $extracted/$($teamOrder.Count) fotos extraidas." -ForegroundColor Green
    }
    else {
        Write-Host "ATENCAO: extraidas $extracted de $($teamOrder.Count) esperadas. Revisar manualmente." -ForegroundColor Yellow
    }
    Write-Host ""
}
finally {
    $zip.Dispose()
}
