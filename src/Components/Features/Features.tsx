'use client';

import styles from './Features.module.css';

const features = [
  {
    title: 'Connect to Local Wi-Fi',
    description: 'Instantly find nearby Wi-Fi spots and unlock access with crypto payments.',
    icon: '📡',
  },
  {
    title: 'Earn by Sharing',
    description: 'Add your Wi-Fi and earn tokens every time someone connects to it.',
    icon: '💰',
  },
  {
    title: 'Powered by Solana',
    description: 'Fast, cheap and secure payments on the Solana blockchain.',
    icon: '⚡',
  },
];

export default function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.heading}>Features</h2>
      <div className={styles.grid}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}