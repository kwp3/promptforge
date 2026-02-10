"use client";

import { useState, useEffect } from "react";
import { LOADING_MESSAGES } from "@/lib/constants";

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-4 animate-fade-in-up">
      <div className="text-sm text-secondary animate-pulse font-medium text-center">
        {LOADING_MESSAGES[index]}
      </div>
    </div>
  );
}
