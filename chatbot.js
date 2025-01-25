function toggleMenu() {
    var links = document.querySelector('.features');
    links.classList.toggle('active');
}

document.getElementById("voiceBtn").addEventListener("click", startVoiceRecognition);
// Voice recognition setup
function startVoiceRecognition() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => console.log("Voice recognition started...");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInput.value = transcript;
      sendMessage();
    };
    recognition.start();
  }
  

// Get all the nav links
const navLinks = document.querySelectorAll('.nav-link');

// Function to remove 'active' class from all links and add to the clicked one
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the clicked link
        this.classList.add('active');
    });
});

// model code
document.addEventListener('DOMContentLoaded', () => {
    // Get the modal
    const modal = document.getElementById('myModal');
    
    // Get the button that opens the modal
    const btn = document.getElementById('openModalButton');
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];
    
    // When the user clicks the button, open the modal
    btn.onclick = () => {
        modal.style.display = 'block';
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = 'none';
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// model code
document.addEventListener('DOMContentLoaded', () => {
    // Get the modal
    const modal = document.getElementById('myModal1');
    
    // Get the button that opens the modal
    const btn = document.getElementById('openModalButton1');
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close1')[0];
    
    // When the user clicks the button, open the modal
    btn.onclick = () => {
        modal.style.display = 'block';
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = 'none';
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar-visible');
}
// Function to track messages in the sidebar
function trackMessage(messageText, sender, timePeriod) {
    let sectionId;

    switch(timePeriod) {
        case 'today':
            sectionId = 'today-messages';
            break;
        case 'yesterday':
            sectionId = 'yesterday-messages';
            break;
        case 'week':
            sectionId = 'week-messages';
            break;
        case 'month':
            sectionId = 'month-messages';
            break;
        default:
            sectionId = 'today-messages';
    }

    const messageList = document.getElementById(sectionId);
    const messageElement = document.createElement('p');
    messageElement.innerText = sender === 'user' ? `User: ${messageText}`: ``;
    messageList.appendChild(messageElement);
}

// js for chatbox function
// Function to send user message and bot response
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const messageText = userInput.value.trim();
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;

    if (messageText) {
        document.getElementById('welcome-page').style.display = 'none';
        document.getElementById('chatBox').style.display = 'flex';

        // Add user message to chat
        addMessage(messageText, 'user-message');
        trackMessage(messageText, 'user', 'today'); // Track in sidebar

        // Clear the input field
        userInput.value = '';

        // Show typing animation for bot
        showTypingIndicator();

        // Simulate bot response after 2 seconds
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();

            let botResponse = '';
            
            if (selectedLanguage === 'hi') {
                // Hindi responses
                if (messageText.includes('क्या सरकारी पॉलिटेक्निक कॉलेज, अजमेर वर्तमान में छात्रों के लिए दूरस्थ शिक्षा पाठ्यक्रम प्रदान करता है') || messageText.includes('Does Government Polytechnic College, Ajmer currently offer distance education courses for students')) {
                    botResponse = "नहीं, सरकारी पॉलिटेक्निक कॉलेज, अजमेर दूरस्थ पाठ्यक्रम प्रदान नहीं करता है। कॉलेज मुख्य रूप से पूर्णकालिक, नियमित डिप्लोमा कार्यक्रम प्रदान करता है।";
                } else if (messageText.includes('सरकारी पॉलिटेक्निक कॉलेज, अजमेर में कंप्यूटर इंजीनियरिंग के लिए वार्षिक फीस क्या है?') || messageText.includes('What is the annual fees for computer engineering at Government Polytechnic College, Ajmer?')) {
                    botResponse = "सरकारी पॉलिटेक्निक कॉलेज, अजमेर में कंप्यूटर इंजीनियरिंग डिप्लोमा पाठ्यक्रम की वार्षिक फीस लगभग ₹8,000 से ₹15,000 के बीच है।";
                } else if (messageText.includes('नमस्ते') || messageText.includes('hello') || messageText.includes('hi')) {
                    botResponse = "राजस्थान तकनीकी कॉलेज पूछताछ चैटबॉट में आपका स्वागत है! चाहे आप इंजीनियरिंग, आईटी, या अन्य तकनीकी क्षेत्रों का पता लगा रहे हों, हम यहाँ आपकी मार्गदर्शन के लिए हैं। आराम से अपनी डिवाइस से प्रवेश, पाठ्यक्रम, फीस, और अधिक जानकारी प्राप्त करें। राजस्थान के शीर्ष तकनीकी संस्थानों में सफल करियर की ओर आपकी यात्रा शुरू करते हैं!";
                } else if (messageText.includes('छात्रवृत्ति')) {
                    botResponse = "मेरे मापदंडों के अनुसार, छात्रवृत्तियां meritorious छात्रों और आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए उपलब्ध हैं। आप आवेदन प्रक्रिया के दौरान आवेदन कर सकते हैं।";
                } else if (messageText.includes('आपका नाम क्या है?') || messageText.includes('what is your name')) {
                    botResponse = "नमस्ते! मैं विद्युर हूँ, इस ज्ञान और सफलता की यात्रा में आपका मार्गदर्शक। महाभारत के एक सम्मानित व्यक्ति के नाम पर नामित, जो ज्ञान और दिशा प्रदान करता था, मैं आपकी सभी प्रश्नों में मदद के लिए यहाँ हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?";
                } else if (messageText.includes('धन्यवाद!') || messageText.includes('thankyou!')) {
                    botResponse = "स्वागत है!!";
                } else {
                    botResponse = `आपने कहा "${messageText}", लेकिन मेरे पास इसका उत्तर नहीं है। कृपया अतिरिक्त सहायता के लिए हमारे समर्थन से संपर्क करें।`;
                }
            } else {
                // English responses
                if (messageText.includes('Does Government Polytechnic College, Ajmer currently offer distance education courses for students')) {
                    botResponse = "No, Government Polytechnic College, Ajmer does not offer distance courses. The college primarily provides full-time, regular diploma programs.";
                } else if (messageText.includes('What is the annual fees for computer engineering at Government Polytechnic College, Ajmer?')) {
                    botResponse = "The annual fees for the Computer Engineering diploma course at Government Polytechnic College, Ajmer, range from approximately ₹8,000 to ₹15,000.";
                } else if (messageText.includes('hi') || messageText.includes('Hello') || messageText.includes('hello')) {
                    botResponse = "Welcome to the Rajasthan Technical College Enquiry Chatbot! Whether you're exploring engineering, IT, or other technical fields, we're here to guide you. Get instant information on admissions, courses, fees, and more right from the comfort of your device. Let's start your journey toward a successful career in Rajasthan's top technical institutions!";
                } else if (messageText.includes('scholarship')) {
                    botResponse = "Scholarships are available for meritorious students and those from economically weaker sections. You can apply during the admission process.";
                } else if (messageText.includes('what is your name?') || messageText.includes('what is your name')) {
                    botResponse = "Hello! I am Vidhur, your guide on this journey of knowledge and success. Named after a revered figure from the Mahabharata who imparted wisdom and direction, I am here to assist you with all your queries about admissions and more. How can I help you today?";
                } else if (messageText.includes('thankyou!')) {
                    botResponse = "Feel free to tweak it to better fit your chatbot’s personality. Welcome!!";
                } else {
                    botResponse = `You said "${messageText}", but I don't have an answer for that. Please contact our support for further assistance.`;
                }
            }

            addMessage(botResponse, 'bot-message');
            trackMessage(botResponse, 'bot', 'today'); // Track bot response in sidebar
        }, 2000); // Simulate delay for bot response
    }
}

// Function to show typing indicator
function showTypingIndicator() {
    const chatBox = document.getElementById('chatBox');

    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';

    typingIndicator.setAttribute('id', 'typing-indicator'); // Assign ID for removal later

    chatBox.appendChild(typingIndicator);

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to add a message to the chatbox
// Function to add a message to the chatbox
function addMessage(text, className) {
    const chatBox = document.getElementById('chatBox');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);

    if (className === 'bot-message') {
        // Create a container for the bot message with icon
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message');
        
        // Create the bot icon element
        const botIcon = document.createElement('img');
        botIcon.src = 'final-chatbot-logo.png'; // Replace with the path to your icon
        botIcon.classList.add('bot-icon');
        
        // Append icon and message to the container
        messageContainer.appendChild(botIcon);
        messageContainer.appendChild(document.createTextNode(text));
        
        // Append container to messageElement
        messageElement.appendChild(messageContainer);
    } else {
        messageElement.textContent = text;
    }

    chatBox.appendChild(messageElement);
    scrollToBottom();
    toggleScrollButton();

    // Scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chatBox');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
// Function to toggle the visibility of the scroll button
function toggleScrollButton() {
    const chatWindow = document.getElementById('chatBox');
    const scrollBtn = document.getElementById('scroll-btn');
    
    // Show the button if not already at the bottom of the chat
    if (chatWindow.scrollHeight - chatWindow.scrollTop > chatWindow.clientHeight + 20) {
        scrollBtn.style.display = 'flex'; // Show the button
    } else {
        scrollBtn.style.display = 'none'; // Hide the button
    }
}
document.getElementById('chatBox').addEventListener('scroll', toggleScrollButton);

// Function to handle pressing Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

const chatInput = document.getElementById('userInput');

chatInput.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height
  this.style.height = (this.scrollHeight) + 'px'; // Set the height to match the scroll height
});


