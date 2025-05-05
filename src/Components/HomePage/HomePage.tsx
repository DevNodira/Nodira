import styles from './HomePage.module.css';
import WifiMap from '../WifiMap/WifiMap';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>🌐 Locura — Decentralized Wi-Fi Stablecoins</h1>
        <p>
          Locura enables DAOs and local communities to create purpose-driven stablecoins,
          powered by Solana and accessible through interactive map-based tools.
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
    </div>
  );
}