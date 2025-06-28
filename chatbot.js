// LLM Configuration
const GROQ_API_KEY = "YOUR_API_KEY"; // Replace with your actual Groq API key
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME = "llama-3.1-8b-instant"; // Most stable model

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

मुख्य पुणे इंजीनियरिंग कॉलेज:
- कॉलेज ऑफ इंजीनियरिंग पुणे (COEP)
- पुणे इंस्टिट्यूट ऑफ कंप्यूटर टेक्नोलॉजी (PICT)
- विश्वकर्मा इंस्टिट्यूट ऑफ टेक्नोलॉजी (VIT)
- महाराष्ट्र इंस्टिट्यूट ऑफ टेक्नोलॉजी (MIT)
- सिम्बायोसिस इंस्टिट्यूट ऑफ टेक्नोलॉजी (SIT)

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

// Function to get current system prompt based on selected language
function getCurrentSystemPrompt() {
  const languageSelect = document.getElementById("languageSelect");
  const selectedLanguage = languageSelect ? languageSelect.value : "en";
  return SYSTEM_PROMPTS[selectedLanguage] || SYSTEM_PROMPTS.en;
}

// Function to call Groq API
async function callGroqAPI(userMessage, conversationHistory = []) {
  try {
    // console.log("🚀 Making API call to Groq..."); // Debug log
    // console.log("🔑 API Key present:", GROQ_API_KEY ? "Yes" : "No");

    const messages = [
      { role: "system", content: getCurrentSystemPrompt() },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    // console.log("📝 Messages being sent:", messages);

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

    // console.log("📡 Response status:", response.status);
    // console.log("📡 Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
    //   console.error("❌ API Error Response:", errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // console.log("✅ API Response received:", data);

    if (data.choices && data.choices[0] && data.choices[0].message) {
    //   console.log("✅ Returning AI response");
      return data.choices[0].message.content;
    } else {
    //   console.error("❌ Invalid response format from API");
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    // console.error("❌ Error calling Groq API:", error);
    // console.error("❌ Error details:", error.message);

    // Check if it's a network/CORS issue
    if (error.message.includes("fetch") || error.name === "TypeError") {
      console.error(
        "🚨 This might be a CORS issue. Make sure you are running on a web server (not file://)"
      );
      console.error("💡 Try using: python -m http.server 8000 or npx serve .");
    }

    // console.log("🔄 Falling back to offline responses");
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
      "नमस्ते! मैं VIDHUR हूं, पुणे इंजीनियरिंग कॉलेज की जानकारी के लिए आपका AI गाइड। वर्तमान में मेरे AI ब्रेन में कनेक्टिविटी की समस्या है, लेकिन मैं अभी भी पुणे के कॉलेजों की बुनियादी जानकारी दे सकता हूं। मैं आपकी कैसे सहायता कर सकता हूं?",
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
  }

  // COEP Engineering Branches
  else if (
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
  }

  // PICT Engineering Branches
  else if (
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
  }

  // General COEP info
  else if (
    lowerMessage.includes("coep") ||
    lowerMessage.includes("college of engineering pune")
  ) {
    return "🏛️ College of Engineering Pune (COEP) is one of India's premier engineering institutes, established in 1854. It offers 8 undergraduate and multiple postgraduate programs. Known for excellent faculty, research, and alumni network. Government college with affordable fees. What specific information would you like about COEP?";
  }

  // General PICT info
  else if (
    lowerMessage.includes("pict") ||
    lowerMessage.includes("pune institute of computer technology")
  ) {
    return "💻 Pune Institute of Computer Technology (PICT) is renowned for its computer science and IT programs. Established in 1983, it has excellent placement records with top IT companies. Known for innovation and industry connections. What would you like to know about PICT?";
  }

  // VIT info
  else if (lowerMessage.includes("vit") && lowerMessage.includes("pune")) {
    return "🔧 Vishwakarma Institute of Technology (VIT) Pune offers engineering programs in Computer, IT, Electronics, Mechanical, Civil, and other branches. Known for good infrastructure and placement support. Private college with moderate fees. What specific information do you need about VIT?";
  }

  // MIT info
  else if (lowerMessage.includes("mit") && lowerMessage.includes("pune")) {
    return "🎓 Maharashtra Institute of Technology (MIT) Pune is part of MIT Group. Offers various engineering branches with good industry connections. Known for practical learning approach and decent placements. What would you like to know about MIT Pune?";
  }

  // Placement queries
  else if (
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
|------|----------|------------|-------------|
| **3rd Year** | 5th-6th | Skill building, Internships | Programming, Projects |
| **4th Year** | 7th | Campus placements begin | Interview prep, Aptitude |
| **4th Year** | 8th | Final placements | Negotiation, Joining |

> Which college's detailed placement report would you like to see?`;
  }

  // Fees queries
  else if (lowerMessage.includes("fees") || lowerMessage.includes("cost")) {
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
  }

  // Admission queries
  else if (
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

## Required Documents

| Document Type | Original | Photocopy | Notes |
|---------------|----------|-----------|-------|
| **10th Marksheet** | ✅ | ✅ | For age proof |
| **12th Marksheet** | ✅ | ✅ | PCM marks important |
| **Entrance Scorecard** | ✅ | ✅ | MHT-CET/JEE Main |
| **Caste Certificate** | ✅ | ✅ | If applicable |
| **Income Certificate** | ✅ | ✅ | For scholarships |

> Which specific college's admission process would you like detailed information about?`;
  }

  // Top colleges query
  else if (
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
  // Set default language to English and update interface
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

document
  .getElementById("voiceBtn")
  .addEventListener("click", startVoiceRecognition);
// Voice recognition setup
function startVoiceRecognition() {
  const recognition = new window.webkitSpeechRecognition();

  // Set language based on current selection
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
    document.getElementById("userInput").value = transcript;
    sendMessage();
  };
  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
  };
  recognition.start();
}

// Get all the nav links
const navLinks = document.querySelectorAll(".nav-link");

// Function to remove 'active' class from all links and add to the clicked one
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active class from all links
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add active class to the clicked link
    this.classList.add("active");
  });
});

