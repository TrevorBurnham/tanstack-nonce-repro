# ssr.nonce set after router creation is dropped from hydration scripts

`src/server.ts` sets `ssr.nonce` on the router in the `createStartHandler` callback and sends a nonce-based CSP.

```sh
npm install
npm run build && npm start   # http://localhost:3000
```

With router-core 1.171.31 (react-start 1.168.55, the version pinned here), the hydration `<script data-tsr-stream-part>` and the trailing inline `<script>` have no `nonce`. The CSP blocks both, the client throws `TypeError: Cannot set properties of undefined (setting 't')`, and the page content disappears.

To compare with router-core 1.171.30 (react-start 1.168.54), where every script carries the nonce and the page hydrates:

```sh
npm run use:good && npm run build && npm start
```

`npm run use:bad` restores the failing versions. The latest release at the time of writing (react-start 1.169.3, router-core 1.171.38) also fails.