// promt suggestion
document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessages = {
        college: "Welcome! Got questions about our college? I'm here to assist you with admissions, courses, and more. How can I help today?",
        alumni: "Hello! Curious about our alumni network and their success stories? Let me guide you through our alumni achievements. What would you like to know?",
        degree: "Hi there! Looking for details on degree programs? Whether it's undergraduate or postgraduate, I’ve got you covered. What degree information can I help with?",
        fees: "Welcome! Need help understanding the fee structure for various courses? Ask me anything about fees, scholarships, and payment options."
    };

    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('send-btn');
    const suggestions = document.querySelectorAll('.suggestion');


    function insertPromptIntoInput(prompt) {
        userInput.value = prompt;
    }

    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const prompt = suggestion.textContent;
            insertPromptIntoInput(prompt);
        });
    });

    sendButton.addEventListener('click', () => {
        const input = userInput.value.trim().toLowerCase();
        if (input) {
            if (input.includes("college")) {
                setWelcomeMessage('college');
            } else if (input.includes("alumni")) {
                setWelcomeMessage('alumni');
            } else if (input.includes("degree")) {
                setWelcomeMessage('degree');
            } else if (input.includes("fees")) {
                setWelcomeMessage('fees');
            } else {
                setWelcomeMessage('');
            }
            userInput.value = '';
        }
    });

    // Optionally set a default welcome message
    setWelcomeMessage('');
});