// model code
document.addEventListener("DOMContentLoaded", () => {
  // Get the modal
  const modal = document.getElementById("myModal1");

  // Get the button that opens the modal
  const btn = document.getElementById("openModalButton1");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close1")[0];

  // When the user clicks the button, open the modal
  btn.onclick = () => {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");

  sidebar.classList.toggle("sidebar-visible");

  // Handle mobile backdrop
  if (window.innerWidth <= 768) {
    if (sidebar.classList.contains("sidebar-visible")) {
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      backdrop.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
}
// Function to track messages in the sidebar
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
  const messageElement = document.createElement("p");
  messageElement.innerText = sender === "user" ? `User: ${messageText}` : ``;
  messageList.appendChild(messageElement);
}

// Enhanced sendMessage function with LLM integration
async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const messageText = userInput.value.trim();

  if (messageText) {
    document.getElementById("welcome-page").style.display = "none";
    document.getElementById("chatBox").style.display = "flex";

    // Add user message to chat
    addMessage(messageText, "user-message");
    trackMessage(messageText, "user", "today");

    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: messageText });

    // Clear the input field
    userInput.value = "";

    // Show pinwheel loader for bot
    showTypingIndicator();

    try {
      // Get response from LLM
      const botResponse = await callGroqAPI(messageText, conversationHistory);

      // Remove pinwheel loader
      removeTypingIndicator();

      // Add bot response to chat
      addMessage(botResponse, "bot-message");
      trackMessage(botResponse, "bot", "today");

      // Add bot response to conversation history
      conversationHistory.push({ role: "assistant", content: botResponse });

      // Keep conversation history manageable (last 10 exchanges)
      if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
      }
    } catch (error) {
      console.error("Error getting bot response:", error);
      removeTypingIndicator();

      const fallbackResponse = getFallbackResponse(messageText);
      addMessage(fallbackResponse, "bot-message");
      trackMessage(fallbackResponse, "bot", "today");
    }
  }
}

