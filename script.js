const responses = {
  greetings: [
    "Hello! How can I support you today?", 
    "Hi there! How can I assist you today?",
    "Hey! I'm here to help."
  ],
  bullying: [
    "I'm sorry you're experiencing this. Don't worry, we are here to help you.",
    "Have you talked to your parents or advisor about this?",
    "It's important to report bullying because you deserve respect.",
    "You are not alone. There are people who care about you."
  ],
  encouragement: [
    "You're strong, and you deserve respect.",
    "Keep going! You're doing great.",
    "Never forget your worth.",
    "You are valued and important."
  ],
  gratitude: [
    "You're welcome! I'm here whenever you need help.",
    "No problem at all! Let me know if you have more questions.",
    "Happy to assist!"
  ],
  advice: [
    "Take a deep breath and try to stay calm.",
    "Seek support from trusted friends or family.",
    "Consider reaching out to a counselor or support group for guidance."
  ],
  fallback: [
    "I'm not sure how to respond. Can you tell me more?",
    "I didn't quite understand that. Could you clarify?",
    "I'm here to help, but I need a bit more information to assist you."
  ]
};

const keywords = {
  greetings: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "talk"],
  bullying: ["bully", "bullying", "hurt", "mean", "harass", "tease", "intimidate"],
  encouragement: ["help", "sad", "upset", "alone", "worthless", "depressed", "struggling"],
  gratitude: ["thank you", "thanks", "appreciate"],
  advice: ["advice", "tips", "guidance", "suggestions"]
};

  function getResponse(input) {
    input = input.toLowerCase();
    for (const [key, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (input.includes(word)) {
          const possibleResponses = responses[key];
          return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        }
      }
    }
    return responses.fallback[0];
  }

  function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    displayMessage(userInput, "user");
    const botResponse = getResponse(userInput);
    setTimeout(() => displayMessage(botResponse, "bot"), 500);

    document.getElementById("userInput").value = "";
  }

  function sendFixedMessage(message) {
    displayMessage(message, "user");
    const botResponse = getResponse(message);
    setTimeout(() => displayMessage(botResponse, "bot"), 500);
  }

  function displayMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    document.getElementById("messages").appendChild(messageDiv);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  document.getElementById("userInput").addEventListener("keypress", handleKeyPress);

  function displayGreeting() {
    const greetingMessage = "Welcome to Bully Destroyer. How can we help you?";
    displayMessage(greetingMessage, "bot");
  }

  // Simulate page load delay and then hide the loading screen
  window.onload = function() {
    setTimeout(() => {
      document.getElementById("loadingScreen").style.display = "none";  // Hide loading screen
      document.getElementById("chatbox").style.display = "flex";  // Show chatbox
      displayGreeting();
    }, 2000);  // Simulate a 2-second loading time
  };
  
  function displayMessage(text, sender) {
    const messagesContainer = document.getElementById("messages");

    // Create a sender label
    const senderLabel = document.createElement("span");
    senderLabel.textContent = sender === "user" ? "User 👤" : "Chatbot 🤖";
    senderLabel.style.fontWeight = "bold";
    senderLabel.style.fontSize = "13px";
    senderLabel.style.marginBottom = "5px";
    senderLabel.style.marginLeft = "15px";
    senderLabel.style.marginRight = "15px";
    senderLabel.style.color = sender === "user" ? "dodgerblue" : "red";

    // Create the message bubble
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;

    // Append the label and message to the messages container
    const messageContainer = document.createElement("div");
    messageContainer.style.display = "flex";
    messageContainer.style.flexDirection = "column";
    messageContainer.style.alignItems = sender === "user" ? "flex-end" : "flex-start";
    messageContainer.appendChild(senderLabel);
    messageContainer.appendChild(messageDiv);

    messagesContainer.appendChild(messageContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  function sendFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const fileURL = URL.createObjectURL(file);
    displayMedia(file, fileURL, "user");
    document.getElementById("fileInput").value = ""; // Reset file input
  }
}

function displayMedia(file, fileURL, sender) {
  const messagesContainer = document.getElementById("messages");

  const senderLabel = document.createElement("span");
  senderLabel.textContent = sender === "user" ? "User" : "Chatbot";
  senderLabel.style.fontWeight = "bold";
  senderLabel.style.fontSize = "12px";
  senderLabel.style.marginBottom = "5px";
  senderLabel.style.marginLeft = "15px";
  senderLabel.style.marginRight = "15px";
  senderLabel.style.color = sender === "user" ? "dodgerblue" : "tomato";

  const mediaContainer = document.createElement("div");
  mediaContainer.className = `message ${sender}`;
  mediaContainer.style.padding = "10px";
  mediaContainer.style.borderRadius = "10px";
  mediaContainer.style.maxWidth = "70%";

  // Display file preview based on type
  if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = fileURL;
    img.alt = file.name;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    mediaContainer.appendChild(img);
  } else if (file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = fileURL;
    video.controls = true;
    video.style.maxWidth = "100%";
    video.style.borderRadius = "10px";
    mediaContainer.appendChild(video);
  } else {
    const link = document.createElement("a");
    link.href = fileURL;
    link.textContent = `Download ${file.name}`;
    link.target = "_blank";
    link.style.color = "blue";
    link.style.textDecoration = "underline";
    mediaContainer.appendChild(link);
  }

  const messageContainer = document.createElement("div");
  messageContainer.style.display = "flex";
  messageContainer.style.flexDirection = "column";
  messageContainer.style.alignItems = sender === "user" ? "flex-end" : "flex-start";
  messageContainer.appendChild(senderLabel);
  messageContainer.appendChild(mediaContainer);

  messagesContainer.appendChild(messageContainer);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (!userInput.trim()) return;

  displayMessage(userInput, "user");

  // Show the typing indicator
  const typingIndicator = document.getElementById("typingIndicator");
  typingIndicator.style.display = "block";

  const botResponse = getResponse(userInput);

  // Simulate a delay before showing the bot response
  setTimeout(() => {
    displayMessage(botResponse, "bot");
    typingIndicator.style.display = "none"; // Hide the typing indicator
  }, 1000);

  document.getElementById("userInput").value = "";
}

