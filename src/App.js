import { useState, useEffect } from 'react'

import Web3 from 'web3';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(undefined);

  useEffect(async () => {
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
      if (e.message === "User closed modal") {
        console.warn(e.message);
      }
      else {
        throw e;
      }
    }
  }

  const handleConnectWallet = async () => {
    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      setWeb3Provider(web3Provider);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const [ accounts, networkId ] = await Promise.all([
        web3Provider.request({ method: 'eth_accounts' }),
        web3Provider.request({ method: 'eth_chainId' })
      ]);
      handleAccountsChanged(accounts);
      console.log('[accounts]', accounts)
    } else if(window.web3) { // for legacy dapp browsers
      web3Provider = window.web3.currentProvider;
      setWeb3Provider(web3Provider);
      const accounts = await web3Provider.enable();
      handleAccountsChanged(accounts);
    }
    const newWeb3 = new Web3(web3Provider);
    setWeb3(newWeb3);
  }

  const handleAccountsChanged = (accounts) => {
    if (!accounts || accounts.length === 0) {
      setConnectedAddress(undefined);
    } else if (accounts[0] !== connectedAddress) {
      setConnectedAddress(accounts[0]);
    }
  }

  return (
    <>
      <div className="navbar navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <div className="nav-collapse" id="main-menu">
              <ul className="nav" id="main-menu-left">
                <li>
                  <a href="">Create</a>
                </li>
                <li>
                  <a href="" target="_blank">
                    Posts
                  </a>
                </li>
              </ul>
              <ul className="nav pull-right" id="main-menu-right">
                <li>
                  {
                    connectedAddress === undefined
                    ? (<button onClick={handleConnectWallet}>Connect wallet</button>)
                    : (<button>Connected at {connectedAddress}</button>)
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h3>Create Post</h3>
        <div className="control-group">
          <div className="controls">
            <input type="text" className="input-xlarge" placeholder="Post Title" />
          </div>
        </div>
        <div className="form-search">
          <select>
            <option>USDT</option>
            <option>USDC</option>
            <option>ETH</option>
          </select>
          <input type="text" className="input-small" placeholder="Amount"/>
          <button type="submit" className="btn">Deposit</button>
        </div>
        <div className="control-group">
          <div className="controls">
            <input type="text" className="input-xlarge" placeholder="Time to complete" />
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <textarea className="input-xlarge" rows="6" placeholder="Description"></textarea>
          </div>
        </div>
        {
          connectedAddress === undefined
          ? (<button onClick={handleConnectWallet}>Connect wallet</button>)
          : (<button>Launch post</button>)
        }
      </div>
    </>
  );
}

export default App;
