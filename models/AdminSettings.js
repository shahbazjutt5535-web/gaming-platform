// models/AdminSettings.js

/**
 * Admin settings for Gaming Platform
 * Stores admin credentials, JWT secret, and platform defaults.
 */

module.exports = {
  // Admin login credentials
  email: "admin",         // Replace with your admin email
  password: "admin",           // Replace with your admin password

  // JWT secret key for admin login authentication
  jwtSecret: "admin123",   // Replace with a strong random key

  // Default platform settings
  winProbability: 0.5,               // Default win probability (50%)
  minDeposit: 10,                     // Minimum deposit in USD
  minWithdraw: 5,                     // Minimum withdrawal in USD

  // Cryptocurrency addresses (example)
  cryptoAddresses: {
    TRC20: "TXXXXXX12345TRC",        // Replace with your TRC20 wallet
    ERC20: "0xXXXXXXXERC",           // Replace with your ERC20 wallet
    BEP20: "0xXXXXXXBEP",            // Replace with your BEP20 wallet
  }
};
