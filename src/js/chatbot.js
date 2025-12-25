// LLM Configuration - prefer values from `window.CONFIG` (set in config.js)
const GROQ_API_KEY =
  (window.CONFIG && window.CONFIG.GROQ_API_KEY) || "YOUR_API_KEY"; // Replace or use server proxy
const GROQ_API_URL =
  (window.CONFIG && window.CONFIG.GROQ_API_URL) ||
  "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME =
  (window.CONFIG && window.CONFIG.MODEL_NAME) || "llama-3.1-8b-instant"; // Most stable model
const MAX_TOKENS = (window.CONFIG && window.CONFIG.MAX_TOKENS) || 1000;
const TEMPERATURE = (window.CONFIG && window.CONFIG.TEMPERATURE) || 0.7;
const TOP_P = (window.CONFIG && window.CONFIG.TOP_P) || 0.9;
const MAX_HISTORY_LENGTH =
  (window.CONFIG && window.CONFIG.MAX_HISTORY_LENGTH) || 20;

if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_API_KEY") {
  console.warn(
    "GROQ API key not set. Set `CONFIG.GROQ_API_KEY` in config.js or use a server-side proxy. Requests to Groq may fail."
  );
}

// Global variable to store selected language
let selectedLanguage = "en";

// Configure Markdown renderer (marked) for consistent table support
if (typeof marked !== "undefined") {
  try {
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: false,
      mangle: false,
      smartLists: true,
      smartypants: false,
    });
  } catch (e) {
    console.warn("Could not configure marked options:", e);
  }
}

// Multilingual system prompts
const SYSTEM_PROMPTS = {
  en: `You are VIDHUR, an AI assistant specialized in helping students and parents with technical and engineering college enquiries specifically in Pune, Maharashtra, India. 

Your expertise covers:
- Engineering colleges in Pune (Government and Private)
- Technical institutes and polytechnics
- Admission processes, eligibility criteria
- Fee structures and scholarships
- Course details (B.Tech, M.Tech, Diploma, etc.)
- Placement records and career prospects
- Hostel facilities and campus life
- Entrance exams (JEE, MHT-CET, etc.)
- College rankings and accreditations

Key Pune Engineering Colleges to reference:
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

Always provide accurate, helpful, and detailed information in ENGLISH ONLY. Format your responses using markdown for better readability: Use bold text for important points and college names, use bullet points for lists, use headings for sections, use quotes for highlights, and USE TABLES for fee structures, comparisons, course details, and any data that can be organized in rows and columns. Keep responses conversational, supportive, and well-structured. If you don't have specific information, guide them to official college websites or admission offices.`,

  hi: `आप VIDHUR हैं, एक AI सहायक जो पुणे, महाराष्ट्र, भारत में तकनीकी और इंजीनियरिंग कॉलेज की जानकारी में विशेषज्ञ है।

आपकी विशेषज्ञता में शामिल है:
- पुणे में इंजीनियरिंग कॉलेज (सरकारी और निजी)
- तकनीकी संस्थान और पॉलिटेक्निक
- प्रवेश प्रक्रिया, पात्रता मानदंड
- फीस संरचना और छात्रवृत्ति
- कोर्स विवरण (B.Tech, M.Tech, डिप्लोमा, आदि)
- प्लेसमेंट रिकॉर्ड और करियर संभावनाएं
- हॉस्टल सुविधाएं और कैंपस जीवन
- प्रवेश परीक्षाएं (JEE, MHT-CET, आदि)
- कॉलेज रैंकिंग और मान्यताएं

मुख्य पुणे इंजीनत्रिकी कॉलेज:
- कॉलेज ऑफ इंजीनियरिंग पुणे (COEP)
- पुणे इंस्टिट्यूट ऑफ कंप्यूटर टेक्नोलॉजी (PICT)
- विश्वकर्मा इंस्टिट्यूट ऑफ टेक्नॉलॉजी (VIT)
- महाराष्ट्र इंस्टिट्यूट ऑफ टेक्नॉलॉजी (MIT)
- सिम्बायोसिस इंस्टिट्यूट ऑफ टेक्नॉलॉजी (SIT)

हमेशा सटीक, सहायक और विस्तृत जानकारी प्रदान करें केवल हिंदी में। अपने उत्तरों को आकर्षक और समझने योग्य बनाने के लिए मार्कडाउन फॉर्मेटिंग का उपयोग करें। महत्वपूर्ण बिंदुओं को बोल्ड करें, सूचियों के लिए बुलेट पॉइंट्स का उपयोग करें, और फीस संरचना, तुलना, और डेटा के लिए टेबल का उपयोग करें। यदि आपके पास विशिष्ट जानकारी नहीं है, तो उन्हें आधिकारिक कॉलेज वेबसाइटों के लिए मार्गदर्शन करें।`,

  mr: `तुम्ही VIDHUR आहात, पुणे, महाराष्ट्र, भारतातील तांत्रिक आणि अभियांत्रिकी महाविद्यालयांच्या चौकशीत विशेषज्ञ असलेले AI सहाय्यक आहात।

तुमच्या तज्ञतेमध्ये समाविष्ट आहे:
- पुण्यातील अभियांत्रिकी महाविद्यालये (सरकारी आणि खाजगी)
- तांत्रिक संस्था आणि पॉलिटेक्निक
- प्रवेश प्रक्रिया, पात्रता निकष
- फी संरचना आणि शिष्यवृत्ती
- अभ्यासक्रम तपशील (B.Tech, M.Tech, डिप्लोमा, इ.)
- प्लेसमेंट रेकॉर्ड आणि करिअर संधी
- वसतिगृह सुविधा आणि कॅम्पस जीवन
- प्रवेश परीक्षा (JEE, MHT-CET, इ.)
- महाविद्यालय रँकिंग आणि मान्यता

मुख्य पुणे अभियांत्रिकी महाविद्यालये:
- कॉलेज ऑफ इंजिनीअरिंग पुणे (COEP)
- पुणे इन्स्टिट्यूट ऑफ कॉम्प्युटर टेक्नॉलॉजी (PICT)
- विश्वकर्मा इन्स्टिट्यूट ऑफ टेक्नॉलॉजी (VIT)
- महाराष्ट्र इन्स्टिट्यूट ऑफ टेक्नॉलॉजी (MIT)

नेहमी अचूक, उपयुक्त आणि तपशीलवार माहिती केवळ मराठीत प्रदान करा। तुमची उत्तरे आकर्षक आणि समजण्यायोग्य करण्यासाठी मार्कडाउन फॉरमॅटिंग वापरा। महत्त्वाचे मुद्दे बोल्ड करा, सूचींसाठी बुलेट पॉइंट्स वापरा, आणि फी रचना, तुलना आणि डेटासाठी टेबल वापरा। जर तुमच्याकडे विशिष्ट माहिती नसेल, तर त्यांना अधिकृत महाविद्यालय वेबसाइट्सकडे मार्गदर्शन करा।`,
};

