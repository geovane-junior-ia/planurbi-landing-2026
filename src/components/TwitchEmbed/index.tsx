'use client';

import styles from './TwitchEmbed.module.css';

interface TwitchEmbedProps {
  channelName: string;
}

/**
 * Componente para incorporar uma transmissão da Twitch de forma responsiva.
 * Ele usa o hostname atual para o parâmetro 'parent', necessário pela API da Twitch.
 */
const TwitchEmbed = ({ channelName }: TwitchEmbedProps) => {
  // Garante que window.location.hostname só seja acessado no lado do cliente.
  const parentDomain = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  return (
    <div className={styles.embedContainer}>
      <iframe
        src={`https://player.twitch.tv/?channel=${channelName}&parent=${parentDomain}&autoplay=true&muted=false`}
        height="100%"
        width="100%"
        allowFullScreen={true}
        title={`Transmissão da Twitch do canal ${channelName}`}
        className={styles.iframe}
      ></iframe>
    </div>
  );
};

export default TwitchEmbed;