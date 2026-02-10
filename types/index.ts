export interface Category {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface ForgeRequest {
  category: string;
  rawPrompt: string;
}

export interface ForgeResponse {
  enhancedPrompt?: string;
  error?: string;
}
