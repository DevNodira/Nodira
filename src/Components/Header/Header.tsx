'use client';

import { useState } from 'react';
import styles from './Header.module.css'
import WalletDropdown from './WalletDropdown';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Nodira<span className={styles.dot}>.</span>
      </div>
      <div className={styles.profileWrapper}>
        <button onClick={toggleDropdown} className={styles.profileButton}>
          <img src="/profile-icon.svg" alt="Profile" />
        </button>
        {dropdownOpen && <WalletDropdown />}
      </div>
    </header>
  );
}