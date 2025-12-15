import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Health Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your message. I'm analyzing your symptoms and will provide recommendations shortly.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="chatbot-panel">
      <div className="chat-header">
        <h2>🤖 AI Health Assistant</h2>
        <p>Get instant health advice and symptom analysis</p>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Describe your symptoms or ask a health question..."
          className="chat-input"
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;