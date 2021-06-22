import React from 'react';

const Layout = ({ children, handleConnectWallet, connectedAddress }) => {
  return (
    <>
      <div className='navbar navbar-fixed-top'>
        <div className='navbar-inner'>
          <div className='container'>
            <div className='nav-collapse' id='main-menu'>
              <ul className='nav' id='main-menu-left'>
                <li>
                  <a href=''>Create</a>
                </li>
                <li>
                  <a href='' target='_blank'>
                    Posts
                  </a>
                </li>
              </ul>
              <ul className='nav pull-right' id='main-menu-right'>
                <li>
                  {connectedAddress === undefined ? (
                    <button onClick={handleConnectWallet}>
                      Connect wallet
                    </button>
                  ) : (
                    <button>Connected at {connectedAddress}</button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>{children}</div>
    </>
  );
};

export default Layout;
