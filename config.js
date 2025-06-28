// Configuration file for the AI Chatbot
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.groq.com/
// 2. Sign up for a free account
// 3. Get your API key from the dashboard
// 4. Replace 'YOUR_GROQ_API_KEY_HERE' in chatbot.js with your actual API key
//
// Groq offers:
// - Free tier with generous limits
// - High-speed inference
// - Multiple model options
// - No credit card required for signup

const CONFIG = {
  // API Configuration
  GROQ_API_KEY: "YOUR_API_KEY", // Replace with your actual API key
  GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",

  // Model Options (all free):
  // - 'llama-3.1-8b-instant' (recommended - fast and capable)
  // - 'mixtral-8x7b-32768' (good balance)
  // - 'llama-3.2-90b-text-preview' (most capable, slower)
  MODEL_NAME: "llama-3.1-8b-instant",

  // Chat Settings
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,

  // Conversation History
  MAX_HISTORY_LENGTH: 20,
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
