import WalletContextProvider from './Components/WalletContextProvider';
import HomePage from './Components/HomePage/HomePage';
import Header from './Components/Header/Header';

function App() {
  return (
    <WalletContextProvider>
      <Header />
      <HomePage />
    </WalletContextProvider>
  );
}

export default App;