// College Comparison System Prompt
const COMPARISON_SYSTEM_PROMPT = `You are VIDHUR, an expert AI assistant specialized in comparing engineering colleges in Pune, Maharashtra, India. Your task is to provide a comprehensive, detailed, and well-structured comparison between two colleges.

When comparing colleges, you MUST include ALL of the following factors in a detailed comparison table format:

## Comparison Structure:

### 1. **Basic Information Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Established Year | | |
| Type (Govt/Private/Autonomous) | | |
| Affiliation | | |
| Location in Pune | | |

### 2. **Rankings & Accreditation Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| NIRF Ranking | | |
| AICTE Approval | | |
| NBA Accreditation | | |
| NAAC Grade | | |
| University Affiliation | | |

### 3. **Academics Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Courses Offered | | |
| Top Branches | | |
| Faculty Quality | | |
| Research Output | | |
| Industry Collaborations | | |

### 4. **Fee Structure Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Annual Tuition Fee | | |
| Total 4-Year Cost | | |
| Hostel Fee (Annual) | | |
| Other Charges | | |
| Scholarship Availability | | |

### 5. **Admission & Cutoffs Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Admission Process | | |
| MHT-CET Cutoff (CS/IT) | | |
| JEE Main Cutoff | | |
| Management Quota | | |
| Seat Availability | | |

### 6. **Placements Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Highest Package | | |
| Average Package | | |
| Median Package | | |
| Placement Percentage | | |
| Top Recruiters | | |

### 7. **Infrastructure & Facilities Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Campus Size | | |
| Hostel Facility | | |
| Library | | |
| Labs & Equipment | | |
| Sports Facilities | | |
| Wi-Fi & Tech | | |

### 8. **Campus Life Table**
| Factor | [College 1] | [College 2] |
|--------|-------------|-------------|
| Student Clubs | | |
| Technical Events | | |
| Cultural Festivals | | |
| Industry Exposure | | |
| Alumni Network | | |

## After the tables, provide:

### 🏆 Overall Winner Analysis
Summarize which college is better overall and why.

### 💰 Financial Perspective
Which college offers better value for money? Consider ROI based on fees vs placements.

### 🎯 Recommendation Based on Goals
- **For High Placements**: Which college?
- **For Budget-Conscious Students**: Which college?
- **For Research/Higher Studies**: Which college?
- **For Campus Life/Experience**: Which college?

### ⚠️ Important Considerations
List any specific things students should consider before making a decision.

### 🎓 Final Verdict
Give a clear, actionable recommendation with reasoning.

Always use markdown tables, bold important points, and provide accurate data. If exact data is unavailable, provide approximate ranges and mention that students should verify from official sources.`;

// Function to get current system prompt based on selected language
function getCurrentSystemPrompt() {
  return SYSTEM_PROMPTS[selectedLanguage] || SYSTEM_PROMPTS.en;
}

