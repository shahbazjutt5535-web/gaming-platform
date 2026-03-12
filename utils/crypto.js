const axios = require("axios");

/*
This function checks blockchain deposits
Currently example for TRON / TRC20
Later you can add BTC / ETH APIs
*/

async function checkDeposit(address) {

  try {

    const url = `https://apilist.tronscan.org/api/transaction?address=${address}`;

    const response = await axios.get(url);

    const transactions = response.data.data;

    if (!transactions || transactions.length === 0) {
      return null;
    }

    const latest = transactions[0];

    return {
      txid: latest.hash,
      amount: latest.amount / 1000000,
      from: latest.ownerAddress,
      timestamp: latest.timestamp
    };

  } catch (error) {

    console.log("Crypto API error:", error.message);
    return null;

  }

}

module.exports = { checkDeposit };
