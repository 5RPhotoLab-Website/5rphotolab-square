import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://bf284c72f1dfaa2bd7a5f593142ca80d@o4510992863002624.ingest.us.sentry.io/4510992967467008",
  tracesSampleRate: 1.0,
  sendDefaultPii: false,
  // Send structured logs to Sentry
  enableLogs: true,
});