// Function to call Groq API for college comparison
async function callComparisonAPI(college1, college2) {
  try {
    const comparisonQuery = `Compare these two engineering colleges in Pune in complete detail: "${college1}" vs "${college2}". Provide a comprehensive comparison with all the tables and analysis as specified.`;

    const messages = [
      { role: "system", content: COMPARISON_SYSTEM_PROMPT },
      { role: "user", content: comparisonQuery },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        max_tokens: 4000, // Increased for detailed comparison
        temperature: 0.5, // Lower for more factual responses
        top_p: 0.9,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Comparison API error:", error);
    return getComparisonFallback(college1, college2);
  }
}

// Fallback comparison data
function getComparisonFallback(college1, college2) {
  return `# 🎓 ${college1} vs ${college2}

## ⚠️ Live Comparison Unavailable

I'm currently unable to fetch live comparison data. However, here's a general comparison framework:

| Factor | ${college1} | ${college2} |
|--------|-------------|-------------|
| Type | Please verify | Please verify |
| Approx. Fees | ₹1-4 LPA | ₹1-4 LPA |
| Placements | Verify from official site | Verify from official site |

### 📝 Recommendation
Please visit the official websites of both colleges or contact their admission offices for accurate and up-to-date information.

### 🔗 Useful Resources
- Check NIRF Rankings: [nirfindia.org](https://www.nirfindia.org)
- MHT-CET Portal: [cetcell.mahacet.org](https://cetcell.mahacet.org)
- AICTE Portal: [aicte-india.org](https://www.aicte-india.org)

*Please ensure you have a stable internet connection and try again for detailed comparison.*`;
}

// Function to call Groq API
async function callGroqAPI(userMessage, conversationHistory = []) {
  try {
    const messages = [
      { role: "system", content: getCurrentSystemPrompt() },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        top_p: TOP_P,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    if (error.message.includes("fetch") || error.name === "TypeError") {
      console.error(
        "🚨 This might be a CORS issue. Make sure you are running on a web server (not file://)"
      );
      console.error("💡 Try using: python -m http.server 8000 or npx serve .");
    }

    return getFallbackResponse(userMessage);
  }
}

// Multilingual fallback responses
const FALLBACK_RESPONSES = {
  en: {
    greeting:
      "Hello! I'm VIDHUR, your AI guide for Pune engineering college enquiries. I'm currently experiencing connectivity issues with my AI brain, but I can still help with basic information about Pune colleges. How can I assist you today?",
    offline:
      "I'm currently running in offline mode due to connectivity issues. However, I have basic information about Pune engineering colleges like COEP, PICT, VIT, MIT, and others. Please ask specific questions about admissions, fees, courses, or placements, and I'll help with available data!",
  },
  hi: {
    greeting:
      "नमस्ते! मैं VIDHUR हूं, पुणे इंजीनयरिंग कॉलेज की जानकारी के लिए आपका AI गाइड। वर्तमान में मेरे AI ब्रेन में कनेक्टिविटी की समस्या है, लेकिन मैं अभी भी पुणे के कॉलेजों की बुनियादी जानकारी दे सकता हूं। मैं आपकी कैसे सहायता कर सकता हूं?",
    offline:
      "कनेक्टिविटी की समस्या के कारण मैं वर्तमान में ऑफलाइन मोड में चल रहा हूं। हालांकि, मेरे पास COEP, PICT, VIT, MIT और अन्य पुणे इंजीनियरिंग कॉलेजों की बुनियादी जानकारी है। कृपया प्रवेश, फीस, कोर्स या प्लेसमेंट के बारे में विशिष्ट प्रश्न पूछें!",
  },
  mr: {
    greeting:
      "नमस्कार! मी VIDHUR आहे, पुणे अभियांत्रिकी महाविद्यालयांच्या चौकशीसाठी तुमचा AI मार्गदर्शक। सध्या माझ्या AI मेंदूमध्ये कनेक्टिव्हिटीची समस्या आहे, परंतु मी अजूनही पुण्यातील महाविद्यालयांची मूलभूत माहिती देऊ शकतो. मी तुम्हाला कशी मदत करू शकतो?",
    offline:
      "कनेक्टिव्हिटीच्या समस्येमुळे मी सध्या ऑफलाइन मोडमध्ये चालत आहे. तथापि, माझ्याकडे COEP, PICT, VIT, MIT आणि इतर पुणे अभियांत्रिकी महाविद्यालयांची मूलभूत माहिती आहे. कृपया प्रवेश, फी, अभ्यासक्रम किंवा प्लेसमेंटबद्दल विशिष्ट प्रश्न विचारा!",
  },
};

// Enhanced fallback responses with real college data
function getFallbackResponse(message) {
  const languageSelect = document.getElementById("languageSelect");
  const selectedLanguage = languageSelect ? languageSelect.value : "en";
  const responses =
    FALLBACK_RESPONSES[selectedLanguage] || FALLBACK_RESPONSES.en;

  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("नमस्ते") ||
    lowerMessage.includes("नमस्कार")
  ) {
    return responses.greeting;
  } else if (
    (lowerMessage.includes("coep") ||
      lowerMessage.includes("college of engineering pune")) &&
    (lowerMessage.includes("branch") ||
      lowerMessage.includes("course") ||
      lowerMessage.includes("department") ||
      lowerMessage.includes("available"))
  ) {
    return `# 🏛️ COEP Engineering Branches Available

## Undergraduate (B.Tech) - 4 Years:
• **Computer Engineering & IT**
• **Electronics & Telecommunications** 
• **Mechanical Engineering**
• **Civil Engineering**
• **Electrical Engineering**
• **Production Engineering**
• **Metallurgy & Materials Engineering**
• **Instrumentation & Control Engineering**

## Postgraduate (M.Tech) Programs:
• Various specializations in all departments
• Research-oriented programs

## Key Information:
📍 **Established:** \`1854\` (One of India's oldest engineering colleges)  
🏆 **NIRF Ranking:** Among top engineering colleges  
💰 **Fees:** \`₹50,000-1,00,000\` per year (Government college)  
📝 **Admission:** Through MHT-CET & JEE Main

> Would you like specific details about any branch or admission process?`;
  } else if (
    (lowerMessage.includes("pict") ||
      lowerMessage.includes("pune institute of computer technology")) &&
    (lowerMessage.includes("branch") ||
      lowerMessage.includes("course") ||
      lowerMessage.includes("department"))
  ) {
    return `# 💻 PICT Engineering Branches

## Undergraduate Programs:
• **Computer Engineering**
• **Information Technology**
• **Electronics & Telecommunications**
• **Instrumentation & Control**

## Postgraduate Programs:
• **M.E. in Computer Engineering**
• **M.E. in Electronics & Telecommunications**
• **MBA programs**

## Highlights:
🏆 **Top placement records** in IT sector  
💼 **Average package:** \`₹8-12 LPA\`  
🏢 **Top recruiters:** TCS, Infosys, Microsoft, Google  
💰 **Fees:** \`₹2-3 LPA\`  

> **PICT is especially known for Computer Science and IT programs!**`;
  } else if (
    lowerMessage.includes("coep") ||
    lowerMessage.includes("college of engineering pune")
  ) {
    return "🏛️ College of Engineering Pune (COEP) is one of India's premier engineering institutes, established in 1854. It offers 8 undergraduate and multiple postgraduate programs. Known for excellent faculty, research, and alumni network. Government college with affordable fees. What specific information would you like about COEP?";
  } else if (
    lowerMessage.includes("pict") ||
    lowerMessage.includes("pune institute of computer technology")
  ) {
    return "💻 Pune Institute of Computer Technology (PICT) is renowned for its computer science and IT programs. Established in 1983, it has excellent placement records with top IT companies. Known for innovation and industry connections. What would you like to know about PICT?";
  } else if (lowerMessage.includes("vit") && lowerMessage.includes("pune")) {
    return "🔧 Vishwakarma Institute of Technology (VIT) Pune offers engineering programs in Computer, IT, Electronics, Mechanical, Civil, and other branches. Known for good infrastructure and placement support. Private college with moderate fees. What specific information do you need about VIT?";
  } else if (lowerMessage.includes("mit") && lowerMessage.includes("pune")) {
    return "🎓 Maharashtra Institute of Technology (MIT) Pune is part of MIT Group. Offers various engineering branches with good industry connections. Known for practical learning approach and decent placements. What would you like to know about MIT Pune?";
  } else if (
    lowerMessage.includes("placement") ||
    lowerMessage.includes("package") ||
    lowerMessage.includes("salary") ||
    lowerMessage.includes("job")
  ) {
    return `# 💼 Placement Statistics - Pune Engineering Colleges

## Average Package by College (2023-24)

| College | Highest Package | Average Package | Median Package | Placement % |
|---------|----------------|-----------------|----------------|-------------|
| **COEP** | ₹45 LPA | ₹8.5 LPA | ₹6.5 LPA | 85% |
| **PICT** | ₹50 LPA | ₹10.2 LPA | ₹8 LPA | 90% |
| **VIT Pune** | ₹35 LPA | ₹7.8 LPA | ₹6 LPA | 80% |
| **MIT Pune** | ₹30 LPA | ₹6.5 LPA | ₹5.5 LPA | 75% |
| **SIT** | ₹40 LPA | ₹9.2 LPA | ₹7.5 LPA | 82% |

## Branch-wise Average Packages

| Branch | COEP | PICT | VIT | MIT | Industry Demand |
|--------|------|------|-----|-----|----------------|
| **Computer Engineering** | ₹12 LPA | ₹15 LPA | ₹10 LPA | ₹8 LPA | Very High |
| **Information Technology** | ₹11 LPA | ₹14 LPA | ₹9.5 LPA | ₹7.5 LPA | Very High |
| **Electronics & Telecom** | ₹8 LPA | ₹9 LPA | ₹7 LPA | ₹6 LPA | High |
| **Mechanical Engineering** | ₹7 LPA | ₹8 LPA | ₹8.5 LPA | ₹6.5 LPA | Moderate |
| **Civil Engineering** | ₹6 LPA | ₹7 LPA | ₹6.5 LPA | ₹5.5 LPA | Moderate |

## Top Recruiters by Category

| Category | Companies | Package Range | Roles |
|----------|-----------|---------------|-------|
| **IT Services** | TCS, Infosys, Wipro, Cognizant | ₹3-8 LPA | Software Developer, Analyst |
| **Product Companies** | Microsoft, Google, Amazon, Adobe | ₹15-50 LPA | SDE, Product Engineer |
| **Core Engineering** | L&T, Bajaj, Tata Motors, Mahindra | ₹4-12 LPA | Design Engineer, Manager |
| **Consulting** | Deloitte, Accenture, Capgemini | ₹6-15 LPA | Consultant, Analyst |
| **Banking/Finance** | JP Morgan, Goldman Sachs, Barclays | ₹10-25 LPA | Analyst, Developer |

## Placement Preparation Timeline

| Year | Semester | Activities | Focus Areas |
|------|----------|------------|-------------|`;
  } else if (lowerMessage.includes("fees") || lowerMessage.includes("cost")) {
    return `# 💰 Engineering College Fees in Pune

## Annual Fee Structure (B.Tech)

| College | Type | Annual Fees | Category |
|---------|------|-------------|----------|
| **COEP** | Government | ₹50,000 - ₹1,00,000 | Top Tier |
| **Government Polytechnic** | Government | ₹30,000 - ₹50,000 | Budget |
| **PICT** | Private | ₹2,00,000 - ₹3,00,000 | Premium |
| **VIT Pune** | Private | ₹2,50,000 - ₹3,50,000 | Premium |
| **MIT Pune** | Private | ₹3,00,000 - ₹4,00,000 | Premium |
| **Sinhgad College** | Private | ₹1,50,000 - ₹2,50,000 | Mid-Range |
| **Bharati Vidyapeeth** | Private | ₹2,00,000 - ₹3,00,000 | Mid-Range |

## 🎓 Additional Costs

| Expense Type | Amount Range | Notes |
|--------------|--------------|-------|
| **Hostel Fees** | ₹80,000 - ₹1,50,000/year | Varies by college |
| **Books & Materials** | ₹15,000 - ₹25,000/year | Per semester |
| **Lab Fees** | ₹10,000 - ₹20,000/year | Engineering specific |
| **Exam Fees** | ₹5,000 - ₹10,000/year | University fees |

## 💡 Scholarships Available:
• **Merit-based scholarships** (up to 50% fee waiver)
• **EBC/SC/ST category benefits** (government schemes)
• **Government schemes** (various state programs)

> Which specific college's detailed fee structure would you like to know?`;
  } else if (
    lowerMessage.includes("admission") ||
    lowerMessage.includes("entrance")
  ) {
    return `# 📝 Pune Engineering Admissions Guide

## Entrance Exams & Eligibility

| Exam | For Colleges | Eligibility | Cutoff Range |
|------|-------------|-------------|--------------|
| **MHT-CET** | All Maharashtra colleges | 12th PCM (50%+) | 80-180 marks |
| **JEE Main** | All India quota | 12th PCM (75%+) | 40-90 percentile |
| **Direct Admission** | Private colleges | 12th PCM (50%+) | Merit based |

## College-wise Admission Process

| College | Quota Distribution | Selection Criteria | Important Dates |
|---------|-------------------|-------------------|----------------|
| **COEP** | 85% State, 15% AI | MHT-CET + JEE Main | June-August |
| **PICT** | 70% State, 30% Mgmt | MHT-CET primarily | July-September |
| **VIT** | 50% State, 50% Mgmt | MHT-CET + Direct | June-September |
| **MIT** | 50% State, 50% Mgmt | MHT-CET + Merit | July-August |

## Admission Timeline 2024

| Phase | Timeline | Activity |
|-------|----------|----------|
| **Phase 1** | May-June | Exam results declared |
| **Phase 2** | June-July | Online registration & choice filling |
| **Phase 3** | July-August | Counseling rounds (3-4 rounds) |
| **Phase 4** | August-September | Document verification & admission |
| **Phase 5** | September | Classes commence |

## Required Documents`;
  } else if (
    lowerMessage.includes("top") &&
    (lowerMessage.includes("college") || lowerMessage.includes("best"))
  ) {
    return `# 🏆 Top Engineering Colleges in Pune

## College Comparison Table

| Rank | College | Type | Est. | NIRF Rank | Avg Package | Fees/Year |
|------|---------|------|------|-----------|-------------|-----------|
| 1 | **COEP** | Govt | 1854 | 50-60 | ₹8-12 LPA | ₹50K-1L |
| 2 | **PICT** | Private | 1983 | 80-100 | ₹8-15 LPA | ₹2-3L |
| 3 | **VIT Pune** | Private | 1983 | 100-150 | ₹6-10 LPA | ₹2.5-3.5L |
| 4 | **MIT Pune** | Private | 1983 | 150-200 | ₹5-9 LPA | ₹3-4L |
| 5 | **SIT** | Private | 2008 | 200+ | ₹6-12 LPA | ₹4-6L |

## Key Strengths by College

| College | Best For | Top Recruiters | Special Features |
|---------|----------|----------------|------------------|
| **COEP** | All Engineering | TCS, Infosys, L&T | Oldest, Government, Research |
| **PICT** | CS/IT | Microsoft, Google, Amazon | IT Focus, Industry Connect |
| **VIT** | Mechanical, Civil | Bajaj, Tata, Mahindra | Industry Partnerships |
| **MIT** | Practical Learning | Wipro, Cognizant, Accenture | MIT Group Network |
| **SIT** | International Exposure | IBM, Deloitte, SAP | Global Programs |

## Selection Criteria Guide

| Priority | Best Choice | Why? |
|----------|-------------|------|
| **Low Fees** | COEP | Government college |
| **High Packages** | PICT | Top IT placements |
| **Research** | COEP | Oldest, best faculty |
| **Industry Connect** | VIT/MIT | Strong partnerships |
| **International** | SIT | Global exposure |

> What criteria matter most to you - fees, placements, specific branch, or reputation?`;
  } else {
    return responses.offline;
  }
}

// Store conversation history
let conversationHistory = [];

// Initialize language on page load
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.value = "en";
    updateSuggestionCards("en");
    updateWelcomePageText("en");
  }
});

