# @kadi1m/axiomvault-client

Client for the AxiomVault log API. Sends hashed, signed, immutable event logs to `https://av.kmon.dev/api/v1/log`.

## Install

```bash
# Configure GitHub Packages for @kadi1m scope (add to .npmrc in your project)
# @kadi1m:registry=https://npm.pkg.github.com

npm i @kadi1m/axiomvault-client
```

Authenticate with GitHub Packages (token with `read:packages`) via `npm login --registry=https://npm.pkg.github.com` or set `//npm.pkg.github.com/:_authToken=YOUR_TOKEN` in `.npmrc`.

## Usage

```ts
import { Client, LOG_TYPES } from "@kadi1m/axiomvault-client";

const client = new Client(process.env.AXIOMVAULT_API_KEY!);

const result = await client.log({
  type: "AUDIT",
  event: "user.permission_changed",
  actor: "admin_jane",
  target: "user_bob",
  metadata: { risk: "high" },
});
// result: { auth: boolean, saved: boolean }
```

- **type** (required): One of `LOG_TYPES` — TRACE, DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, SECURITY, AUDIT.
- **event** (required): Event name string.
- **actor**, **target**, **metadata**: Optional.

The backend sets `timestamp` automatically. Auth is sent as `Authorization: Bearer <key>`.
