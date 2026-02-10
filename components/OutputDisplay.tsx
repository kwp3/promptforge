import CopyButton from "./CopyButton";

interface OutputDisplayProps {
  prompt: string | null;
  isLoading: boolean;
  onCopy?: () => void;
}

export default function OutputDisplay({
  prompt,
  isLoading,
  onCopy,
}: OutputDisplayProps) {
  return (
    <div className="w-full">
      {prompt && !isLoading && (
         <h2 className="text-xl font-bold mb-3 text-base-content animate-fade-in-up">
           Your Forged Prompt
         </h2>
      )}
      
      <div className="relative min-h-[120px] bg-base-200 rounded-xl p-6 border border-base-300 shadow-sm transition-all duration-300">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-base-300 rounded w-3/4"></div>
            <div className="h-4 bg-base-300 rounded w-full"></div>
            <div className="h-4 bg-base-300 rounded w-5/6"></div>
          </div>
        ) : prompt ? (
          <div className="animate-fade-in-up">
             <div className="absolute top-2 right-2">
                <CopyButton text={prompt} onCopy={onCopy} />
             </div>
             <div className="font-mono text-sm leading-relaxed text-base-content pr-8 whitespace-pre-wrap">
               {prompt}
             </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[80px] items-center justify-center">
             <p className="text-secondary italic text-center text-sm">
               Your forged prompt will appear here.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
