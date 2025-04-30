const https = require('https');
const fs = require('fs');

// Client configuration for mTLS
const options = {
  ca: fs.readFileSync('ca-cert.pem'),         // CA certificate to verify server
  cert: fs.readFileSync('client-cert.pem'),   // Client's certificate
  key: fs.readFileSync('client-key.pem'),     // Client's private key
  rejectUnauthorized: true                    // Verify server certificate
};

// Make a request to the mTLS server
const req = https.request({
  host: 'localhost',
  port: 8443,
  path: '/',
  method: 'GET',
  ...options
}, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  res.on('data', (data) => {
    console.log('Response:', data.toString());
  });
});

req.on('error', (error) => {
  console.error('Error connecting to server:', error);
});

req.end(); 