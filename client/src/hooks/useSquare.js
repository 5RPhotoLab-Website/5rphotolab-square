// src/hooks/useSquare.js
import { useEffect, useState } from "react";

export default function useSquare() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.Square) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    // script.src = "https://web.squarecdn.com/v1/square.js";
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js"; // Use sandbox for testing
    script.async = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return loaded;
}