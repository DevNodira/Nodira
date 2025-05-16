'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from './Header.module.css';

const connection = new Connection('https://api.devnet.solana.com');

export default function WalletDropdown() {
  const { publicKey, connected, disconnect } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      connection.getBalance(publicKey).then((lamports) => {
        setBalance(lamports / 1e9);
      });
    }
  }, [publicKey, connected]);

  if (!connected) {
    return (
      <div className={styles.dropdown}>
        <div className={styles.walletConnect}>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dropdown}>
      <p>Address: <span className={styles.addr}>{publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}</span></p>
      <p>Balance: {balance !== null ? `${balance.toFixed(2)} SOL` : 'Loading...'}</p>
      <button onClick={disconnect} className={styles.disconnect}>Disconnect</button>
    </div>
  );
}