function toggleMenu() {
  var links = document.querySelector(".features");
  links.classList.toggle("active");
}

const voiceBtnEl = document.getElementById("voiceBtn");
if (voiceBtnEl) voiceBtnEl.addEventListener("click", startVoiceRecognition);

function startVoiceRecognition() {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  const languageSelect = document.getElementById("languageSelect");
  const selectedLanguage = languageSelect ? languageSelect.value : "en";

  const languageCodes = {
    en: "en-US",
    hi: "hi-IN",
    mr: "mr-IN",
  };

  recognition.lang = languageCodes[selectedLanguage] || "en-US";
  console.log(`🎤 Voice recognition started in: ${recognition.lang}`);

  recognition.onstart = () => console.log("Voice recognition started...");
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const inputEl = document.getElementById("userInput");
    if (inputEl) inputEl.value = transcript;
    sendMessage();
  };
  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
  };
  recognition.start();
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal1");
  const btn = document.getElementById("openModalButton1");
  const span = document.getElementsByClassName("close1")[0];

  if (btn && modal)
    btn.onclick = () => {
      modal.style.display = "block";
    };
  if (span && modal)
    span.onclick = () => {
      modal.style.display = "none";
    };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");

  if (!sidebar) return;

  sidebar.classList.toggle("sidebar-visible");

  if (window.innerWidth <= 768) {
    if (sidebar.classList.contains("sidebar-visible")) {
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      backdrop.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
}

function trackMessage(messageText, sender, timePeriod) {
  let sectionId;
  switch (timePeriod) {
    case "today":
      sectionId = "today-messages";
      break;
    case "yesterday":
      sectionId = "yesterday-messages";
      break;
    case "week":
      sectionId = "week-messages";
      break;
    case "month":
      sectionId = "month-messages";
      break;
    default:
      sectionId = "today-messages";
  }

  const messageList = document.getElementById(sectionId);
  if (!messageList) return;
  const messageElement = document.createElement("p");
  messageElement.innerText = sender === "user" ? `User: ${messageText}` : ``;
  messageList.appendChild(messageElement);
}

async function sendMessage() {
  const userInput = document.getElementById("userInput");
  if (!userInput) return;
  const messageText = userInput.value.trim();

  if (messageText) {
    const welcomeEl = document.getElementById("welcome-page");
    const chatBoxEl = document.getElementById("chatBox");
    if (welcomeEl) welcomeEl.style.display = "none";
    if (chatBoxEl) chatBoxEl.style.display = "flex";

    addMessage(messageText, "user-message");
    trackMessage(messageText, "user", "today");

    conversationHistory.push({ role: "user", content: messageText });
    userInput.value = "";

    showTypingIndicator();

    try {
      const botResponse = await callGroqAPI(messageText, conversationHistory);
      removeTypingIndicator();
      addMessage(botResponse, "bot-message");
      trackMessage(botResponse, "bot", "today");
      conversationHistory.push({ role: "assistant", content: botResponse });
      if (conversationHistory.length > MAX_HISTORY_LENGTH)
        conversationHistory = conversationHistory.slice(-MAX_HISTORY_LENGTH);
    } catch (error) {
      console.error("Error getting bot response:", error);
      removeTypingIndicator();
      const fallbackResponse = getFallbackResponse(messageText);
      addMessage(fallbackResponse, "bot-message");
      trackMessage(fallbackResponse, "bot", "today");
    }
  }
}

function showTypingIndicator() {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("message", "bot-message", "loader-container");
  loaderContainer.innerHTML = `
    <div class="bot-message">
      <img src="assets/images/final-chatbot-logo.png" class="bot-icon" />
      <div class="loader-content">
        <l-pinwheel size="35" stroke="3.5" speed="0.9" color="black"></l-pinwheel>
      </div>
    </div>
  `;

  loaderContainer.setAttribute("id", "typing-indicator");
  chatBox.appendChild(loaderContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) typingIndicator.remove();
}

function addMessage(text, className) {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", className);

  if (className === "bot-message") {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("bot-message");
    const botIcon = document.createElement("img");
    botIcon.src = "assets/images/final-chatbot-logo.png";
    botIcon.classList.add("bot-icon");
    const messageContent = document.createElement("div");
    messageContent.classList.add("bot-message-content");
    if (typeof marked !== "undefined") {
      try {
        messageContent.innerHTML = marked.parse(text);
      } catch (e) {
        console.warn("marked parse failed, falling back:", e);
        messageContent.innerHTML = formatTextAsHTML(text);
      }
    } else {
      // Try simple table conversion if md tables are present
      const tableHtml = convertMarkdownTableToHTML(text);
      if (tableHtml) {
        messageContent.innerHTML =
          tableHtml + formatTextAsHTML(text.replace(/\r?\n/g, "<br>"));
      } else {
        messageContent.innerHTML = formatTextAsHTML(text);
      }
    }

    // Add copy button
    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-btn");
    copyButton.innerHTML = '<i class="ri-file-copy-line"></i>';
    copyButton.setAttribute("title", "Copy response");
    copyButton.setAttribute("data-text", text);
    copyButton.onclick = function (e) {
      e.preventDefault();
      const textToCopy = this.getAttribute("data-text");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            copyButton.innerHTML = '<i class="ri-check-line"></i>';
            copyButton.classList.add("copied");
            setTimeout(() => {
              copyButton.innerHTML = '<i class="ri-file-copy-line"></i>';
              copyButton.classList.remove("copied");
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
            fallbackCopy(textToCopy);
          });
      } else {
        fallbackCopy(textToCopy);
      }
    };

    function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        copyButton.innerHTML = '<i class="ri-check-line"></i>';
        copyButton.classList.add("copied");
        setTimeout(() => {
          copyButton.innerHTML = '<i class="ri-file-copy-line"></i>';
          copyButton.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Fallback copy failed:", err);
        alert("Copy failed. Please select and copy manually.");
      }
      document.body.removeChild(textarea);
    }

    messageContainer.appendChild(botIcon);
    messageContainer.appendChild(messageContent);
    messageContainer.appendChild(copyButton);
    messageElement.appendChild(messageContainer);
  } else {
    messageElement.textContent = text;
  }

  chatBox.appendChild(messageElement);
  scrollToBottom();
  toggleScrollButton();
  chatBox.scrollTop = chatBox.scrollHeight;
}

