import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Web3 from 'web3';

import Layout from './parts/Layout';
import Create from './pages/Create';
import Posts from './pages/Posts';
import PostDetail from './pages/Posts/PostDetail';

import './App.css';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(undefined);

  useEffect(() => {
    updateWeb3Environment();
  }, [web3Provider]);

  const updateWeb3Environment = () => {
    try {
      if (web3Provider) {
        web3Provider.on('accountsChanged', handleAccountsChanged);
      }
      if (window.ethereum) {
        handleConnectWallet();
      }
    } catch (e) {
      // Silently catch weird "User closed modal" exception from wallet connect
      if (e.message === 'User closed modal') {
        console.warn(e.message);
      } else {
        throw e;
      }
    }
  };

  const handleConnectWallet = async () => {
    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      setWeb3Provider(web3Provider);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      /* eslint-disable-line */
      const [accounts, networkId] = await Promise.all([
        web3Provider.request({ method: 'eth_accounts' }),
        web3Provider.request({ method: 'eth_chainId' })
      ]);
      handleAccountsChanged(accounts);
    } else if (window.web3) {
      web3Provider = window.web3.currentProvider;
      setWeb3Provider(web3Provider);
      const accounts = await web3Provider.enable();
      handleAccountsChanged(accounts);
    }
    const newWeb3 = new Web3(web3Provider);
    setWeb3(newWeb3);
  };

  const handleAccountsChanged = (accounts) => {
    if (!accounts || accounts.length === 0) {
      setConnectedAddress(undefined);
    } else if (accounts[0] !== connectedAddress) {
      setConnectedAddress(accounts[0]);
    }
  };

  return (
    <Layout
      handleConnectWallet={handleConnectWallet}
      connectedAddress={connectedAddress}
    >
      <Switch>
        <Redirect exact from='/' to='/posts' />
        <Route exact path='/posts'>
          <Posts />
        </Route>
        <Route exact path='/posts/:id'>
          <PostDetail />
        </Route>
        <Route exact path='/create'>
          <Create
            handleConnectWallet={handleConnectWallet}
            connectedAddress={connectedAddress}
          />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
