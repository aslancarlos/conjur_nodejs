# conjur_nodejs

Minimal Node.js example that fetches a secret from **CyberArk Conjur** using the REST API. Designed as a starting point for engineers who want to see the exact HTTP calls involved — login, get access token, fetch secret — before adopting an SDK.

## What this demonstrates

```text
   Node.js app                       Conjur
       │                                │
       │  1. POST /authn/.../login      │
       │ ─────────────────────────────► │
       │     (basic auth)               │
       │                                │
       │  2. API key returned           │
       │ ◄───────────────────────────── │
       │                                │
       │  3. POST /authn/.../authenticate
       │ ─────────────────────────────► │
       │                                │
       │  4. Short-lived access token   │
       │ ◄───────────────────────────── │
       │                                │
       │  5. GET /secrets/.../variable/...
       │ ─────────────────────────────► │
       │                                │
       │  6. Secret value               │
       │ ◄───────────────────────────── │
```

For production, prefer one of the federated authenticators (`authn-jwt`, `authn-iam`, `authn-gcp`, `authn-azure`, `authn-k8s`) which avoid storing the Conjur API key altogether.

## Running

```bash
npm install
cp app.env .env   # then edit with your values
node conjur-integration.js
```

## Configuration

Edit `app.env` (or set as environment variables):

```bash
CONJUR_URL=https://your-tenant.secretsmgr.cyberark.cloud
CONJUR_ACCOUNT=conjur
CONJUR_USER_ID=host%2Fmy-host
CONJUR_API_KEY=...        # do NOT commit this
CONJUR_SECRET_ID=data/my/secret/variable
```

Note that the user / host ID must be URL-encoded (e.g. `host%2Fmy-host` for `host/my-host`).

## Related

- [conjur-explainer](https://github.com/aslancarlos/conjur-explainer) — Visual walkthrough of Conjur authentication patterns
- [authn-gcp-cf](https://github.com/aslancarlos/authn-gcp-cf) — Same Conjur API, but with federated GCP auth instead of an API key

## License

Apache License 2.0 — see [LICENSE](LICENSE).