// Function to show pinwheel loader
function showTypingIndicator() {
  const chatBox = document.getElementById("chatBox");

  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("message", "bot-message", "loader-container");
  loaderContainer.innerHTML = `
    <div class="bot-message">
      <img src="final-chatbot-logo.png" class="bot-icon" />
      <div class="loader-content">
        <l-pinwheel size="35" stroke="3.5" speed="0.9" color="black"></l-pinwheel>
      </div>
    </div>
  `;

  loaderContainer.setAttribute("id", "typing-indicator"); // Keep same ID for removal

  chatBox.appendChild(loaderContainer);

  // Scroll to the bottom of the chatbox
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to remove pinwheel loader
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Function to add a message to the chatbox with markdown support
function addMessage(text, className) {
  const chatBox = document.getElementById("chatBox");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", className);

  if (className === "bot-message") {
    // Create a container for the bot message with icon
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("bot-message");

    // Create the bot icon element
    const botIcon = document.createElement("img");
    botIcon.src = "final-chatbot-logo.png";
    botIcon.classList.add("bot-icon");

    // Create message content div
    const messageContent = document.createElement("div");
    messageContent.classList.add("bot-message-content");

    // Parse markdown and set HTML content for bot messages
    if (typeof marked !== "undefined") {
      messageContent.innerHTML = marked.parse(text);
    } else {
      // Fallback if marked is not loaded
      messageContent.innerHTML = formatTextAsHTML(text);
    }

    // Append icon and message content to the container
    messageContainer.appendChild(botIcon);
    messageContainer.appendChild(messageContent);

    // Append container to messageElement
    messageElement.appendChild(messageContainer);
  } else {
    // For user messages, keep as plain text
    messageElement.textContent = text;
  }

  chatBox.appendChild(messageElement);
  scrollToBottom();
  toggleScrollButton();

  // Scroll to the bottom of the chatbox
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Fallback function to format text as HTML if markdown library is not available
function formatTextAsHTML(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/`(.*?)`/g, "<code>$1</code>") // Code
    .replace(/^# (.*$)/gim, "<h1>$1</h1>") // H1
    .replace(/^## (.*$)/gim, "<h2>$1</h2>") // H2
    .replace(/^### (.*$)/gim, "<h3>$1</h3>") // H3
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>") // Blockquote
    .replace(/\n/g, "<br>"); // Line breaks
}

function scrollToBottom() {
  const chatWindow = document.getElementById("chatBox");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
// Function to toggle the visibility of the scroll button
function toggleScrollButton() {
  const chatWindow = document.getElementById("chatBox");
  const scrollBtn = document.getElementById("scroll-btn");

  // Show the button if not already at the bottom of the chat
  if (
    chatWindow.scrollHeight - chatWindow.scrollTop >
    chatWindow.clientHeight + 20
  ) {
    scrollBtn.style.display = "flex"; // Show the button
  } else {
    scrollBtn.style.display = "none"; // Hide the button
  }
}
document
  .getElementById("chatBox")
  .addEventListener("scroll", toggleScrollButton);

// Function to handle pressing Enter key
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

const chatInput = document.getElementById("userInput");

chatInput.addEventListener("input", function () {
  this.style.height = "auto"; // Reset the height
  this.style.height = this.scrollHeight + "px"; // Set the height to match the scroll height
});

// promt suggestion
document.addEventListener("DOMContentLoaded", () => {
  // Ensure scroll button is hidden on page load
  const scrollBtn = document.getElementById("scroll-btn");
  if (scrollBtn) {
    scrollBtn.style.display = "none";
  }

  const welcomeMessages = {
    college:
      "Welcome! Got questions about our college? I'm here to assist you with admissions, courses, and more. How can I help today?",
    alumni:
      "Hello! Curious about our alumni network and their success stories? Let me guide you through our alumni achievements. What would you like to know?",
    degree:
      "Hi there! Looking for details on degree programs? Whether it's undergraduate or postgraduate, I've got you covered. What degree information can I help with?",
    fees: "Welcome! Need help understanding the fee structure for various courses? Ask me anything about fees, scholarships, and payment options.",
  };

  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("send-btn");
  const suggestions = document.querySelectorAll(".suggestion");

  function insertPromptIntoInput(prompt) {
    userInput.value = prompt;
  }

  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent default link behavior
      const prompt = suggestion.textContent;

      // Hide welcome page and show chat box
      document.getElementById("welcome-page").style.display = "none";
      document.getElementById("chatBox").style.display = "flex";

      // Add user message to chat
      addMessage(prompt, "user-message");
      trackMessage(prompt, "user", "today");

      // Add user message to conversation history
      conversationHistory.push({ role: "user", content: prompt });

      // Show pinwheel loader for bot
      showTypingIndicator();

      try {
        // Get response from LLM
        const botResponse = await callGroqAPI(prompt, conversationHistory);

        // Remove pinwheel loader
        removeTypingIndicator();

        // Add bot response to chat
        addMessage(botResponse, "bot-message");
        trackMessage(botResponse, "bot", "today");

        // Add bot response to conversation history
        conversationHistory.push({ role: "assistant", content: botResponse });

        // Keep conversation history manageable (last 10 exchanges)
        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-20);
        }
      } catch (error) {
        console.error("Error getting bot response:", error);
        removeTypingIndicator();

        const fallbackResponse = getFallbackResponse(prompt);
        addMessage(fallbackResponse, "bot-message");
        trackMessage(fallbackResponse, "bot", "today");
      }
    });
  });

  sendButton.addEventListener("click", () => {
    const input = userInput.value.trim().toLowerCase();
    if (input) {
      if (input.includes("college")) {
        setWelcomeMessage("college");
      } else if (input.includes("alumni")) {
        setWelcomeMessage("alumni");
      } else if (input.includes("degree")) {
        setWelcomeMessage("degree");
      } else if (input.includes("fees")) {
        setWelcomeMessage("fees");
      } else {
        setWelcomeMessage("");
      }
      userInput.value = "";
    }
  });

  // Optionally set a default welcome message
  setWelcomeMessage("");
});

