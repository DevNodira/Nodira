import React from 'react';
import WalletContextProvider from './Components/WalletContextProvider';
import WalletConnect from './Components/WalletConnect';

function App() {
  return (
    <WalletContextProvider>
      <div className="App">
        <h1>Добро пожаловать в Nodira</h1>
        <WalletConnect />
      </div>
    </WalletContextProvider>
  );
}

export default App;