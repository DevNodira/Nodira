import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnect: React.FC = () => {
  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default WalletConnect;