//new chat button code
document.addEventListener("DOMContentLoaded", () => {
  // Get the chatbox and buttons
  const chatbox = document.getElementById("welcome-page");
  const newChatButton = document.getElementById("newChatButton");
  const messagesContainer = document.getElementById("chatBox");

  // Show chatbox when "New Chat" is clicked
  newChatButton.addEventListener("click", () => {
    const scrollBtn = document.getElementById("scroll-btn");

    chatbox.style.display = "block"; // Show welcome page
    messagesContainer.innerHTML = ""; // Clear any previous messages
    messagesContainer.style.display = "none"; // Hide chat box
    conversationHistory = []; // Clear conversation history

    // Hide scroll button when creating new chat
    if (scrollBtn) {
      scrollBtn.style.display = "none";
    }
  });
});

function startChat() {
  // Simulate chatbot initiation, you can redirect to the chatbot page or open a modal
  window.location.href = "index.html";
  // For real chatbot integration, redirect to chatbot page:
  // window.location.href = "/chatbot-page.html";
}

// contact us college script
// College contact information (can be extended for more colleges)
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
  // Add more colleges here
};

// Function to show college contact information
function showCollegeInfo(event) {
  event.preventDefault(); // Prevent the form from submitting

  const collegeName = document.getElementById("collegeName").value;
  const contactInfoDiv = document.getElementById("contactInfo");

  if (collegeData[collegeName]) {
    // Display the contact information for the entered college
    const college = collegeData[collegeName];
    contactInfoDiv.innerHTML = `
            <h3>Contact Information for ${college.name}</h3>
            <p><strong>Address:</strong> ${college.address}</p>
            <p><strong>Phone:</strong> ${college.phone}</p>
            <p><strong>Email:</strong> ${college.email}</p>
        `;
  } else {
    // If the college name is not found
    contactInfoDiv.innerHTML = `<p>Sorry, we couldn't find information for "${collegeName}". Please try another college name.</p>`;
  }

  // Clear suggestions when form is submitted
  document.getElementById("suggestions").style.display = "none";
}

// Function to suggest college names as user types
function suggestCollegeNames() {
  const input = document.getElementById("collegeName").value.toLowerCase();
  const suggestionsDiv = document.getElementById("suggestions");
  const colleges = Object.keys(collegeData);

  suggestionsDiv.innerHTML = ""; // Clear previous suggestions

  // Filter college names that match user input
  const filteredColleges = colleges.filter((college) =>
    college.toLowerCase().includes(input)
  );

  // Display suggestions if there is input and matching colleges
  if (input && filteredColleges.length > 0) {
    suggestionsDiv.style.display = "block";

    // Create suggestion items
    filteredColleges.forEach((college) => {
      const div = document.createElement("div");
      div.textContent = college;
      div.onclick = function () {
        document.getElementById("collegeName").value = college;
        suggestionsDiv.style.display = "none"; // Hide suggestions on click
      };
      suggestionsDiv.appendChild(div);
    });
  } else {
    suggestionsDiv.style.display = "none"; // Hide if no suggestions
  }
}

