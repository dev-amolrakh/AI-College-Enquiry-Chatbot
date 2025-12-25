// Configuration file for the AI Chatbot
// Configuration file for the AI Chatbot
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.groq.com/
// 2. Sign up for a free account
// 3. Get your API key from the dashboard
// 4. Update the `GROQ_API_KEY` value below or provide a server-side proxy
//
// NOTE: Storing API keys in client-side code is insecure. Prefer a server
// proxy to keep your key secret for production use.

const CONFIG = {
  // API Configuration
  GROQ_API_KEY: "YOUR_API_KEY_HERE", // Replace with your actual API key
  GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",

  // Model Options (recommended):
  MODEL_NAME: "llama-3.1-8b-instant",

  // Chat Settings
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,

  // Conversation History
  MAX_HISTORY_LENGTH: 20,
};

// Expose for browser usage
if (typeof window !== "undefined") window.CONFIG = CONFIG;

// Also export for CommonJS environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
module.exports = CONFIG;