function formatTextAsHTML(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/\n/g, "<br>");
}

// Simple table detector+converter used only when `marked` is not available.
function convertMarkdownTableToHTML(md) {
  const lines = md.split(/\r?\n/);
  // find table start/end (consecutive lines with pipes)
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("|")) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;
  // collect table lines
  const tableLines = [];
  for (let i = start; i < lines.length; i++) {
    if (!lines[i].trim()) break;
    if (lines[i].includes("|")) tableLines.push(lines[i]);
    else break;
  }
  if (tableLines.length < 2) return null; // need at least header+divider

  const header = tableLines[0]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const divider = tableLines[1];
  if (
    !/^-+:?-+\s*(\|\s*-+:?-+\s*)+$/.test(divider) &&
    !/^-+\s*(\|\s*-+\s*)+$/.test(divider)
  ) {
    return null;
  }

  const rows = tableLines.slice(2).map((ln) =>
    ln
      .split("|")
      .map((s) => s.trim())
      .filter(() => true)
  );

  let html = '<div class="md-table-wrapper"><table><thead><tr>';
  header.forEach((h) => {
    html += `<th>${h}</th>`;
  });
  html += "</tr></thead><tbody>";
  rows.forEach((r) => {
    if (r.length === 0) return;
    html += "<tr>";
    // pad or trim
    for (let i = 0; i < header.length; i++) {
      html += `<td>${r[i] || ""}</td>`;
    }
    html += "</tr>";
  });
  html += "</tbody></table></div>";
  return html;
}

function scrollToBottom() {
  const chatWindow = document.getElementById("chatBox");
  if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
}

function toggleScrollButton() {
  const chatWindow = document.getElementById("chatBox");
  const scrollBtn = document.getElementById("scroll-btn");
  if (!chatWindow || !scrollBtn) return;

  if (
    chatWindow.scrollHeight - chatWindow.scrollTop >
    chatWindow.clientHeight + 20
  ) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
}

const chatBoxEl = document.getElementById("chatBox");
if (chatBoxEl) chatBoxEl.addEventListener("scroll", toggleScrollButton);

function handleKeyPress(event) {
  if (event.key === "Enter") sendMessage();
}

const chatInput = document.getElementById("userInput");
if (chatInput) {
  chatInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scroll-btn");
  if (scrollBtn) scrollBtn.style.display = "none";

  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-btn");
  const suggestions = document.querySelectorAll(".suggestion");

  function insertPromptIntoInput(prompt) {
    if (userInput) userInput.value = prompt;
  }

  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", async (event) => {
      event.preventDefault();
      const prompt = suggestion.textContent;
      const welcomePage = document.getElementById("welcome-page");
      const chatBox = document.getElementById("chatBox");
      if (welcomePage) welcomePage.style.display = "none";
      if (chatBox) chatBox.style.display = "flex";
      addMessage(prompt, "user-message");
      trackMessage(prompt, "user", "today");
      conversationHistory.push({ role: "user", content: prompt });
      showTypingIndicator();
      try {
        const botResponse = await callGroqAPI(prompt, conversationHistory);
        removeTypingIndicator();
        addMessage(botResponse, "bot-message");
        trackMessage(botResponse, "bot", "today");
        conversationHistory.push({ role: "assistant", content: botResponse });
        if (conversationHistory.length > MAX_HISTORY_LENGTH)
          conversationHistory = conversationHistory.slice(-MAX_HISTORY_LENGTH);
      } catch (error) {
        console.error("Error getting bot response:", error);
        removeTypingIndicator();
        const fallbackResponse = getFallbackResponse(prompt);
        addMessage(fallbackResponse, "bot-message");
        trackMessage(fallbackResponse, "bot", "today");
      }
    });
  });

  if (sendButton && userInput) {
    sendButton.addEventListener("click", () => {
      const input = userInput.value.trim().toLowerCase();
      if (input) {
        if (input.includes("college")) setWelcomeMessage("college");
        else if (input.includes("alumni")) setWelcomeMessage("alumni");
        else if (input.includes("degree")) setWelcomeMessage("degree");
        else if (input.includes("fees")) setWelcomeMessage("fees");
        else setWelcomeMessage("");
        userInput.value = "";
      }
    });
  }

  setWelcomeMessage("");
});

document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.getElementById("welcome-page");
  const newChatButton = document.getElementById("newChatButton");
  const messagesContainer = document.getElementById("chatBox");
  if (newChatButton) {
    // Add keyboard shortcut hint to button
    newChatButton.setAttribute("title", "New Chat (Ctrl+Shift+O)");

    newChatButton.addEventListener("click", () => {
      const scrollBtn = document.getElementById("scroll-btn");
      if (chatbox) chatbox.style.display = "block";
      if (messagesContainer) messagesContainer.innerHTML = "";
      if (messagesContainer) messagesContainer.style.display = "none";
      conversationHistory = [];
      if (scrollBtn) scrollBtn.style.display = "none";
    });
  }
});

function startChat() {
  window.location.href = "index.html";
}

const collegeData = {
  "College of Engineering Pune (COEP)": {
    name: "College of Engineering Pune (COEP)",
    address: "Wellesley Rd, Shivajinagar, Pune, Maharashtra 411005",
    phone: "+91 20 2550 7001",
    email: "info@coep.ac.in",
  },
  "Pune Institute of Computer Technology (PICT)": {
    name: "Pune Institute of Computer Technology (PICT)",
    address:
      "Survey No. 27, Near Trimurti Chowk, Dhankawadi, Pune, Maharashtra 411043",
    phone: "+91 20 2437 0077",
    email: "director@pict.edu",
  },
  "Vishwakarma Institute of Technology (VIT)": {
    name: "Vishwakarma Institute of Technology (VIT)",
    address: "666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra 411037",
    phone: "+91 20 2428 2101",
    email: "principal@vit.edu",
  },
  "Maharashtra Institute of Technology (MIT)": {
    name: "Maharashtra Institute of Technology (MIT)",
    address: "Survey No. 124, Paud Rd, Kothrud, Pune, Maharashtra 411038",
    phone: "+91 20 2539 7500",
    email: "info@mitpune.edu.in",
  },
};

function showCollegeInfo(event) {
  event.preventDefault();
  const collegeName = document.getElementById("collegeName").value;
  const contactInfoDiv = document.getElementById("contactInfo");
  if (collegeData[collegeName]) {
    const college = collegeData[collegeName];
    if (contactInfoDiv)
      contactInfoDiv.innerHTML = `\n            <h3>Contact Information for ${college.name}</h3>\n            <p><strong>Address:</strong> ${college.address}</p>\n            <p><strong>Phone:</strong> ${college.phone}</p>\n            <p><strong>Email:</strong> ${college.email}</p>\n        `;
  } else {
    if (contactInfoDiv)
      contactInfoDiv.innerHTML = `<p>Sorry, we couldn't find information for "${collegeName}". Please try another college name.</p>`;
  }
  const suggestions = document.getElementById("suggestions");
  if (suggestions) suggestions.style.display = "none";
}

