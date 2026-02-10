# PromptForge: Architecture Document

## 1. Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS + DaisyUI
*   **Deployment**: Vercel
*   **API Integration**: OpenRouter API

## 2. Folder Structure

A standard Next.js 14 App Router structure will be adopted for PromptForge.

```
promptforge/
├── app/
│   ├── api/
│   │   └── forge/
│   │       └── route.ts         # API route handler for prompt generation
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main landing page component
├── components/                  # Reusable UI components
│   ├── CategorySelector.tsx     # Component for selecting prompt categories
│   ├── PromptInput.tsx          # Component for user's raw prompt input
│   ├── OutputDisplay.tsx        # Component to show the generated prompt
│   ├── CopyButton.tsx           # Component for copying text to clipboard
│   ├── Footer.tsx               # Footer component
│   └── ui/                      # Optional: for UI primitives if needed
│       └── ...
├── public/                      # Static assets (images, fonts)
│   ├── logos/
│   │   └── forgeworks-logo.svg
│   └── ...
├── styles/                      # Additional global styles if needed
├── types/                       # TypeScript type definitions
│   └── index.ts
├── .env.local                   # Local environment variables (e.g., for local dev)
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore file
├── next-env.d.ts                # Next.js TypeScript declarations
├── next.config.js               # Next.js project configuration
├── package.json                 # Project dependencies and scripts
├── postcss.config.js            # PostCSS configuration for Tailwind CSS
├── README.md                    # Project overview and setup instructions
├── tailwind.config.ts           # Tailwind CSS configuration and DaisyUI theme
└── .env                         # Environment variables for Vercel deployments (e.g., OPENROUTER_API_KEY)
```

## 3. Core Features (MVP)

*   **Landing Page Hero**: A prominent section with the application title ("PromptForge") and a concise tagline explaining its purpose as a free AI prompt generator.
*   **Category Selector**: A user-friendly interface (e.g., a dropdown menu or radio buttons) enabling users to choose one of six predefined categories for prompt generation:
    *   Coding
    *   Writing
    *   Business
    *   Creative
    *   Education
    *   Marketing
*   **Text Input**: A multi-line text area where users can type or paste their initial, raw prompt ideas.
*   **"Forge It" Button**: A clear call-to-action button that, when clicked, initiates the prompt enhancement process via the backend API.
*   **Enhanced Prompt Output**: A dedicated area to display the AI-generated, refined prompt. This section will include an integrated "Copy to Clipboard" button for easy transfer of the prompt.
*   **"Sponsored by ForgeWorks" Footer**: A simple, unobtrusive footer at the bottom of every page, acknowledging sponsorship by "ForgeWorks".

## 4. API Design

The `/api/forge` route will handle the core prompt generation logic.

*   **Route**: `/api/forge`
*   **HTTP Method**: `POST`
*   **Request Body Schema**:
    ```json
    {
      "category": "string", // e.g., "coding", "writing", "business", "creative", "education", "marketing"
      "rawPrompt": "string" // The user's initial prompt text
    }
    ```
*   **Response Body Schema**:
    ```json
    {
      "enhancedPrompt": "string" // The AI-generated, improved prompt
    }
    ```
*   **Logic Details**:
    1.  The API route (`app/api/forge/route.ts`) will receive a `POST` request containing the `category` and `rawPrompt` in JSON format.
    2.  It will construct a structured prompt to send to the OpenRouter API. This prompt will instruct the AI to enhance the `rawPrompt`, taking into account the specified `category` to tailor the style and focus.
    3.  The API call will be made to OpenRouter using the `OPENROUTER_API_KEY` environment variable for authentication. A cost-effective free model (e.g., `deepseek-coder`, `llama3-8b`) will be selected via OpenRouter.
    4.  Upon receiving a successful response from OpenRouter, the API route will extract the generated enhanced prompt.
    5.  The enhanced prompt will be returned to the client in the JSON response format specified above.
    6.  Error handling will be implemented for cases such as invalid input, API request failures, or OpenRouter errors.

## 5. Component Hierarchy

