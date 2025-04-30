#!/bin/bash
# Script to generate certificates for mTLS testing

# Create directories for certificates
mkdir -p certs
cd certs

echo "Generating CA certificate..."
# Generate CA private key
openssl genrsa -out ca-key.pem 2048

# Generate CA certificate
openssl req -x509 -new -nodes -key ca-key.pem -sha256 -days 365 -out ca-cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=Test CA"

echo "Generating server certificates..."
# Generate server private key
openssl genrsa -out server-key.pem 2048

# Generate server CSR
openssl req -new -key server-key.pem -out server.csr \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Generate server certificate signed by the CA
openssl x509 -req -in server.csr -CA ca-cert.pem -CAkey ca-key.pem \
  -CAcreateserial -out server-cert.pem -days 365 -sha256

echo "Generating client certificates..."
# Generate client private key
openssl genrsa -out client-key.pem 2048

# Generate client CSR
openssl req -new -key client-key.pem -out client.csr \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=client"

# Generate client certificate signed by the CA
openssl x509 -req -in client.csr -CA ca-cert.pem -CAkey ca-key.pem \
  -CAcreateserial -out client-cert.pem -days 365 -sha256

# Clean up CSR files
rm *.csr

# Move certificates to the parent directory
cp *.pem ../
cd ..

echo "Certificate generation complete!"
echo "Use 'node server.js' to start the server and 'node client.js' to test the connection." 