// setting script
const settingsButton = document.getElementById("settingsButton");
const settingsMenu = document.getElementById("settingsMenu");
const closeMenu = document.getElementById("closeMenu");

// Open the settings menu
settingsButton.addEventListener("click", () => {
  settingsMenu.style.display = "block";
});

// Close the settings menu
closeMenu.addEventListener("click", () => {
  settingsMenu.style.display = "none";
});

// Close the menu if clicked outside
window.addEventListener("click", (e) => {
  if (e.target === settingsMenu) {
    settingsMenu.style.display = "none";
  }
});

// Share button functionality
document.getElementById("shareButton").addEventListener("click", () => {
  shareChat();
});

// Theme change functionality (optional)
document.getElementById("themeSelect").addEventListener("change", (event) => {
  const theme = event.target.value;
  document.body.className = theme; // Change the theme by applying class
});

// Language change functionality
document
  .getElementById("languageSelect")
  .addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    // console.log(`🌐 Language changed to: ${selectedLanguage}`);

    // Clear conversation history when language changes
    conversationHistory = [];

    // Show a message about language change
    const languageNames = {
      en: "English",
      hi: "हिंदी (Hindi)",
      mr: "मराठी (Marathi)",
    };

    const chatBox = document.getElementById("chatBox");
    if (chatBox && chatBox.style.display !== "none") {
      // Add a system message about language change
      const systemMessage = document.createElement("div");
      systemMessage.classList.add("message", "system-message");
      systemMessage.style.textAlign = "center";
      systemMessage.style.fontStyle = "italic";
      systemMessage.style.color = "#666";
      systemMessage.style.margin = "10px 0";

      const messages = {
        en: `Language changed to ${languageNames[selectedLanguage]}. Conversation history cleared.`,
        hi: `भाषा ${languageNames[selectedLanguage]} में बदल दी गई। बातचीत का इतिहास साफ़ कर दिया गया।`,
        mr: `भाषा ${languageNames[selectedLanguage]} मध्ये बदलली. संभाषण इतिहास साफ केला.`,
      };

      systemMessage.textContent = messages[selectedLanguage] || messages["en"];
      chatBox.appendChild(systemMessage);
      scrollToBottom();
    }

    // Update suggestion cards text based on language
    updateSuggestionCards(selectedLanguage);

    // Update welcome page text based on language
    updateWelcomePageText(selectedLanguage);
  });

// Function to update suggestion cards based on language
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
    if (currentSuggestions[index]) {
      element.textContent = currentSuggestions[index];
    }
  });
}

// Function to update welcome page text based on language
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

  // Update welcome page title
  const titleElement = document.querySelector("#welcome-page h3");
  if (titleElement) {
    titleElement.textContent = currentTexts.title;
  }

  // Update welcome page description
  const descriptionElement = document.querySelector("#welcome-page p");
  if (descriptionElement) {
    descriptionElement.textContent = currentTexts.description;
  }
}

// Sidebar functionality for clear history buttons
document.addEventListener("DOMContentLoaded", function () {
  // Clear history button in sidebar
  const clearChatSidebarBtn = document.getElementById("clearChatSidebarBtn");
  if (clearChatSidebarBtn) {
    clearChatSidebarBtn.addEventListener("click", function () {
      clearChatHistory();
    });
  }

  // Clear history button in settings
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", function () {
      clearChatHistory();
    });
  }

  // New chat button in sidebar
  const newChatSidebarBtn = document.getElementById("newChatSidebarBtn");
  if (newChatSidebarBtn) {
    newChatSidebarBtn.addEventListener("click", function () {
      startNewChat();
    });
  }

  // Expand/collapse functionality for history section
  const historyExpandBtn = document.getElementById("historyExpandBtn");
  const historyContent = document.getElementById("historyContent");
  if (historyExpandBtn && historyContent) {
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
  }

  // Expand/collapse functionality for saved section
  const savedExpandBtn = document.getElementById("savedExpandBtn");
  const savedContent = document.getElementById("savedContent");
  if (savedExpandBtn && savedContent) {
    savedExpandBtn.addEventListener("click", function () {
      const isExpanded = savedContent.style.display !== "none";
      if (isExpanded) {
        savedContent.style.display = "none";
        savedExpandBtn.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
      } else {
        savedContent.style.display = "block";
        savedExpandBtn.innerHTML = '<i class="ri-arrow-down-s-line"></i>';
      }
    });
  }
});

