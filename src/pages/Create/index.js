import React from 'react';

const Create = ({ handleConnectWallet, connectedAddress }) => {
  return (
    <>
      <h3>Create Post</h3>
      <div className='control-group'>
        <div className='controls'>
          <input
            type='text'
            className='input-xlarge'
            placeholder='Post Title'
          />
        </div>
      </div>
      <div className='form-search'>
        <select>
          <option>USDT</option>
          <option>USDC</option>
          <option>ETH</option>
        </select>
        <input type='text' className='input-small' placeholder='Amount' />
        <button type='submit' className='btn'>
          Deposit
        </button>
      </div>
      <div className='control-group'>
        <div className='controls'>
          <input
            type='text'
            className='input-xlarge'
            placeholder='Time to complete'
          />
        </div>
      </div>
      <div className='control-group'>
        <div className='controls'>
          <textarea
            className='input-xlarge'
            rows='6'
            placeholder='Description'
          ></textarea>
        </div>
      </div>
      {connectedAddress === undefined ? (
        <button onClick={handleConnectWallet}>Connect wallet</button>
      ) : (
        <button>Launch post</button>
      )}
    </>
  );
};

export default Create;
