# Available Groq Models (Updated December 2024)

⚠️ **CRITICAL UPDATE**: Groq has decommissioned many models recently. This list reflects ONLY currently working models.

## Current Working Models ✅

### 🚀 **RECOMMENDED: Llama 3.1 8B Instant**

```javascript
const MODEL_NAME = "llama-3.1-8b-instant";
```

- **Speed**: Very Fast ⚡⚡⚡
- **Quality**: High 🌟🌟🌟🌟
- **Best for**: General chatbot use, reliable and stable
- **Rate limit**: 30 req/min, 14,400 tokens/min
- **Status**: ✅ **STABLE - Recommended for chatbots**

### 🧠 **Most Capable: Llama 3.3 70B Versatile**

```javascript
const MODEL_NAME = "llama-3.3-70b-versatile";
```

- **Speed**: Moderate ⚡⚡
- **Quality**: Excellent 🌟🌟🌟🌟🌟
- **Best for**: Complex reasoning, detailed responses
- **Rate limit**: 30 req/min, 6,000 tokens/min
- **Status**: ✅ Currently Active

### 🔬 **Reasoning: DeepSeek R1 Distill Llama 70B**

```javascript
const MODEL_NAME = "deepseek-r1-distill-llama-70b";
```

- **Speed**: Moderate ⚡⚡
- **Quality**: Excellent for reasoning 🌟🌟🌟🌟🌟
- **Best for**: Mathematical reasoning, coding tasks
- **Rate limit**: 30 req/min
- **Status**: ✅ Preview Model

### 🌐 **Alternative: Qwen 2.5 32B**

```javascript
const MODEL_NAME = "qwen-2.5-32b";
```

- **Speed**: Fast ⚡⚡⚡
- **Quality**: High 🌟🌟🌟🌟
- **Best for**: Multilingual, structured outputs
- **Rate limit**: 30 req/min
- **Status**: ✅ Currently Active

### 🎯 **Reasoning Alternative: DeepSeek R1 Distill Qwen 32B**

```javascript
const MODEL_NAME = "deepseek-r1-distill-qwen-32b";
```

- **Speed**: Fast ⚡⚡⚡
- **Quality**: High reasoning 🌟🌟🌟🌟
- **Best for**: Mathematical reasoning, coding
- **Rate limit**: 30 req/min
- **Status**: ✅ Currently Active

## Recently Deprecated Models ❌ (DO NOT USE)

- ~~`llama-3.1-70b-versatile`~~ (Decommissioned Jan 2025)
- ~~`llama-3.2-11b-text-preview`~~ (Decommissioned Dec 2024)
- ~~`llama-3.2-90b-text-preview`~~ (Decommissioned Nov 2024)
- ~~`llama-3.2-3b-text-preview`~~ (Decommissioned)
- ~~`llama-3.2-1b-text-preview`~~ (Decommissioned)
- ~~`mixtral-8x7b-32768`~~ (Decommissioned Mar 2025)
- ~~`llama-3.1-405b-reasoning`~~ (Decommissioned)

## How to Change Model

1. Open `chatbot.js`
2. Find line 3: `const MODEL_NAME = "llama-3.1-8b-instant";`
3. Replace with your preferred model from the **WORKING** list above
4. Save and refresh your chatbot

## Performance Comparison (Current Working Models)

| Model                         | Speed  | Quality    | Best Use Case               | Stability  |
| ----------------------------- | ------ | ---------- | --------------------------- | ---------- |
| llama-3.1-8b-instant          | ⚡⚡⚡ | 🌟🌟🌟🌟   | **Recommended for chatbot** | 🔒 Stable  |
| llama-3.3-70b-versatile       | ⚡⚡   | 🌟🌟🌟🌟🌟 | Complex analysis            | ✅ Active  |
| deepseek-r1-distill-llama-70b | ⚡⚡   | 🌟🌟🌟🌟🌟 | Reasoning & coding          | ✅ Preview |
| qwen-2.5-32b                  | ⚡⚡⚡ | 🌟🌟🌟🌟   | Multilingual support        | ✅ Active  |
| deepseek-r1-distill-qwen-32b  | ⚡⚡⚡ | 🌟🌟🌟🌟   | Fast reasoning              | ✅ Active  |

## Recommendation for College Chatbot

**Current Setup**: `llama-3.1-8b-instant` ✅

- **MOST STABLE** - Least likely to be decommissioned
- Perfect for college enquiry chatbot
- Fast responses keep users engaged
- Reliable and well-tested

**Alternative Options:**

- **For better quality**: `llama-3.3-70b-versatile`
- **For reasoning tasks**: `deepseek-r1-distill-qwen-32b`
- **For multilingual**: `qwen-2.5-32b`

## 🚨 Model Stability Warning

Groq has been rapidly decommissioning models. **`llama-3.1-8b-instant`** appears to be the most stable option that's least likely to be deprecated soon.

## Troubleshooting Model Errors

If you get a "model decommissioned" error:

1. **Use `llama-3.1-8b-instant`** (most stable)
2. Check this file for the latest working models
3. Test with the debug page (`test-server.html`)
4. If a model stops working, switch to `llama-3.1-8b-instant`

## Emergency Fallback

If ALL models fail, the chatbot has enhanced offline responses with detailed college information.

_Last updated: December 2024_
_⚠️ Model availability changes frequently - check Groq console for latest updates_