//new chat button code
document.addEventListener('DOMContentLoaded', () => {
    // Get the chatbox and buttons
    const chatbox = document.getElementById('welcome-page');
    const newChatButton = document.getElementById('newChatButton');
    const messagesContainer = document.getElementById('chatBox');

    // Show chatbox when "New Chat" is clicked
    newChatButton.addEventListener('click', () => {
        chatbox.style.display = 'block'; // Show chatbox
        messagesContainer.innerHTML = ''; // Clear any previous messages
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
    "XYZ1 Technical College jaypur": {
        name: "XYZ1 Technical College",
        address: "ABC Road, Jaipur, Rajasthan",
        phone: "+91 12345 67890",
        email: "xyz1college@example.com"
    },
    "PQR Engineering College": {
        name: "PQR Engineering College",
        address: "DEF Street, Kota, Rajasthan",
        phone: "+91 98765 43210",
        email: "pqrcollege@example.com"
    },
    "XYZ2 Technical College Rajstan": {
        name: "XYZ2 Technical College",
        address: "pqr Road, Jaipur, Rajasthan",
        phone: "+91 12345 67890",
        email: "xyz2college@example.com"
    },
    // Add more colleges here
};

// Function to show college contact information
function showCollegeInfo(event) {
    event.preventDefault(); // Prevent the form from submitting

    const collegeName = document.getElementById('collegeName').value;
    const contactInfoDiv = document.getElementById('contactInfo');

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
    document.getElementById('suggestions').style.display = 'none';
}

// Function to suggest college names as user types
function suggestCollegeNames() {
    const input = document.getElementById('collegeName').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    const colleges = Object.keys(collegeData);

    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    // Filter college names that match user input
    const filteredColleges = colleges.filter(college => 
        college.toLowerCase().includes(input)
    );

    // Display suggestions if there is input and matching colleges
    if (input && filteredColleges.length > 0) {
        suggestionsDiv.style.display = 'block';

        // Create suggestion items
        filteredColleges.forEach(college => {
            const div = document.createElement('div');
            div.textContent = college;
            div.onclick = function() {
                document.getElementById('collegeName').value = college;
                suggestionsDiv.style.display = 'none'; // Hide suggestions on click
            };
            suggestionsDiv.appendChild(div);
        });
    } else {
        suggestionsDiv.style.display = 'none'; // Hide if no suggestions
    }
}


// setting script
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const closeMenu = document.getElementById('closeMenu');

// Open the settings menu
settingsButton.addEventListener('click', () => {
    settingsMenu.style.display = 'block';
});

// Close the settings menu
closeMenu.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
});

// Close the menu if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === settingsMenu) {
        settingsMenu.style.display = 'none';
    }
});

// Share button functionality
document.getElementById('shareButton').addEventListener('click', () => {
    alert('Share option clicked!');
});

// Logout button functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    alert('Logout clicked!');
});

// Theme change functionality (optional)
document.getElementById('themeSelect').addEventListener('change', (event) => {
    const theme = event.target.value;
    document.body.className = theme; // Change the theme by applying class
});
