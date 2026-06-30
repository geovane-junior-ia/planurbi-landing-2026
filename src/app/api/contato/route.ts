import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  nome: string;
  municipio: string;
  cargo?: string;
  email: string;
  tipo?: string;
  mensagem?: string;
};

const escapeHtml = (raw: string) =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function buildEmailBody(c: ContactPayload) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Novo contato pela landing PlanUrbi</title>
</head>
<body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#172d28;">
    <h2 style="font-family:Arial,Helvetica,sans-serif;color:#00362D;">Novo contato pela landing PlanUrbi</h2>
    <table style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;border-collapse:collapse;">
      <tr><td style="padding:4px 8px;color:#666;">Nome</td><td style="padding:4px 8px;"><strong>${escapeHtml(c.nome)}</strong></td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Município</td><td style="padding:4px 8px;"><strong>${escapeHtml(c.municipio)}</strong></td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Cargo/órgão</td><td style="padding:4px 8px;">${escapeHtml(c.cargo || '—')}</td></tr>
      <tr><td style="padding:4px 8px;color:#666;">E-mail</td><td style="padding:4px 8px;"><a href="mailto:${encodeURIComponent(c.email)}">${escapeHtml(c.email)}</a></td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Tipo de demanda</td><td style="padding:4px 8px;">${escapeHtml(c.tipo || '—')}</td></tr>
    </table>
    <h3 style="font-family:Arial,Helvetica,sans-serif;color:#00362D;margin-top:24px;">Mensagem</h3>
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(c.mensagem || '—')}</p>
    <hr style="margin:24px 0;border:none;border-top:1px solid #ddd;" />
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#888;">
      Enviado automaticamente pela landing page do PlanUrbi.<br/>
      Para responder, basta usar "Responder" — o e-mail vai direto para o remetente.
    </p>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;
    const nome = (body.nome || '').trim();
    const municipio = (body.municipio || '').trim();
    const email = (body.email || '').trim();
    const cargo = (body.cargo || '').trim();
    const tipo = (body.tipo || '').trim();
    const mensagem = (body.mensagem || '').trim();

    if (!nome || !municipio || !email) {
      return NextResponse.json(
        { error: 'Nome, município e e-mail são obrigatórios.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY ausente. Configure nas env vars do Vercel.');
      return NextResponse.json(
        { error: 'Servidor de e-mail não configurado.' },
        { status: 500 },
      );
    }

    const from = process.env.CONTATO_EMAIL_FROM || 'PlanUrbi <onboarding@resend.dev>';
    const to = process.env.CONTATO_EMAIL_TO || 'contato@planurbi.com.br';

    const payload = {
      nome,
      municipio,
      cargo,
      email,
      tipo,
      mensagem,
    };

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Novo contato do Formulário PlanUrbi — ${municipio}`,
        html: buildEmailBody(payload),
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      console.error('Resend respondeu com falha:', resp.status, detail);
      return NextResponse.json(
        { error: 'Não foi possível enviar agora. Tente novamente em instantes.' },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { message: 'Contato enviado com sucesso!' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro inesperado ao processar contato:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao enviar sua solicitação.' },
      { status: 500 },
    );
  }
}
