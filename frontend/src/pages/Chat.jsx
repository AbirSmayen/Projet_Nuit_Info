import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, LogOut, Zap, User } from 'lucide-react';
import Avatar3D from '../components/Avatar3D';
import Message from '../components/Message';
import TypingIndicator from '../components/TypingIndicator';
import AvatarSelector from '../components/AvatarSelector';
import { avatars, getAvatarById, getRandomResponse } from '../data/avatars';

const Chat = ({ username, onLogout }) => {
  const [selectedAvatar, setSelectedAvatar] = useState('philosophe');
  const currentAvatar = getAvatarById(selectedAvatar);
  
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `Salutations, ${username} ! 🎭\n\nJe suis ${currentAvatar.name}, ${currentAvatar.description}.\n\nPose-moi n'importe quelle question, tu vas adorer ma réponse... ou pas ! 🧠✨`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quand on change d'avatar
  const handleAvatarChange = (avatarId) => {
    setSelectedAvatar(avatarId);
    const newAvatar = getAvatarById(avatarId);
    
    const welcomeMessage = {
      type: 'bot',
      text: `🎭 Changement de personnalité !\n\nJe suis maintenant ${newAvatar.name} - ${newAvatar.description}.\n\nPrêt pour une nouvelle expérience absurde ? 😄`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // TODO: Appel API backend avec selectedAvatar
    // const response = await fetch('http://localhost:5000/api/chat', {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('chatbruti_token')}`
    //   },
    //   body: JSON.stringify({ 
    //     message: input, 
    //     username,
    //     avatarType: selectedAvatar 
    //   })
    // });

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getRandomResponse(selectedAvatar),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[95vh] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar avec Avatar 3D */}
        <div className="md:w-1/3 bg-gradient-to-b from-purple-600/30 to-pink-600/30 border-r border-white/10 p-6 flex flex-col overflow-y-auto">
          
          {/* Header Sidebar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                {currentAvatar.emoji} {currentAvatar.name}
              </h2>
              <p className="text-purple-200 text-sm">{currentAvatar.title}</p>
            </div>
            <button
              onClick={onLogout}
              className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg group ml-2"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Avatar 3D */}
          <div className="flex-shrink-0 h-[200px] md:h-[250px] mb-4">
            <Avatar3D isTyping={isTyping} avatarType={selectedAvatar} />
          </div>

          {/* Sélecteur d'avatars */}
          <AvatarSelector 
            selectedAvatar={selectedAvatar} 
            onSelectAvatar={handleAvatarChange} 
          />

          {/* Info utilisateur */}
          <div className="mt-4 space-y-3">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
              <p className="text-white/80 text-xs flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-semibold">Connecté :</span>
                <span className="text-purple-200">{username}</span>
              </p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
              <p className="text-white/70 text-xs flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                {isTyping ? "En train de délirer..." : "Prêt à dire n'importe quoi !"}
              </p>
            </div>
          </div>
        </div>

        {/* Zone de Chat */}
        <div className="flex-1 flex flex-col">
          
          {/* Header Chat */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Chat'bruti 
              <Sparkles className="w-6 h-6 animate-pulse" />
            </h1>
            <p className="text-purple-200 text-sm mt-1">
              {currentAvatar.description} 🎭
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-transparent to-black/10">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}

            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Zone d'input */}
          <div className="p-4 md:p-6 bg-white/5 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Pose ta question à ${currentAvatar.name}...`}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span className="hidden md:inline">Envoyer</span>
              </button>
            </div>
            
            <div className="mt-3 flex items-center justify-center gap-2 text-white/60 text-xs">
              <Zap className="w-4 h-4" />
              <span>Propulsé par {currentAvatar.name} et l'absurdité pure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;