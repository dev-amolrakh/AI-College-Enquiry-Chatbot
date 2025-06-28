# AI Chatbot Setup Instructions

## Overview

Your chatbot has been upgraded with AI capabilities using Groq's free LLM API. It now provides dynamic, intelligent responses specifically focused on Pune engineering college enquiries.

## Features Added

- ✅ **Dynamic AI Responses** - No more static responses
- ✅ **Pune Engineering Focus** - Specialized knowledge about Pune colleges
- ✅ **Free & Fast** - Using Groq's high-speed free API
- ✅ **Conversation Memory** - Maintains context across messages
- ✅ **Multi-language Support** - English, Hindi, Marathi
- ✅ **Fallback System** - Works even when API is down

## Quick Setup (5 minutes)

### Step 1: Get Your Free API Key

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account (no credit card required)
3. Go to the API Keys section
4. Create a new API key and copy it

### Step 2: Configure the Chatbot

1. Open `chatbot.js` file
2. Find line 2: `const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE';`
3. Replace `YOUR_GROQ_API_KEY_HERE` with your actual API key
4. Save the file

### Step 3: Test Your Chatbot

1. Open `index.html` in your browser
2. Try asking questions like:
   - "What are the top engineering colleges in Pune?"
   - "Tell me about COEP admission process"
   - "What are the fees at PICT?"

## API Limits (Free Tier)

- **Requests**: 30 requests per minute
- **Tokens**: 6,000 tokens per minute
- **Daily**: No daily limits
- **Models**: Access to all models

## Supported Colleges

The AI knows about these Pune engineering colleges:

- College of Engineering Pune (COEP)
- Pune Institute of Computer Technology (PICT)
- Vishwakarma Institute of Technology (VIT)
- Maharashtra Institute of Technology (MIT)
- Symbiosis Institute of Technology (SIT)
- Bharati Vidyapeeth College of Engineering
- Sinhgad College of Engineering
- JSPM's Rajarshi Shahu College of Engineering
- Cummins College of Engineering for Women
- Government Polytechnic Pune

## Troubleshooting

### 🚨 MOST COMMON ISSUE: CORS Error

**If you're getting fallback responses instead of AI responses:**

1. **Check if you're running on a server** (not file://)

   - ❌ Wrong: Opening `index.html` directly in browser
   - ✅ Correct: Running on `http://localhost:8000`

2. **Start a local server:**

   - **Windows**: Double-click `start-server.bat`
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx serve .`
   - **VS Code**: Install "Live Server" extension

3. **Test with debug page:**
   - Open `test-server.html` to diagnose issues
   - Check console for detailed error messages

### If the chatbot isn't responding:

1. **Open browser console** (F12 → Console) and look for errors
2. **Check API key**: Make sure it's properly set in `chatbot.js`
3. **Test API connection**: Use the debug page (`test-server.html`)
4. **Verify internet connection**
5. **The enhanced fallback system** now provides detailed responses even offline

### If you get API errors:

1. **API key invalid**: Double-check you copied the complete key from Groq
2. **Rate limits**: Wait a minute and try again (30 requests/minute limit)
3. **Network issues**: Check your internet connection
4. **Server required**: Make sure you're running on localhost, not file://

### Common Issues & Solutions:

- **CORS Error**: ➜ Use local server (see above)
- **API Key Invalid**: ➜ Get new key from console.groq.com
- **No Response**: ➜ Check JavaScript is enabled
- **Fallback Only**: ➜ Check console for API errors
- **Server won't start**: ➜ Try different port: `python -m http.server 3000`

## Customization Options

### Change the AI Model:

In `chatbot.js`, modify line 4:

```javascript
const MODEL_NAME = "llama-3.2-11b-text-preview"; // Current default (recommended)
// or
const MODEL_NAME = "llama-3.2-3b-text-preview"; // For faster responses
// or
const MODEL_NAME = "llama-3.2-90b-text-preview"; // Most capable (slower)
```

### Adjust Response Style:

Modify the `SYSTEM_PROMPT` in `chatbot.js` to change how the AI responds.

### Add More Colleges:

Update the system prompt and college data to include more institutions.

## Security Note

- Never commit your API key to public repositories
- Consider using environment variables in production
- The current setup is suitable for development/testing

## Support

If you need help:

1. Check the browser console for error messages
2. Verify all setup steps were completed
3. Test with simple questions first
4. Ensure you have a stable internet connection

## Next Steps

- Test the chatbot thoroughly
- Customize the responses for your specific needs
- Consider adding more college data
- Deploy to a web hosting service for public access

Your AI-powered college enquiry chatbot is now ready to help students and parents with intelligent, dynamic responses about Pune engineering colleges!
