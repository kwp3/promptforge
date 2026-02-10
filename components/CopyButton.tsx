"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
}

export default function CopyButton({ text, onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="tooltip tooltip-left" data-tip={copied ? "Copied!" : "Copy to clipboard"}>
      <button
        onClick={handleCopy}
        className="btn btn-ghost btn-sm btn-square hover:bg-base-300 transition-colors duration-200"
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? (
          // Checkmark Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          // Clipboard Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-secondary hover:text-primary transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