function suggestCollegeNames() {
  const input = document.getElementById("collegeName").value.toLowerCase();
  const suggestionsDiv = document.getElementById("suggestions");
  const colleges = Object.keys(collegeData);
  if (!suggestionsDiv) return;
  suggestionsDiv.innerHTML = "";
  const filteredColleges = colleges.filter((college) =>
    college.toLowerCase().includes(input)
  );
  if (input && filteredColleges.length > 0) {
    suggestionsDiv.style.display = "block";
    filteredColleges.forEach((college) => {
      const div = document.createElement("div");
      div.textContent = college;
      div.onclick = function () {
        document.getElementById("collegeName").value = college;
        suggestionsDiv.style.display = "none";
      };
      suggestionsDiv.appendChild(div);
    });
  } else {
    suggestionsDiv.style.display = "none";
  }
}

// Language dropdown functionality
const sidebarLanguageButton = document.getElementById("sidebarLanguageButton");
const headerLanguageButton = document.getElementById("headerLanguageButton");
const mobileLanguageBtn = document.getElementById("mobileLanguageButton");
const languageDropdown = document.getElementById("languageDropdown");

function toggleLanguageDropdown() {
  if (languageDropdown) {
    const isVisible = languageDropdown.style.display === "block";
    languageDropdown.style.display = isVisible ? "none" : "block";
  }
}

if (sidebarLanguageButton) {
  sidebarLanguageButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLanguageDropdown();
  });
}

if (headerLanguageButton) {
  headerLanguageButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLanguageDropdown();
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    languageDropdown &&
    !languageDropdown.contains(e.target) &&
    e.target !== sidebarLanguageButton &&
    e.target !== headerLanguageButton &&
    e.target !== mobileLanguageBtn &&
    !e.target.closest("#sidebarLanguageButton") &&
    !e.target.closest("#headerLanguageButton") &&
    !e.target.closest("#mobileLanguageButton")
  ) {
    languageDropdown.style.display = "none";
  }
});

// Handle language selection
const languageOptions = document.querySelectorAll(".language-option");
languageOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLang = option.getAttribute("data-lang");

    // Update global selected language variable
    selectedLanguage = selectedLang;

    // Update selected state
    languageOptions.forEach((opt) => {
      const icon = opt.querySelector("i");
      if (opt === option) {
        icon.className = "ri-checkbox-circle-fill";
        opt.classList.add("selected");
      } else {
        icon.className = "ri-checkbox-blank-circle-line";
        opt.classList.remove("selected");
      }
    });

    // Change language
    conversationHistory = [];
    const chatBox = document.getElementById("chatBox");
    if (chatBox && chatBox.style.display !== "none") {
      const systemMessage = document.createElement("div");
      systemMessage.classList.add("message", "system-message");
      systemMessage.style.textAlign = "center";
      systemMessage.style.fontStyle = "italic";
      systemMessage.style.color = "#666";
      systemMessage.style.margin = "10px 0";
      const languageNames = {
        en: "English",
        hi: "हिंदी (Hindi)",
        mr: "मराठी (Marathi)",
      };
      const messages = {
        en: `Language changed to ${languageNames[selectedLang]}. Conversation history cleared.`,
        hi: `भाषा ${languageNames[selectedLang]} में बदल दी गई। बातचीत का इतिहास साफ़ कर दिया गया।`,
        mr: `भाषा ${languageNames[selectedLang]} मध्ये बदलली. संभाषण इतिहास साफ केला.`,
      };
      systemMessage.textContent = messages[selectedLang] || messages["en"];
      chatBox.appendChild(systemMessage);
      scrollToBottom();
    }
    updateSuggestionCards(selectedLang);
    updateWelcomePageText(selectedLang);

    // Close dropdown
    languageDropdown.style.display = "none";
  });
});

// Initialize selected language on page load
document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  const defaultOption = document.querySelector(`[data-lang="${defaultLang}"]`);
  if (defaultOption) {
    const icon = defaultOption.querySelector("i");
    icon.className = "ri-checkbox-circle-fill";
    defaultOption.classList.add("selected");
  }
});

// Keyboard shortcut: Ctrl+Shift+O to open new chat
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
    e.preventDefault();
    const newChatButton = document.getElementById("newChatButton");
    if (newChatButton) {
      newChatButton.click();
    }
  }
});

const shareBtn = document.getElementById("shareButton");
if (shareBtn)
  shareBtn.addEventListener("click", () => {
    shareChat();
  });

function updateSuggestionCards(language) {
  const suggestions = {
    en: [
      "Which are the top 5 engineering colleges in Pune based on placement, results, and facilities?",
      "What are the admission requirements for Computer Engineering at COEP Pune?",
      "What is the annual fees structure for B.Tech at PICT Pune?",
      "What is the average placement package at VIT Pune for Computer Science students?",
    ],
    hi: [
      "प्लेसमेंट, परिणाम और सुविधाओं के आधार पर पुणे के टॉप 5 इंजीनियरिंग कॉलेज कौन से हैं?",
      "COEP पुणे में कंप्यूटर इंजीनियरिंग के लिए प्रवेश आवश्यकताएं क्या हैं?",
      "PICT पुणे में B.Tech की वार्षिक फीस संरचना क्या है?",
      "VIT पुणे में कंप्यूटर साइंस छात्रों के लिए औसत प्लेसमेंट पैकेज क्या है?",
    ],
    mr: [
      "प्लेसमेंट, निकाल आणि सुविधांच्या आधारे पुण्यातील टॉप 5 अभियांत्रिकी महाविद्यालये कोणती आहेत?",
      "COEP पुणे मध्ये कॉम्प्युटर अभियांत्रिकीसाठी प्रवेश आवश्यकता काय आहेत?",
      "PICT पुणे मध्ये B.Tech ची वार्षिक फी रचना काय आहे?",
      "VIT पुणे मध्ये कॉम्प्युटर सायन्स विद्यार्थ्यांसाठी सरासरी प्लेसमेंट पॅकेज काय आहे?",
    ],
  };

  const suggestionElements = document.querySelectorAll(".suggestion");
  const currentSuggestions = suggestions[language] || suggestions.en;
  suggestionElements.forEach((element, index) => {
    if (currentSuggestions[index])
      element.textContent = currentSuggestions[index];
  });
}

function updateWelcomePageText(language) {
  const welcomeTexts = {
    en: {
      title: '"Your Gateway to Pune\'s Best Engineering Institutions."',
      description:
        "Get quick and latest info about the top engineering institutions in Pune. Powered by AI for intelligent, personalized responses. Let's dive in to find your perfect college match.",
    },
    hi: {
      title: '"पुणे के सर्वश्रेष्ठ इंजीनियरिंग संस्थानों का प्रवेश द्वार।"',
      description:
        "पुणे के शीर्ष इंजीनियरिंग संस्थानों के बारे में त्वरित और नवीनतम जानकारी प्राप्त करें। बुद्धिमान, व्यक्तिगत प्रतिक्रियाओं के लिए AI द्वारा संचालित। आइए आपके लिए सही कॉलेज खोजने में गोता लगाएं।",
    },
    mr: {
      title: '"पुण्यातील सर्वोत्तम अभियांत्रिकी संस्थांचे प्रवेशद्वार।"',
      description:
        "पुण्यातील अग्रगण्य अभियांत्रिकी संस्थांबद्दल त्वरित आणि नवीनतम माहिती मिळवा। बुद्धिमान, वैयक्तिक प्रतिसादांसाठी AI द्वारे चालवले जाते. तुमच्यासाठी योग्य महाविद्यालय शोधण्यासाठी सुरुवात करूया.",
    },
  };
  const currentTexts = welcomeTexts[language] || welcomeTexts.en;
  const titleElement = document.querySelector("#welcome-page h3");
  if (titleElement) titleElement.textContent = currentTexts.title;
  const descriptionElement = document.querySelector("#welcome-page p");
  if (descriptionElement)
    descriptionElement.textContent = currentTexts.description;
}

