import React from 'react';

const Message = ({ message }) => {
  return (
    <div
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
    >
      <div
        className={`max-w-[75%] rounded-2xl p-4 shadow-md ${
          message.type === 'user'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <span className={`text-xs mt-2 block ${
          message.type === 'user' ? 'text-indigo-100' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;