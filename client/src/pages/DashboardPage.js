import React from 'react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';



function DashboardPage() {

  // Properties
  const [walletAddress, setWalletAddress] = useState("");
  const [balanceAddress, setBalanceAddress] = useState("");
  const [gasPrice, setGasPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/gasprice")
    .then(response => response.json())
    .then(data => setGasPrice(data))
  }, []);
  

  //Cerem acces la wallet-ul de MetaMask al utilizatorului
  async function requestAccount() {
    console.log('Requesting account...');

    //Verificam daca exista extensia Metamask
    if(window.ethereum) {
      console.log('Metamask Detected')
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        console.log(accounts);
      }catch(error) {
        console.log('Error connecting');
      }

    } else {
      console.log('Metamask is not detected');
    }
  }

  async function connectWallet() {
    if(window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log('Connected to MetaMask');
        console.log(provider);
        let balance = await provider.getBalance(walletAddress);
        setBalanceAddress(balance);
        console.log(ethers.formatEther(balanceAddress));

      } catch (error) {
        console.error('Error connecting: ', error.message);
      }
    } else {
      console.error('Metamask not detected');
    }
  }


  return (
    <div className='App'>
      <header>
        <button onClick={requestAccount}>Request Wallet</button>
        <button onClick={connectWallet}>Connect Wallet</button>
        <h3>Wallet Address: {walletAddress}</h3>
        <h4>Balance: {balanceAddress ? ethers.formatEther(balanceAddress): "Your balance is empty."}</h4>
        <h4>Gas Price: {gasPrice}</h4>
      </header>
    </div>
  )
}

export default DashboardPage