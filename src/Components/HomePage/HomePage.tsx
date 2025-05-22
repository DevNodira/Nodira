import styles from './HomePage.module.css';
import WifiMap from '../WifiMap/WifiMap';
import Features from '../Features/Features';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>🌐 Nodira — Decentralized Wi-Fi Stablecoins</h1>
        <p>
         Nodira is a decentralized platform where users share Wi-Fi access points and earn tokens when others connect. It promotes decentralized internet access while rewarding contributors.
        </p>
        <a href="#mapSection" className={styles.ctaButton}>
          Explore Map
        </a>
      </section>

      <section id="mapSection" className={styles.mapSection}>
        <h2>📍 Community Wi-Fi Map</h2>
        <p>
          Click anywhere on the map to create a new pin. Add a Wi-Fi location that’s token-gated, DAO-managed,
          or community-owned.
        </p>
        <WifiMap />
      </section>
      <Features />
    </div>
  );
}