// Function to clear chat history
function clearChatHistory() {
  const chatBox = document.getElementById("chatBox");
  const welcomePage = document.getElementById("welcome-page");
  const scrollBtn = document.getElementById("scroll-btn");

  if (chatBox) {
    chatBox.innerHTML = "";
    chatBox.style.display = "none";
  }

  if (welcomePage) {
    welcomePage.style.display = "block";
  }

  // Hide scroll button when clearing chat
  if (scrollBtn) {
    scrollBtn.style.display = "none";
  }

  // Clear conversation history
  conversationHistory = [];

  // Clear message lists in sidebar
  const todayMessages = document.getElementById("today-messages");
  const yesterdayMessages = document.getElementById("yesterday-messages");
  const weekMessages = document.getElementById("week-messages");

  if (todayMessages) todayMessages.innerHTML = "";
  if (yesterdayMessages) yesterdayMessages.innerHTML = "";
  if (weekMessages) weekMessages.innerHTML = "";

  // Show confirmation message
  alert("Chat history cleared successfully!");
}

// Function to start a new chat
function startNewChat() {
  clearChatHistory();
}

// Handle window resize for sidebar backdrop
window.addEventListener("resize", function () {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");

  if (window.innerWidth > 768) {
    // Desktop view - remove backdrop and restore scrolling
    backdrop.classList.remove("active");
    document.body.style.overflow = "auto";
  } else {
    // Mobile view - maintain backdrop state based on sidebar visibility
    if (sidebar.classList.contains("sidebar-visible")) {
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
});

// Additional action button functionality
document.addEventListener("DOMContentLoaded", function () {
  // Export Chat Button
  const exportChatBtn = document.getElementById("exportChatBtn");
  if (exportChatBtn) {
    exportChatBtn.addEventListener("click", function () {
      exportChatHistory();
    });
  }

  // Send Feedback Button
  const feedbackBtn = document.getElementById("feedbackBtn");
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", function () {
      openFeedbackForm();
    });
  }
});

// Function to share chatbot
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

// Fallback share function
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

// Manual copy prompt
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

// Function to export chat history
function exportChatHistory() {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox || chatBox.children.length === 0) {
    alert("📝 No chat history to export. Start a conversation first!");
    return;
  }

  let exportText = "VIDHUR AI - College Assistant Chat Export\n";
  exportText += "=".repeat(50) + "\n";
  exportText += `Export Date: ${new Date().toLocaleString()}\n\n`;

  const messages = chatBox.children;
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message.classList.contains("user-message")) {
      exportText += `👤 USER: ${message.textContent.trim()}\n\n`;
    } else if (message.classList.contains("bot-message")) {
      const content = message.querySelector(".bot-message-content");
      if (content) {
        exportText += `🤖 VIDHUR AI: ${content.textContent.trim()}\n\n`;
      }
    } else if (message.classList.contains("system-message")) {
      exportText += `🔔 SYSTEM: ${message.textContent.trim()}\n\n`;
    }
  }

  exportText += "=".repeat(50) + "\n";
  exportText += "Generated by VIDHUR AI - DataDynamos Team";

  // Create and download file
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

// Function to open feedback form
function openFeedbackForm() {
  const feedback = prompt(`📝 We'd love to hear your feedback about VIDHUR AI!

Please share your thoughts about:
• How helpful were the responses?
• What features would you like to see?
• Any suggestions for improvement?

Your feedback:`);

  if (feedback && feedback.trim()) {
    // Simulate sending feedback
    setTimeout(() => {
      alert(`✅ Thank you for your feedback!

Your message: "${feedback.trim()}"

We appreciate your input and will use it to improve VIDHUR AI. Our team will review your feedback and consider it for future updates.

- DataDynamos Team`);
    }, 500);
  } else if (feedback !== null) {
    alert("📝 Please provide some feedback to help us improve!");
  }
}
