import React, { useState,  } from 'react';
import { TbSend } from "react-icons/tb";
import useChat from '../../hooks/useChat';



const UserMessage = ({ selectedUserId, onBack,userId,selectedUserName}) => {
 
  const [inputMessage, setInputMessage] = useState('');
  const { messages, sendMessage } = useChat({ userId, selectedUserId });

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage(''); // Clear the input after sending
    }
  };

    

  return (
    <div className="flex flex-col h-full bg-fuchsia-50 border-l-2 border-fuchsia-200">
      <div className="flex items-center justify-between mb-4 p-4 bg-fuchsia-800">
        <button onClick={onBack} className="text-white hover:text-blue-700">
          &larr; Back
        </button>
        <h2 className="text-xl font-semi-bold text-white">{selectedUserName}</h2>
        <div className="w-6"></div>
      </div>

      <div className="h-[480px] overflow-y-auto px-4 [&::-webkit-scrollbar]:[width:5px] [&::-webkit-scrollbar-thumb]:bg-fuchsia-300 [&::-webkit-scrollbar-thumb]:rounded-md">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          userId={userId}
          
        />
      ))}
    </div>

      <div className="flex items-center p-4 bg-fuchsia-200 border-t fixed bottom-0 w-full">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          
          placeholder="Type a message..."
          className="text-sm text-gray-700 px-3 py-1 border w-full border-gray-400 rounded-l-md h-8 focus:border-fuchsia-400"
        />
        <div
          onClick={handleSendMessage}
          className="w-10 flex items-center border bg-white border-gray-400
           hover:bg-fuchsia-100 px-2 py-1 rounded-r-md cursor-pointer"
        >
          <TbSend size={22} />
        </div>
      </div>
    </div>
  );
};

const Message = ({ message, userId}) => {

return(
<div className={`${message.sender === userId ? 'text-right' : 'text-left'} mx-5 my-4`}>
    <span className={`inline-block px-2 py-1 rounded-xl ${
      message.sender === userId ? 'bg-green-400 text-white' : 'bg-fuchsia-400 text-white'
    }`}>
      {message.content}
    </span>
    {/* {isPending && <span className="text-neutral-500 text-sm ml-2">Sending...</span>} */}
  </div>
)};
  
export default UserMessage;
