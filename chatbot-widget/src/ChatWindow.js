// src/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';

// Component to render LaTeX in messages
function LatexMessage({ text }) {
  const messageRef = useRef(null);

  useEffect(() => {
    // Trigger MathJax to render LaTeX formulas
    if (window.MathJax && messageRef.current) {
      window.MathJax.typesetPromise([messageRef.current]).catch((err) =>
        console.log('MathJax typeset failed:', err)
      );
    }
  }, [text]);

  return <div ref={messageRef}>{text}</div>;
}

function ChatWindow({ onClose, messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Dr. Neutron</h3>
        <button onClick={onClose} className="close-btn" aria-label="Close chat">✕</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <LatexMessage text={msg.text} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Dr. Neutron..."
        />
        <button type="submit" aria-label="Send message">➤</button>
      </form>
    </div>
  );
}

export default ChatWindow;