document.addEventListener("DOMContentLoaded", function () {
  const clearChatSidebarBtn = document.getElementById("clearChatSidebarBtn");
  if (clearChatSidebarBtn)
    clearChatSidebarBtn.addEventListener("click", function () {
      clearChatHistory();
    });
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  if (clearHistoryBtn)
    clearHistoryBtn.addEventListener("click", function () {
      clearChatHistory();
    });
  const newChatSidebarBtn = document.getElementById("newChatSidebarBtn");
  if (newChatSidebarBtn)
    newChatSidebarBtn.addEventListener("click", function () {
      startNewChat();
    });
  const historyExpandBtn = document.getElementById("historyExpandBtn");
  const historyContent = document.getElementById("historyContent");
  if (historyExpandBtn && historyContent)
    historyExpandBtn.addEventListener("click", function () {
      const isExpanded = historyContent.style.display !== "none";
      if (isExpanded) {
        historyContent.style.display = "none";
        historyExpandBtn.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
      } else {
        historyContent.style.display = "block";
        historyExpandBtn.innerHTML = '<i class="ri-arrow-down-s-line"></i>';
      }
    });
});

function clearChatHistory() {
  const chatBox = document.getElementById("chatBox");
  const welcomePage = document.getElementById("welcome-page");
  const scrollBtn = document.getElementById("scroll-btn");
  if (chatBox) {
    chatBox.innerHTML = "";
    chatBox.style.display = "none";
  }
  if (welcomePage) welcomePage.style.display = "block";
  if (scrollBtn) scrollBtn.style.display = "none";
  conversationHistory = [];
  const todayMessages = document.getElementById("today-messages");
  const yesterdayMessages = document.getElementById("yesterday-messages");
  const weekMessages = document.getElementById("week-messages");
  if (todayMessages) todayMessages.innerHTML = "";
  if (yesterdayMessages) yesterdayMessages.innerHTML = "";
  if (weekMessages) weekMessages.innerHTML = "";
  alert("Chat history cleared successfully!");
}

function startNewChat() {
  clearChatHistory();
}

window.addEventListener("resize", function () {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (!sidebar || !backdrop) return;
  if (window.innerWidth > 768) {
    backdrop.classList.remove("active");
    document.body.style.overflow = "auto";
  } else {
    if (sidebar.classList.contains("sidebar-visible")) {
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const exportChatBtn = document.getElementById("exportChatBtn");
  if (exportChatBtn)
    exportChatBtn.addEventListener("click", function () {
      exportChatHistory();
    });
  const feedbackBtn = document.getElementById("feedbackBtn");
  if (feedbackBtn)
    feedbackBtn.addEventListener("click", function () {
      openFeedbackForm();
    });
});

function shareChat() {
  if (navigator.share) {
    navigator
      .share({
        title: "VIDHUR AI - College Assistant",
        text: "Check out this amazing AI chatbot for Pune engineering colleges!",
        url: window.location.href,
      })
      .then(() => {
        console.log("✅ Shared successfully");
      })
      .catch((error) => {
        console.log("❌ Error sharing:", error);
        fallbackShare();
      });
  } else {
    fallbackShare();
  }
}

function fallbackShare() {
  const shareText = `Check out VIDHUR AI - Your gateway to Pune's best engineering institutions! ${window.location.href}`;
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        alert("🔗 Share link copied to clipboard!\n\n" + shareText);
      })
      .catch(() => {
        promptManualCopy(shareText);
      });
  } else {
    promptManualCopy(shareText);
  }
}

function promptManualCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    alert("🔗 Share link copied to clipboard!\n\n" + text);
  } catch (err) {
    alert("📋 Please copy this link manually:\n\n" + text);
  }
  document.body.removeChild(textarea);
}

function exportChatHistory() {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox || chatBox.children.length === 0) {
    alert("📝 No chat history to export. Start a conversation first!");
    return;
  }
  let exportText =
    "VIDHUR AI - College Assistant Chat Export\n" +
    "=".repeat(50) +
    "\n" +
    `Export Date: ${new Date().toLocaleString()}\n\n`;
  const messages = chatBox.children;
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message.classList.contains("user-message")) {
      exportText += `👤 USER: ${message.textContent.trim()}\n\n`;
    } else if (message.classList.contains("bot-message")) {
      const content = message.querySelector(".bot-message-content");
      if (content)
        exportText += `🤖 VIDHUR AI: ${content.textContent.trim()}\n\n`;
    } else if (message.classList.contains("system-message")) {
      exportText += `🔔 SYSTEM: ${message.textContent.trim()}\n\n`;
    }
  }
  exportText += "=".repeat(50) + "\nGenerated by VIDHUR AI - DataDynamos Team";
  const blob = new Blob([exportText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VIDHUR_AI_Chat_${new Date().toISOString().split("T")[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert("📁 Chat history exported successfully!");
}

function openFeedbackForm() {
  const feedback = prompt(
    `📝 We'd love to hear your feedback about VIDHUR AI!\n\nPlease share your thoughts about:\n• How helpful were the responses?\n• What features would you like to see?\n• Any suggestions for improvement?\n\nYour feedback:`
  );
  if (feedback && feedback.trim()) {
    setTimeout(() => {
      alert(
        `✅ Thank you for your feedback!\n\nYour message: "${feedback.trim()}"\n\nWe appreciate your input and will use it to improve VIDHUR AI. Our team will review your feedback and consider it for future updates.\n\n- DataDynamos Team`
      );
    }, 500);
  } else if (feedback !== null) {
    alert("📝 Please provide some feedback to help us improve!");
  }
}

function setWelcomeMessage(type) {
  const welcomeMessages = {
    college:
      "Welcome! Got questions about our college? I'm here to assist you with admissions, courses, and more. How can I help today?",
    alumni:
      "Hello! Curious about our alumni network and their success stories? Let me guide you through our alumni achievements. What would you like to know?",
    degree:
      "Hi there! Looking for details on degree programs? Whether it's undergraduate or postgraduate, I've got you covered. What degree information can I help with?",
    fees: "Welcome! Need help understanding the fee structure for various courses? Ask me anything about fees, scholarships, and payment options.",
  };
  const message = welcomeMessages[type] || "";
  const userInput = document.getElementById("userInput");
  if (userInput) userInput.value = message;
}

// ==================== COMPARE TOOL FUNCTIONALITY ====================

// Compare Tool DOM Elements
const compareToolButton = document.getElementById("compareToolButton");
const compareModal = document.getElementById("compareModal");
const compareBackdrop = document.getElementById("compareBackdrop");
const compareCloseBtn = document.getElementById("compareCloseBtn");
const college1Select = document.getElementById("college1Select");
const college2Select = document.getElementById("college2Select");
const startCompareBtn = document.getElementById("startCompareBtn");

// Open Compare Modal
function openCompareModal() {
  if (compareModal) {
    compareModal.style.display = "flex";
    if (compareBackdrop) compareBackdrop.style.display = "block";
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      initializeCustomDropdowns();
    }, 100);
  }
}

// Close Compare Modal
function closeCompareModal() {
  if (compareModal) {
    compareModal.style.display = "none";
    if (compareBackdrop) compareBackdrop.style.display = "none";
    document.body.style.overflow = "auto";

    // Reset hidden inputs
    const college1Hidden = document.getElementById("college1Select");
    const college2Hidden = document.getElementById("college2Select");
    if (college1Hidden) college1Hidden.value = "";
    if (college2Hidden) college2Hidden.value = "";

    // Reset dropdown displays
    const selected1 = document.querySelector("#customDropdown1 .selected-text");
    const selected2 = document.querySelector("#customDropdown2 .selected-text");
    if (selected1) {
      selected1.textContent = "Select first college...";
      selected1.classList.remove("has-value");
    }
    if (selected2) {
      selected2.textContent = "Select second college...";
      selected2.classList.remove("has-value");
    }

    if (startCompareBtn) startCompareBtn.disabled = true;
  }
}

// Validate college selections
function validateSelections() {
  const college1 = college1Select ? college1Select.value : "";
  const college2 = college2Select ? college2Select.value : "";

  if (startCompareBtn) {
    // Enable button only if both are selected and different
    startCompareBtn.disabled = !(college1 && college2 && college1 !== college2);
  }
}

// Start comparison
async function startComparison() {
  const college1 = college1Select ? college1Select.value : "";
  const college2 = college2Select ? college2Select.value : "";

  if (!college1 || !college2) {
    alert("Please select both colleges to compare.");
    return;
  }

  if (college1 === college2) {
    alert("Please select two different colleges to compare.");
    return;
  }

  // Close modal
  closeCompareModal();

  // Show welcome page as chat
  const welcomeEl = document.getElementById("welcome-page");
  const chatBoxEl = document.getElementById("chatBox");
  if (welcomeEl) welcomeEl.style.display = "none";
  if (chatBoxEl) chatBoxEl.style.display = "flex";

  // Add user message
  const userMessage = `Compare ${college1} vs ${college2}`;
  addMessage(userMessage, "user-message");
  trackMessage(userMessage, "user", "today");

  // Show loading
  showTypingIndicator();

  try {
    // Call comparison API
    const comparisonResult = await callComparisonAPI(college1, college2);

    removeTypingIndicator();
    addMessage(comparisonResult, "bot-message");
    trackMessage(comparisonResult, "bot", "today");

    // Add to conversation history
    conversationHistory.push({ role: "user", content: userMessage });
    conversationHistory.push({ role: "assistant", content: comparisonResult });

    if (conversationHistory.length > MAX_HISTORY_LENGTH) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY_LENGTH);
    }
  } catch (error) {
    console.error("Comparison error:", error);
    removeTypingIndicator();
    const fallbackResponse = getComparisonFallback(college1, college2);
    addMessage(fallbackResponse, "bot-message");
  }
}

