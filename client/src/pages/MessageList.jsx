// MessageList.js
import React from 'react';

function MessageList({ messages, currentUserId }) {
    console.log("chatmessge",messages)
  return (
    <div className=''>
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`message ${message.sender === currentUserId ? 'sent' : 'received'}`}
        >
          <p>{message.content}</p>
          <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default MessageList;