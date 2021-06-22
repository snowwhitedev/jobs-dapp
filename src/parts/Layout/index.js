import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children, handleConnectWallet, connectedAddress }) => {
  return (
    <>
      <div className='navbar navbar-fixed-top'>
        <div className='navbar-inner'>
          <div className='container'>
            <div className='nav-collapse' id='main-menu'>
              <ul className='nav' id='main-menu-left'>
                <li>
                  <NavLink to='/create' exact activeClassName='active'>
                    Create
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/posts' exact activeClassName='active'>
                    Posts
                  </NavLink>
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
