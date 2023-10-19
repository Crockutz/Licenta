const express = require('express');
const cors = require('cors');
const app = express();
const {ethers} = require('ethers');
const axios = require('axios');

// Etherscan API: 7RBN81J8TJYICRUXRQISMB3U3AJQZTJ45P
// Gas Fee
urlGasPrice = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=7RBN81J8TJYICRUXRQISMB3U3AJQZTJ45P'



app.use(cors());
app.use(express.json());

app.get('/api/gasprice', async (req,res) => {
    const gas = await axios.get(urlGasPrice);
    const gasPrice = gas.data.result.SafeGasPrice;
    res.send(gasPrice);
})

app.get('/api', (req,res) => {
    res.json({message: "Hello from the server!"});
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
})