The application will follow a hierarchical component structure within the App Router:

```
├── App (layout.tsx)
│   ├── Navigation (optional, could be part of Header)
│   ├── Header (optional)
│   │   └── Logo (ForgeWorks Logo)
│   ├── MainContent Area (via page.tsx)
│   │   ├── HeroSection
│   │   │   ├── Title ("PromptForge")
│   │   │   └── Tagline (Description)
│   │   ├── GeneratorForm
│   │   │   ├── CategorySelector (props: categories, onCategoryChange, selectedCategory)
│   │   │   ├── PromptInput (props: value, onChange, placeholder)
│   │   │   └── ForgeButton (props: onClick, disabled, children="Forge It")
│   │   ├── OutputSection
│   │   │   ├── OutputDisplay (props: enhancedPrompt, isLoading)
│   │   │   │   └── CopyButton (props: textToCopy, onCopySuccess)
│   │   └── Footer (props: sponsorText="Sponsored by ForgeWorks")
│   └── GlobalModals/Layout (if any)
└── Shared/Reusable Components (components/)
    ├── CategorySelector.tsx (props: options, onSelect, selectedValue)
    ├── PromptInput.tsx (props: value, onChange, placeholder, rows)
    ├── CopyButton.tsx (props: textToCopy)
    ├── Footer.tsx (props: text)
    ├── Button.tsx (props: onClick, children, variant, disabled)
    └── ... (other UI elements)
```

## 6. Deployment

*   **Platform**: Vercel
*   **Vercel Configuration**:
    *   The project will be deployed directly from a connected Git repository (e.g., GitHub, GitLab, Bitbucket).
    *   **Build Command**: `next build`
    *   **Output Directory**: `.next`
    *   **Root Directory**: `/` (or the subdirectory containing the `package.json` if not at the repo root).
*   **Environment Variables**:
    *   **`OPENROUTER_API_KEY`**: This is a critical environment variable that must be set within the Vercel project settings. It will be used by the `/api/forge/route.ts` handler to authenticate requests to the OpenRouter API. It should be stored as a secure environment variable.
*   **`vercel.json`**: For the MVP, `vercel.json` is not strictly required as Next.js's default configurations are robust. However, it can be used for advanced configurations if needed in the future, such as:
    *   Custom routing rules (redirects, rewrites).
    *   Specifying serverless function runtimes or regions for specific API routes.
    *   Setting custom headers or cache policies.
    *   *Example for ensuring API routes use a specific Node.js version:*
        ```json
        {
          "functions": {
            "api/**/*.js": {
              "runtime": "nodejs18.x"
            }
          }
        }
        ```

## 7. DaisyUI Theme

A custom dark theme named "fire" will be configured for DaisyUI to provide a distinct visual style. This theme will be defined in `tailwind.config.ts`.

```javascript
// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Customdings or dark theme extensions could go here
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      // Custom "fire" theme for dark mode with warm accents
      {
        "fire": {
          "primary": "#FF4500",    // Active Red-Orange
          "secondary": "#FFA500",  // Bright Orange
          "accent": "#FFD700",     // Gold/Yellow
          "neutral": "#1a1a1a",    // Very dark grey for background elements
          "base-100": "#0d0d0d",   // Deepest black for main background
          "base-200": "#1e1e1e",   // Slightly lighter dark grey
          "base-300": "#333333",   // Medium dark grey
          "info": "#2094F3",       // Standard blue for informational messages
          "success": "#00FF00",    // Bright green for success states
          "warning": "#FFD700",    // Gold for warnings
          "error": "#FF4500",      // Red-Orange for error messages
          "--rounded-box": "1rem", // Rounded corners for boxes
          "--rounded-btn": "0.5rem", // Rounded corners for buttons
        },
      },
      "dark", // Include the default dark theme as a fallback or for comparison
    ],
    // Optionally, set the "fire" theme as the default dark theme
    // darkTheme: "fire",
  },
}
```
This configuration sets up a deep, dark background with vibrant, warm accents for primary, secondary, and accent colors, suitable for a tool focused on "generating" or "forging" ideas.