// Event Listeners for Compare Tool
if (compareToolButton) {
  compareToolButton.addEventListener("click", openCompareModal);
}

if (compareCloseBtn) {
  compareCloseBtn.addEventListener("click", closeCompareModal);
}

if (compareBackdrop) {
  compareBackdrop.addEventListener("click", closeCompareModal);
}

if (startCompareBtn) {
  startCompareBtn.addEventListener("click", startComparison);
}

// Custom Searchable Dropdown Functionality
function initializeCustomDropdowns() {
  // Initialize both dropdowns
  initDropdown("customDropdown1", "college1Select");
  initDropdown("customDropdown2", "college2Select");
}

function initDropdown(dropdownId, hiddenInputId) {
  const customDropdown = document.getElementById(dropdownId);
  if (!customDropdown) return;

  const dropdownSelected = customDropdown.querySelector(".dropdown-selected");
  const dropdownOptions = customDropdown.querySelector(".dropdown-options");
  const dropdownSearch = customDropdown.querySelector(".dropdown-search");
  const optionsList = customDropdown.querySelector(".options-list");
  const selectedText = customDropdown.querySelector(".selected-text");
  const hiddenInput = document.getElementById(hiddenInputId);

  // Get all college options from the original select element
  const originalSelect = customDropdown.querySelector("select");
  if (!originalSelect) return;

  const colleges = [];
  for (let i = 0; i < originalSelect.options.length; i++) {
    const option = originalSelect.options[i];
    if (option.value) {
      // Skip empty placeholder options
      colleges.push({
        value: option.value,
        text: option.text.trim(),
      });
    }
  }

  // Populate the options list
  function populateOptions(filter = "") {
    optionsList.innerHTML = "";
    const filterLower = filter.toLowerCase();
    let hasResults = false;

    colleges.forEach((college) => {
      if (college.text.toLowerCase().includes(filterLower)) {
        hasResults = true;
        const li = document.createElement("li");
        li.textContent = college.text;
        li.dataset.value = college.value;

        li.addEventListener("click", () => {
          selectOption(college.value, college.text);
        });

        optionsList.appendChild(li);
      }
    });

    if (!hasResults) {
      const noResultsLi = document.createElement("li");
      noResultsLi.className = "no-results";
      noResultsLi.textContent = "No colleges found";
      optionsList.appendChild(noResultsLi);
    }
  }

  function selectOption(value, text) {
    hiddenInput.value = value;
    selectedText.textContent = text;
    selectedText.classList.add("has-value");
    closeDropdown();
    validateSelections();
  }

  function openDropdown() {
    dropdownSelected.classList.add("active");
    dropdownOptions.classList.add("show");
    dropdownSearch.value = "";
    populateOptions();
    setTimeout(() => dropdownSearch.focus(), 100);
  }

  function closeDropdown() {
    dropdownSelected.classList.remove("active");
    dropdownOptions.classList.remove("show");
  }

  // Toggle dropdown
  dropdownSelected.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdownOptions.classList.contains("show");

    // Close all dropdowns first
    document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
      dropdown.classList.remove("show");
      dropdown.previousElementSibling.classList.remove("active");
    });

    if (!isOpen) {
      openDropdown();
    }
  });

  // Search functionality
  dropdownSearch.addEventListener("input", (e) => {
    populateOptions(e.target.value);
  });

  // Prevent dropdown from closing when clicking inside options
  dropdownOptions.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Initial population
  populateOptions();
}

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
    dropdown.classList.remove("show");
    dropdown.previousElementSibling.classList.remove("active");
  });
});

// Close modal on Escape key and close dropdowns
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open dropdowns
    document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
      dropdown.classList.remove("show");
      dropdown.previousElementSibling.classList.remove("active");
    });

    // Close compare modal if open
    if (compareModal && compareModal.style.display === "flex") {
      closeCompareModal();
    }
  }
});

// Expose some helpers for debugging (optional)
window.VIDHUR = {
  sendMessage,
  clearChatHistory,
  startNewChat,
  callGroqAPI,
  callComparisonAPI,
};

// Mobile Header Functionality
const mobileFeaturesButton = document.getElementById("mobileFeaturesButton");
const mobileFeaturesDropdown = document.getElementById(
  "mobileFeaturesDropdown"
);
const mobileLanguageButton = document.getElementById("mobileLanguageButton");
const mobileNewChatButton = document.getElementById("mobileNewChatButton");
const mobileCompareToolButton = document.getElementById(
  "mobileCompareToolButton"
);
const comingSoonToast = document.getElementById("comingSoonToast");

// Toggle mobile features dropdown
if (mobileFeaturesButton) {
  mobileFeaturesButton.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileFeaturesDropdown.classList.toggle("show");
    mobileFeaturesButton.classList.toggle("active");
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileFeaturesDropdown &&
    !mobileFeaturesDropdown.contains(e.target) &&
    e.target !== mobileFeaturesButton &&
    !mobileFeaturesButton.contains(e.target)
  ) {
    mobileFeaturesDropdown.classList.remove("show");
    mobileFeaturesButton.classList.remove("active");
  }
});

// Mobile language button - open language dropdown
if (mobileLanguageButton) {
  mobileLanguageButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLanguageDropdown();
  });
}

// Mobile new chat button
if (mobileNewChatButton) {
  mobileNewChatButton.addEventListener("click", () => {
    startNewChat();
    mobileFeaturesDropdown.classList.remove("show");
    mobileFeaturesButton.classList.remove("active");
  });
}

// Mobile compare tool button
if (mobileCompareToolButton) {
  mobileCompareToolButton.addEventListener("click", () => {
    openCompareModal();
    mobileFeaturesDropdown.classList.remove("show");
    mobileFeaturesButton.classList.remove("active");
  });
}

// Coming soon functionality
function showComingSoonToast() {
  if (comingSoonToast) {
    comingSoonToast.classList.add("show");
    setTimeout(() => {
      comingSoonToast.classList.remove("show");
    }, 2000);
  }
}

// Add coming soon handlers to all coming-soon buttons
document.querySelectorAll(".coming-soon-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showComingSoonToast();
    // Close mobile dropdown if open
    if (mobileFeaturesDropdown) {
      mobileFeaturesDropdown.classList.remove("show");
    }
    if (mobileFeaturesButton) {
      mobileFeaturesButton.classList.remove("active");
    }
  });
});
