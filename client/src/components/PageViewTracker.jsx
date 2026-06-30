import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Ads Tracking
    if (typeof window.gtag === "function") {
      window.gtag('config', 'AW-353701978', {
        page_path: location.pathname + location.search,
      });
      console.log("Google Ads Tracking:", location.pathname + location.search);
    } else {
      console.warn("gtag is not defined");
    }

    // Meta Pixel (Facebook Pixel) Tracking
    if (typeof window.fbq === "function") {
      window.fbq('track', 'PageView');
      console.log("Meta Pixel Tracking:", location.pathname + location.search);
    } else {
      console.warn("fbq is not defined");
    }
  }, [location]);

  return null;
};

export default PageViewTracker;