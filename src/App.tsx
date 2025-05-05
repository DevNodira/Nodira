import React from 'react';
import WalletContextProvider from './Components/WalletContextProvider';
import WalletConnect from './Components/WalletConnect';
import WifiMap from './Components/WifiMap/WifiMap';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <WalletContextProvider>
        <WalletConnect />
        <HomePage />
    </WalletContextProvider>
  );
}

export default App;