// src/FloatingButton.js
import React from 'react';

function FloatingButton({ onClick }) {
  return (
    <button className="floating-button" onClick={onClick} aria-label="Open chat">
      {/* Using the robot emoji as a placeholder for your image */}
      🤖
    </button>
  );
}

export default FloatingButton;