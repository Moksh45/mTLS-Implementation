# Mutual TLS (mTLS) Testing

This repository contains code to test mutual TLS authentication between a Node.js HTTPS server and client.

## Files

- `server.js` - HTTPS server with mTLS enabled
- `client.js` - HTTPS client configured to connect to the mTLS server
- `generate-certs.sh` - Script to generate necessary certificates

## Testing Steps

1. Generate the certificates:

```bash
chmod +x generate-certs.sh
./generate-certs.sh
```

2. Start the server in one terminal:

```bash
node server.js
```

3. Run the client in another terminal:

```bash
node client.js
```

If everything is set up correctly, you should see a successful connection message from both the server and client.

## Testing Different Scenarios

### Testing with Invalid Client Certificate

To test what happens when a client doesn't have a valid certificate, modify the client.js file to use different certificates or remove the certificate configuration.

### Testing with Disabled Certificate Validation

To disable certificate validation on the server, change `rejectUnauthorized: true` to `rejectUnauthorized: false` in server.js.

## Troubleshooting

- If you encounter CERT_HAS_EXPIRED errors, regenerate the certificates.
- If the server rejects the client connection, ensure the client certificate is signed by the same CA.
- Make sure all certificate paths in the code are correct. 