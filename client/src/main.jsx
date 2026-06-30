import * as Sentry from "@sentry/react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import PageViewTracker from './components/PageViewTracker.jsx';
import { CartProvider } from './context/CartContext';
import ScrollToTop from "./components/ScrollToTop.jsx";

Sentry.init({
  dsn: "https://278c8d449bf761521f7b6ec3f993b26b@o4510992863002624.ingest.us.sentry.io/4510992865165312",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  tracePropagationTargets: ["localhost", /^https:\/\/backend\.5rphotolab\.com\/api/],
  sendDefaultPii: false, // set to false unless you need IP addresses
  // Enable logs to be sent to Sentry
  enableLogs: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageViewTracker />
      <CartProvider>
        <ScrollToTop />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
