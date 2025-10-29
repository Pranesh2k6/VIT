// src/App.js
import React, { useState, useEffect } from 'react';
import FloatingButton from './FloatingButton';
import ChatWindow from './ChatWindow';
import './App.css'; // We will create this file next

// The key for saving our chat data
const CHAT_STORAGE_KEY = 'clario-chat-history';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // 1. LOAD: Runs ONCE when the app first loads
  useEffect(() => {
    const savedChat = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      // Add a default welcome message
      setMessages([
        { sender: 'bot', text: "Hi! I'm Dr. Neutron. Ask me about study strategies or concepts!" }
      ]);
    }
  }, []); // Empty array means run only on mount

  // 2. SAVE: Runs EVERY TIME 'messages' state changes
  useEffect(() => {
    // Don't save the initial empty array
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]); // Dependency array: run when 'messages' changes

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (userMessage) => {
    // Add user's message
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);

    // --- DUMMY BOT RESPONSE (FOR FRONTEND) ---
    // This is where you'll later call the Gemini API
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: "That's a great question! I'm processing..." }
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && <FloatingButton onClick={toggleChat} />}
      {isOpen && (
        <ChatWindow
          onClose={toggleChat}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;