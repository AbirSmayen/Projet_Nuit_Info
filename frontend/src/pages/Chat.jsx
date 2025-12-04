import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, LogOut, Zap, User, ChevronDown, Settings } from 'lucide-react';
import Avatar3D from '../components/Avatar3D';
import Message from '../components/Message';
import TypingIndicator from '../components/TypingIndicator';
import { avatars, getAvatarById, getRandomResponse } from '../data/avatars';

const Chat = ({ username, onLogout }) => {
  const [selectedAvatar, setSelectedAvatar] = useState('philosophe');
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
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
  const menuRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAvatarChange = (avatarId) => {
    setSelectedAvatar(avatarId);
    setIsAvatarMenuOpen(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[95vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar avec Avatar 3D */}
        <div className="md:w-1/3 bg-gradient-to-b from-indigo-50 to-purple-50 border-r border-gray-200 p-6 flex flex-col">
          
          {/* Header Sidebar avec Menu Déroulant */}
          <div className="flex items-center justify-between mb-6" ref={menuRef}>
            <div className="flex-1 relative">
              {/* Bouton pour ouvrir le menu */}
              <button
                onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-white transition-all shadow-sm border border-gray-200 group"
              >
                <div className="text-3xl">{currentAvatar.emoji}</div>
                <div className="flex-1 text-left">
                  <h2 className="text-gray-800 font-bold text-lg flex items-center gap-2">
                    {currentAvatar.name}
                  </h2>
                  <p className="text-indigo-600 text-xs">{currentAvatar.title}</p>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    isAvatarMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Menu déroulant */}
              {isAvatarMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[400px] overflow-y-auto">
                  <div className="p-2">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                      <Settings className="w-4 h-4" />
                      <span className="font-semibold">Changer de personnalité</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 p-2">
                      {avatars.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => handleAvatarChange(avatar.id)}
                          className={`p-3 rounded-lg transition-all transform hover:scale-105 text-left ${
                            selectedAvatar === avatar.id
                              ? 'bg-indigo-100 border-2 shadow-md'
                              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                          }`}
                          style={{
                            borderColor: selectedAvatar === avatar.id ? avatar.color : 'transparent'
                          }}
                        >
                          <div className="text-2xl mb-1">{avatar.emoji}</div>
                          <div className="text-gray-800 text-xs font-medium leading-tight">
                            {avatar.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onLogout}
              className="ml-3 text-gray-600 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg group"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Avatar 3D - Cadre TRÈS AGRANDI */}
          <div className="flex-shrink-0 h-[400px] md:h-[550px] mb-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <Avatar3D isTyping={isTyping} avatarType={selectedAvatar} />
          </div>

          {/* Info utilisateur */}
          <div className="mt-auto space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <p className="text-gray-700 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold">Connecté :</span>
                <span className="text-indigo-600 font-medium">{username}</span>
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-200">
              <p className="text-gray-700 text-xs flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">
                  {isTyping ? "En train de délirer..." : "Prêt à dire n'importe quoi !"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Zone de Chat */}
        <div className="flex-1 flex flex-col bg-gray-50">
          
          {/* Header Chat */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 md:p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Chat'bruti 
              <Sparkles className="w-6 h-6 animate-pulse" />
            </h1>
            <p className="text-indigo-100 text-sm mt-1">
              {currentAvatar.description} 🎭
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}

            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Zone d'input */}
          <div className="p-4 md:p-6 bg-white border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Pose ta question à ${currentAvatar.name}...`}
                className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span className="hidden md:inline">Envoyer</span>
              </button>
            </div>
            
            <div className="mt-3 flex items-center justify-center gap-2 text-gray-500 text-xs">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Propulsé par {currentAvatar.name} et l'absurdité pure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;