import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="bg-white/20 rounded-2xl p-4 border border-white/30 backdrop-blur-sm">
        <div className="flex gap-2">
          <div 
            className="w-2 h-2 bg-white rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="w-2 h-2 bg-white rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="w-2 h-2 bg-white rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;