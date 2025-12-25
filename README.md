# 🎓 VIDHUR AI - College Enquiry Chatbot

<div align="center">

<img src="assets/images/final-chatbot-logo.png" alt="VIDHUR AI Logo" width="120" style="max-width:100%;height:auto;"/>

**AI-Powered Engineering College Assistant for Pune, Maharashtra**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://vidhur.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?logo=javascript)](https://www.javascript.com/)
[![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq-blue)](https://groq.com/)

**[🚀 Try Live Demo](https://vidhur.netlify.app/)**

</div>

---

## 📖 About

**VIDHUR AI** is an intelligent chatbot that helps students and parents find information about engineering colleges in Pune, Maharashtra. Using Groq's LLM API, it provides instant, accurate answers about admissions, fees, courses, placements, and campus life.

### ✨ Key Features

- 🤖 AI-Powered responses using Groq's Llama 3.1 8B model
- 🌐 Multilingual support (English, Hindi, Marathi)
- 📱 Fully responsive design for all devices
- 💬 Context-aware conversation memory
- 🎯 Specialized knowledge of 50+ Pune colleges
- ⚡ Sub-second response times
- 🎤 Voice input support
- 📥 Export chat history

---

## 🖼️ Screenshots

### Desktop View

<div align="center">
  <img src="screenshots/Screenshot 2025-12-25 235007.png" alt="Welcome Screen" width="800"/>
  <p><i>Welcome screen with suggestion cards</i></p>
</div>

<div align="center">
  <img src="screenshots/Screenshot 2025-12-25 235154.png" alt="Chat Interface" width="800"/>
  <p><i>Main chat interface with AI responses</i></p>
</div>

<div align="center">
  <img src="screenshots/Screenshot 2025-12-25 235234.png" alt="College Comparison" width="800"/>
  <p><i>Detailed college comparison with tables</i></p>
</div>

<div align="center">
  <img src="screenshots/Screenshot 2025-12-25 235302.png" alt="About Modal" width="800"/>
  <p><i>About modal with features and statistics</i></p>
</div>

### Mobile View

<div align="center">
  <img src="screenshots/Screenshot 2025-12-25 235717.png" alt="Mobile Interface" width="300"/>
  <img src="screenshots/Screenshot 2025-12-25 235656.png" alt="Mobile Chat" width="300"/>
  <p><i>Responsive mobile interface</i></p>
</div>

---

## 🚀 What Makes It Special

- ✅ **Intelligent AI Responses** - Powered by Groq's LLM API
- ✅ **College Comparison** - Side-by-side detailed comparisons
- ✅ **50+ Pune Colleges** - Comprehensive information database
- ✅ **Voice Input** - Speak your queries naturally
- ✅ **Export History** - Download conversations as text files
- ✅ **Offline Fallback** - Works even without internet
- ✅ **Rich Formatting** - Markdown tables, lists, and styling
- ✅ **Smart Suggestions** - Quick-start question cards
- 💾 **Conversation Memory** - Maintains context across chats

---

## 🏗️ Tech Stack

| Category      | Technologies                          |
| ------------- | ------------------------------------- |
| **Frontend**  | HTML5, CSS3, JavaScript (ES6+)        |
| **AI/LLM**    | Groq API, Llama 3.1 8B Instant        |
| **Libraries** | Marked.js, LDRS, RemixIcon            |
| **APIs**      | Web Speech API, Groq REST API         |
| **Storage**   | LocalStorage for conversation history |

---

## 📂 Project Structure

```
AI-College-Enquiry-Chatbot/
├── index.html                  # Main application
├── style.css                   # Complete styling
├── config.js                   # API configuration
├── src/
│   └── js/
│       └── chatbot.js          # Core chatbot logic
├── assets/
│   └── images/                 # Logo and images
├── screenshots/                # UI screenshots
├── SETUP_INSTRUCTIONS.md       # Detailed setup guide
├── AVAILABLE_MODELS.md         # AI model information
└── README.md                   # This file
```

---

## ⚙️ Quick Start

### Try it Live

🌐 **[Visit Live Demo](https://vidhur.netlify.app/)** - No setup needed!

### Run Locally

1. **Clone the repository**
2. **Get free Groq API key** from [console.groq.com](https://console.groq.com/)
3. **Configure API key** in `config.js` (replace `YOUR_API_KEY_HERE`)
4. **Start local server**:
   - Windows: Run `start-server.bat`
   - Python: `python -m http.server 8000`
   - VS Code: Use Live Server extension
5. **Open** `http://localhost:8000` in browser

> ⚠️ Use a local server, don't open HTML file directly

Detailed setup guide: [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## 💡 Usage

### Try These Questions

- "What are the top engineering colleges in Pune?"
- "Compare COEP and PICT"
- "Tell me about admission process at VIT"
- "Which college has the best placements?"
- "What are the fees at MIT Pune?"

### Quick Tips

- 🎤 **Voice Input** - Click microphone icon and speak
- 🌐 **Language** - Switch between English, Hindi, Marathi
- 📥 **Export** - Download chat history anytime
- 🔄 **New Chat** - Start fresh while keeping history

---

## 🎓 Supported Colleges

VIDHUR AI has extensive knowledge about these Pune engineering colleges:

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
- ...and 40+ more institutions

---

## 🔧 Configuration

Customize settings in [config.js](config.js):

- API Key, Model selection
- Response length and creativity
- Conversation memory limit

See [AVAILABLE_MODELS.md](AVAILABLE_MODELS.md) for model options.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Amol Rakh**

- GitHub: [@AmolRakh](https://github.com/AmolRakh)
- Live Demo: [https://vidhur.netlify.app/](https://vidhur.netlify.app/)
- Project Link: [AI-College-Enquiry-Chatbot](https://github.com/AmolRakh/AI-College-Enquiry-Chatbot)

---

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for providing free, high-speed LLM API
- [Marked.js](https://marked.js.org/) for Markdown parsing
- [RemixIcon](https://remixicon.com/) for beautiful icons
- [LDRS](https://uiball.com/ldrs/) for loading animations

---

## 📞 Support

If you encounter any issues or have questions:

1. Check [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for troubleshooting
2. Open an issue on GitHub
3. Contact the developer

---

<div align="center">

**Made with ❤️ for students seeking engineering education in Pune**

⭐ Star this repo if you find it helpful!

</div>

**A. API Configuration & LLM Integration**

```javascript
const GROQ_API_KEY = "YOUR_API_KEY"; // set in src/js/chatbot.js
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME = "llama-3.1-8b-instant";
```

**B. Multilingual System Prompts**

```javascript
const SYSTEM_PROMPTS = {
  en: `You are VIDHUR, an AI assistant specialized in...`,
  hi: `आप VIDHUR हैं, एक AI सहायक...`,
  mr: `तुम्ही VIDHUR आहात...`,
};
```

**C. Asynchronous API Communication**

```javascript
async function callGroqAPI(userMessage, conversationHistory = []) {
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 0.9,
      stream: false,
    }),
  });
}
```

**D. Conversation Management**

- **Context Preservation**: Maintains last 20 exchanges
- **Error Handling**: Graceful degradation to fallback responses
- **Message Processing**: Markdown parsing and HTML rendering

**Interview Points**:

- Async/await patterns for API calls
- Error handling and fallback mechanisms
- Memory management for conversation history
- Cross-Origin Resource Sharing (CORS) handling

#### **3. style.css (2,593 lines)**

**Purpose**: Complete visual design and responsive behavior

**Key Features**:

- **CSS Grid & Flexbox**: Modern layout techniques
- **Responsive Design**: Mobile-first approach with breakpoints
- **CSS Variables**: Theme management and color schemes
- **Animations**: Smooth transitions and loading states
- **Component-Based Styling**: Modular CSS architecture

**Interview Points**:

- CSS methodology (BEM-like naming conventions)
- Performance optimization (efficient selectors)
- Cross-browser compatibility
- Responsive design principles

---

## 🧠 **AI Integration Deep Dive**

### **Large Language Model Implementation**

**Model Selection**: Llama 3.1 8B Instant

- **Reasoning**: Optimal balance of speed, accuracy, and stability
- **Parameters**: 8 billion parameters for complex reasoning
- **Inference Speed**: Sub-second response times via Groq
- **Context Window**: Handles extended conversations

**Prompt Engineering**:

```javascript
const SYSTEM_PROMPTS = {
  en: `You are VIDHUR, an AI assistant specialized in helping students...
       Your expertise covers:
       - Engineering colleges in Pune (Government and Private)
       - Admission processes, eligibility criteria
       - Fee structures and scholarships...`,
};
```

**API Integration Architecture**:

1. **Request Formation**: System prompt + conversation history + user input
2. **HTTP Request**: POST to Groq endpoint with authentication
3. **Response Processing**: JSON parsing and error handling
4. **Context Management**: Update conversation memory
5. **UI Update**: Render response with markdown support

### **Conversation Flow**

1. User inputs query
2. System validates and preprocesses input
3. API call with full context
4. Response parsing and rendering
5. History update and UI refresh

---

## 🔧 **Technical Implementation Details**

### **API Configuration**

```javascript
const CONFIG = {
  GROQ_API_KEY: "YOUR_API_KEY",
  MODEL_NAME: "llama-3.1-8b-instant",
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  MAX_HISTORY_LENGTH: 20,
};
```

### **Error Handling Strategy**

```javascript
try {
  const botResponse = await callGroqAPI(messageText, conversationHistory);
  addMessage(botResponse, "bot-message");
} catch (error) {
  console.error("Error getting bot response:", error);
  const fallbackResponse = getFallbackResponse(messageText);
  addMessage(fallbackResponse, "bot-message");
}
```

### **Real-time Features**

- **Voice Recognition**: Web Speech API for voice input
- **Typing Indicators**: Visual feedback during API calls
- **Auto-scroll**: Dynamic chat window management
- **Export Functionality**: Chat history download as text

---

## 📊 **College Database Integration**

### **Supported Institutions**

The chatbot has comprehensive knowledge about:

| College  | Type       | Established | Specialization           |
| -------- | ---------- | ----------- | ------------------------ |
| COEP     | Government | 1854        | All Engineering Branches |
| PICT     | Private    | 1983        | Computer Science & IT    |
| VIT Pune | Private    | 1984        | Technical Education      |
| MIT Pune | Private    | 1983        | Engineering & Technology |
| SIT Pune | Private    | 1996        | Technology & Management  |

### **Knowledge Domains**

- **Admissions**: Eligibility, entrance exams (JEE, MHT-CET), application process
- **Academics**: Course structure, faculty, research opportunities
- **Financial**: Fee structure, scholarships, financial aid
- **Placements**: Company partnerships, salary packages, career prospects
- **Infrastructure**: Hostel facilities, labs, campus amenities

---

## 🚀 **Setup & Deployment**

### **Prerequisites**

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI features
- Local web server (not file:// protocol)

### **Quick Start**

1. **Clone Repository**

   ```bash
   git clone https://github.com/dev-amolrakh/AI-College-Enquiry-Chatbot.git
   ```

2. **Get Groq API Key**

   - Visit [console.groq.com](https://console.groq.com/)
   - Sign up for free account
   - Generate API key

3. **Configure Application**

   ```javascript
   // In chatbot.js line 2
   const GROQ_API_KEY = "your_actual_api_key_here";
   ```

4. **Start Local Server**

   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # Windows
   start-server.bat
   ```

5. **Access Application**
   ```
   http://localhost:8000
   ```

### **Production Deployment**

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN Integration**: CloudFlare for global distribution
- **Environment Variables**: Secure API key management
- **HTTPS**: Required for voice features and security

---

## 🔐 **Security Considerations**

### **API Security**

- **API Key Protection**: Environment variables in production
- **CORS Policy**: Cross-origin request handling
- **Rate Limiting**: Groq API limits (30 req/min, 6000 tokens/min)
- **Input Validation**: Sanitization of user inputs

### **Data Privacy**

- **No Data Storage**: Conversation history exists only in browser session
- **No Personal Data Collection**: No user tracking or profiling
- **Local Processing**: Client-side conversation management

---

## 🎯 **Performance Optimization**

### **Frontend Optimization**

- **Lazy Loading**: Dynamic content loading
- **Code Splitting**: Modular JavaScript architecture
- **CSS Optimization**: Efficient selectors and minimal reflows
- **Image Optimization**: Compressed assets and proper formats

### **AI Response Optimization**

- **Context Management**: Limited conversation history (20 exchanges)
- **Caching Strategy**: Fallback responses for common queries
- **Asynchronous Processing**: Non-blocking UI during API calls
- **Error Recovery**: Graceful degradation strategies

---

## 📈 **Monitoring & Analytics**

### **Performance Metrics**

- **Response Time**: API call duration and UI responsiveness
- **Error Rates**: API failures and fallback usage
- **User Engagement**: Chat session length and message count
- **Feature Usage**: Voice input, export, language switching

-### **Debugging Tools**

- **Debug Panel**: `test-server.html` (moved to `archive/test-server.html` for reference) — prefer using browser DevTools console for live diagnostics
- **Console Logging**: Detailed error tracking
- **Network Monitoring**: API call inspection
- **Browser DevTools**: Performance profiling

---

## 🔄 **Future Enhancements**

### **Technical Roadmap**

- **Vector Database**: RAG implementation for enhanced knowledge
- **WebSocket Integration**: Real-time bidirectional communication
- **PWA Features**: Offline functionality and app-like experience
- **Advanced Analytics**: User behavior tracking and insights

### **Feature Expansion**

- **Virtual Campus Tours**: 3D visualization integration
- **Document Upload**: PDF analysis for personalized guidance
- **Calendar Integration**: Important dates and deadlines
- **Comparative Analysis**: Side-by-side college comparison tools

---

## 💡 **Interview Preparation - Technical Questions**

### **JavaScript & Web Development**

1. **Async Programming**: Explain Promise chains vs async/await in API calls
2. **Event Handling**: Describe event delegation and performance implications
3. **Memory Management**: How conversation history is managed and optimized
4. **Cross-Origin Requests**: CORS policy and security implications

### **AI Integration**

1. **LLM Selection**: Why Llama 3.1 8B over other models?
2. **Prompt Engineering**: How system prompts affect response quality
3. **Context Management**: Balancing memory vs. performance
4. **Error Handling**: Fallback strategies for API failures

### **Frontend Architecture**

1. **Responsive Design**: Mobile-first approach and breakpoint strategy
2. **Component Design**: Modular CSS and JavaScript organization
3. **Performance**: Loading strategies and optimization techniques
4. **Accessibility**: ARIA implementation and keyboard navigation

### **API Integration**

1. **Authentication**: Bearer token implementation and security
2. **Rate Limiting**: Handling API constraints gracefully
3. **Error Codes**: HTTP status code handling and user feedback
4. **Caching**: Browser caching strategies for static content

---

## 🛠️ **Development Workflow**

### **Version Control**

- **Git Strategy**: Feature branching and semantic versioning
- **Commit Messages**: Conventional commit format
- **Code Review**: Pull request workflow and quality gates

### **Testing Strategy**

- **Unit Testing**: JavaScript function testing
- **Integration Testing**: API endpoint validation
- **UI Testing**: Cross-browser compatibility
- **Performance Testing**: Load testing and optimization

### **Deployment Pipeline**

- **Staging Environment**: Pre-production testing
- **Automated Deployment**: CI/CD pipeline integration
- **Rollback Strategy**: Quick reversion capabilities
- **Monitoring**: Real-time performance tracking

---

## 📝 **Code Quality & Best Practices**

### **JavaScript Standards**

- **ES6+ Features**: Modern syntax and language features
- **Error Handling**: Try-catch blocks and Promise rejection handling
- **Code Organization**: Modular functions and clear separation of concerns
- **Documentation**: JSDoc comments for complex functions

### **CSS Architecture**

- **Naming Conventions**: BEM methodology for class names
- **Responsive Design**: Mobile-first media queries
- **Performance**: Efficient selectors and minimal specificity
- **Maintainability**: CSS custom properties for theme management

### **HTML Semantics**

- **Accessibility**: ARIA labels and semantic elements
- **SEO Optimization**: Meta tags and structured data
- **Performance**: Resource loading optimization
- **Validation**: W3C compliant markup

---

## 🎓 **Learning Outcomes**

### **Technical Skills Demonstrated**

- **Full-Stack Development**: Frontend design with backend integration
- **AI Integration**: LLM API consumption and conversation management
- **Responsive Design**: Modern CSS techniques and mobile optimization
- **Asynchronous Programming**: Promise handling and error management
- **User Experience**: Intuitive interface design and accessibility

### **Problem-Solving Approaches**

- **API Limitations**: Rate limiting and error handling strategies
- **Performance Optimization**: Efficient data management and caching
- **Cross-Browser Compatibility**: Progressive enhancement techniques
- **Security Implementation**: API key protection and input validation

---

## 🤝 **Contributing**

### **Development Setup**

```bash
git clone https://github.com/dev-amolrakh/AI-College-Enquiry-Chatbot.git
cd AI-College-Enquiry-Chatbot
# Configure API key in chatbot.js
python -m http.server 8000
```

### **Code Standards**

- Follow existing naming conventions
- Add comments for complex logic
- Test across multiple browsers
- Maintain responsive design principles

---

## 📞 **Support & Contact**

**Developer**: DataDynamos Team
**Repository**: [GitHub](https://github.com/dev-amolrakh/AI-College-Enquiry-Chatbot)
**License**: MIT License
**Last Updated**: December 2024

---

This chatbot represents a modern approach to educational technology, combining AI capabilities with user-centric design to solve real-world problems in college selection and admission guidance. The technical implementation showcases contemporary web development practices and AI integration techniques suitable for production environments.
