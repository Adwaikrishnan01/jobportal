// MessageList.js
import React from 'react';

const MessageList=({ messages, userId })=> {
    console.log("chatmessge",messages)
  return (
    
      <div className="overflow-y-auto h-64 p-4">
    {messages.map((msg, index) => (
      <div key={index} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
        <p className={`inline-block p-2 rounded-lg ${msg.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          {msg.content}
        </p>
      </div>
    ))}
  </div>
    
  );
}

export default MessageList;