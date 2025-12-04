import React, { useState } from 'react';
import { User, Lock, Sparkles } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setError('');
    
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (username.length < 3) {
      setError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
      return;
    }

    setIsLoading(true);

    // TODO: Remplacer par un vrai appel API
    // fetch('http://localhost:5000/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     localStorage.setItem('chatbruti_token', data.token);
    //     localStorage.setItem('chatbruti_user', username);
    //     onLogin(username);
    //   } else {
    //     setError(data.message || 'Erreur de connexion');
    //   }
    // })
    // .catch(err => {
    //   setError('Erreur de connexion au serveur');
    // })
    // .finally(() => setIsLoading(false));

    // Simulation pour la démo
    setTimeout(() => {
      localStorage.setItem('chatbruti_user', username);
      localStorage.setItem('chatbruti_token', 'demo_token_' + Date.now());
      onLogin(username);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all hover:scale-105">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl mx-auto mb-4 animate-bounce-slow shadow-2xl">
              🤪
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              Chat'bruti 
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-purple-200 text-sm">
              Connectez-vous pour discuter avec l'absurdité incarnée
            </p>
          </div>

          {/* Formulaire */}
          <div className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Entrez votre nom"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Entrez votre mot de passe"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm animate-fadeIn">
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Pas de compte ? Utilisez n'importe quel identifiant ! 😉
            </p>
            <p className="text-white/40 text-xs mt-2">
              Nuit de l'Info 2024 - Défi Viveris
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;