function sendFixedMessage(message) {
  displayMessage(message, "user");

  // Show the typing indicator
  const typingIndicator = document.getElementById("typingIndicator");
  typingIndicator.style.display = "block";

  const botResponse = getResponse(message);

  // Simulate a delay before showing the bot response
  setTimeout(() => {
    displayMessage(botResponse, "bot");
    typingIndicator.style.display = "none"; // Hide the typing indicator
  }, 1000);
}
function handleBullyingType() {
  const bullyingTypes = document.getElementById("bullyingTypes").value;
  let response = "";

  // Display user message
  const userMessage = `I was experiencing  ${bullyingTypes} bullying.`;
  displayMessage(userMessage, "user");

  // Show the typing indicator
  const typingIndicator = document.getElementById("typingIndicator");
  typingIndicator.style.display = "block";

  // Simulate a delay before showing the bot response
  setTimeout(() => {
    // Determine bot response based on bullying type
    switch (bullyingTypes) {
      case "physical":
        response = "If you're experiencing physical bullying, it involves hurting someone's body or possessions. Examples include hitting, kicking, or damaging someone's belongings.";
        break;
      case "verbal":
        response = "If you're experiencing verbal bullying, it includes saying or writing mean things. This includes teasing, name-calling, inappropriate comments, or threats.";
        break;
      case "cyber":
        response = "If you're experiencing cyberbullying, it takes place online through social media, messages, or emails. It can involve spreading rumors, sharing embarrassing content, or sending threatening messages.";
        break;
      case "social":
        response = "If you're experiencing social bullying, also known as relational bullying, it involves hurting someone's reputation or relationships. Examples include exclusion, spreading rumors, or embarrassing someone publicly.";
        break;
      default:
        response = "Please select a type of bullying for more information.";
    }

    // Display the bot response and hide the typing indicator
    displayMessage(response, "bot");
    typingIndicator.style.display = "none"; // Hide the typing indicator
  }, 1000);
}

function sendFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const typingIndicator = document.getElementById("typingIndicator");

  if (file) {
    const fileURL = URL.createObjectURL(file);
    displayMedia(file, fileURL, "user");
    document.getElementById("fileInput").value = ""; // Reset file input

    // Show typing indicator
    typingIndicator.style.display = "block";

    setTimeout(() => {
      typingIndicator.style.display = "none"; // Hide typing indicator
      if (file.type.startsWith("image/")) {
        displayMessage("File uploaded! I received an image file. Let me review this for you.", "bot");
      } else if (file.type.startsWith("video/")) {
        displayMessage("File uploaded! I received a video file. Let me review this for you.", "bot");
      } else if (file.type.startsWith("audio/")) {
        displayMessage("File uploaded! I received an audio file. Let me review this for you.", "bot");
      } else if (file.type.startsWith("text/")) {
        displayMessage("File uploaded! I received a text file. Let me review this for you.", "bot");
      } else {
        displayMessage("File uploaded! I received a file. Let me review this for you.", "bot");
      }
    }, 1000); // Simulate bot processing delay
  }
}

function typeWriterEffect(element, text, delay, callback) {
  let index = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(interval);
      if (callback) callback(); // Execute callback after typing is done
    }
  }, delay);
}

function displayMessage(text, sender) {
  const messagesContainer = document.getElementById("messages");

  // Create a sender label
  const senderLabel = document.createElement("span");
  senderLabel.textContent = sender === "user" ? "User 👤" : "Chatbot 🤖";
  senderLabel.style.fontWeight = "bold";
  senderLabel.style.fontSize = "13px";
  senderLabel.style.marginBottom = "5px";
  senderLabel.style.marginLeft = "15px";
  senderLabel.style.marginRight = "15px";
  senderLabel.style.color = sender === "user" ? "dodgerblue" : "tomato";

  // Create the message bubble
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = ''; // Initially empty, will be filled by typewriter effect

  // Append the label and message to the messages container
  const messageContainer = document.createElement("div");
  messageContainer.style.display = "flex";
  messageContainer.style.flexDirection = "column";
  messageContainer.style.alignItems = sender === "user" ? "flex-end" : "flex-start";
  messageContainer.appendChild(senderLabel);
  messageContainer.appendChild(messageDiv);

  messagesContainer.appendChild(messageContainer);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Apply the typewriter effect to the message
  typeWriterEffect(messageDiv, text, 10); // 10ms delay per character
}