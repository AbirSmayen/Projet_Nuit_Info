import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
        <div className="flex gap-2">
          <div 
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;