import React from 'react';
import WalletContextProvider from './Components/WalletContextProvider';
import WalletConnect from './Components/WalletConnect';
import WifiMap from './Components/WifiMap/WifiMap';

function App() {
  return (
    <WalletContextProvider>
      <div className="App">
        {/* <h1>Добро пожаловать в Nodira</h1> */}
        {/* <WalletConnect /> */}
        <WifiMap />
      </div>
    </WalletContextProvider>
  );
}

export default App;