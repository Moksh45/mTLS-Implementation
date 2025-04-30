const https = require('https');
const fs = require('fs');

// Server configuration with both CA and client certificate validation
const options = {
  ca: fs.readFileSync('ca-cert.pem'),        // CA certificate to verify clients
  cert: fs.readFileSync('server-cert.pem'),  // Server's certificate
  key: fs.readFileSync('server-key.pem'),    // Server's private key
  requestCert: true,                         // Request client certificate
  rejectUnauthorized: true                   // Reject unauthorized connections
};

// Create HTTPS server with mTLS
const server = https.createServer(options, (req, res) => {
  console.log('Secure connection established!');
  console.log('Client certificate:', req.socket.getPeerCertificate());
  
  res.writeHead(200);
  res.end('Secure connection established with mTLS!\n');
});

const PORT = 8443;
server.listen(PORT, () => {
  console.log(`mTLS server listening on port ${PORT}`);
}); 