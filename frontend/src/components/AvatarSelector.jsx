import React from 'react';
import { avatars } from '../data/avatars';

const AvatarSelector = ({ selectedAvatar, onSelectAvatar }) => {
  return (
    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
      <h3 className="text-white font-semibold mb-3 text-sm">Choisir une personnalité :</h3>
      
      <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => onSelectAvatar(avatar.id)}
            className={`p-3 rounded-lg transition-all transform hover:scale-105 ${
              selectedAvatar === avatar.id
                ? 'bg-white/30 border-2 border-white shadow-lg'
                : 'bg-white/10 border border-white/20 hover:bg-white/20'
            }`}
            style={{
              borderColor: selectedAvatar === avatar.id ? avatar.color : 'transparent'
            }}
          >
            <div className="text-3xl mb-1">{avatar.emoji}</div>
            <div className="text-white text-xs font-medium">{avatar.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;