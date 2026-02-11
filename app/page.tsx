"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Hero from "@/components/Hero";
import CategoryPicker from "@/components/CategoryPicker";
import PromptInput from "@/components/PromptInput";
import ForgeButton from "@/components/ForgeButton";
import OutputDisplay from "@/components/OutputDisplay";
import LoadingState from "@/components/LoadingState";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import { ForgeResponse } from "@/types";

export default function Home() {
  const [category, setCategory] = useState("coding");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const showError = useCallback((msg: string) => {
    setError(msg);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setError(null), 3000);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 3000);
  };

  const handleForge = async () => {
    if (!input.trim()) {
      showError("Describe your idea first — even a rough thought works!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput(null);

    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, rawPrompt: input }),
      });

      const data: ForgeResponse = await res.json();

      if (res.status === 429) {
        showError("You're generating prompts too fast! Wait a moment and try again.");
      } else if (data.error) {
        showError(data.error);
      } else if (data.enhancedPrompt) {
        setOutput(data.enhancedPrompt);
      }
    } catch {
      showError("Something went a little wonky. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 min-h-screen flex flex-col">
      <Hero />
      
      <CategoryPicker selected={category} onSelect={setCategory} />
      
      <PromptInput value={input} onChange={setInput} />
      
      <ForgeButton
        onClick={handleForge}
        isLoading={isLoading}
        disabled={!input.trim()}
      />
      
      {isLoading && <LoadingState />}
      
      <OutputDisplay prompt={output} isLoading={isLoading} onCopy={handleCopy} />
      
      <div className="flex-grow" /> {/* Spacer to push footer down if content is short */}
      
      <Footer />
      
      <Toast
        message={
          copied
            ? "Prompt copied to clipboard! \uD83D\uDD25"
            : error || ""
        }
        type={copied ? "success" : "error"}
        visible={copied || !!error}
      />
    </main>
  );
}
