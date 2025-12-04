import React from 'react';

const Message = ({ message }) => {
  return (
    <div
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
    >
      <div
        className={`max-w-[75%] rounded-2xl p-4 shadow-lg ${
          message.type === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
            : 'bg-white/20 text-white border border-white/30 backdrop-blur-sm'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <span className="text-xs opacity-70 mt-2 block">
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