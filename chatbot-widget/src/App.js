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

  const handleSendMessage = async (userMessage) => {
    // Add user's message
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);

    // Add a "thinking" message
    const thinkingMessages = [...newMessages, { sender: 'bot', text: '💭 Thinking...' }];
    setMessages(thinkingMessages);

    try {
      // Call the Gemini API backend
      const response = await fetch('http://localhost:5002/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages
            .filter(msg => msg.sender !== 'bot' || !msg.text.includes('💭'))
            .map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            }))
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Replace thinking message with actual response
      setMessages([...newMessages, { sender: 'bot', text: data.reply }]);

    } catch (error) {
      console.error('Error calling chatbot API:', error);
      // Replace thinking message with error message
      setMessages([
        ...newMessages,
        { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please make sure the backend server is running on port 5002." }
      ]);
    }
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