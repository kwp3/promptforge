import { MAX_INPUT_LENGTH } from "@/lib/constants";

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function PromptInput({ value, onChange }: PromptInputProps) {
  const currentLength = value.length;
  
  // Determine character count color
  let charCountColor = "text-secondary";
  if (currentLength >= MAX_INPUT_LENGTH) {
    charCountColor = "text-error";
  } else if (currentLength > MAX_INPUT_LENGTH * 0.8) {
    charCountColor = "text-warning";
  }

  return (
    <div className="form-control w-full my-6">
      <textarea
        className="textarea textarea-bordered w-full h-32 bg-base-200 text-base-content placeholder:text-secondary focus:border-primary focus:ring-1 focus:ring-primary text-base p-4 resize-none"
        placeholder="Tell us your rough idea..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_INPUT_LENGTH}
        aria-label="Prompt input"
      />
      
      <div className="label pt-2 flex justify-between items-start">
        <span className="label-text-alt text-xs text-secondary max-w-[80%]">
          Describe what you want the AI to do. Be as specific or vague as you like.
        </span>
        <span className={`label-text-alt text-xs font-mono ${charCountColor}`}>
          {currentLength}/{MAX_INPUT_LENGTH}
        </span>
      </div>
    </div>
  );
}
