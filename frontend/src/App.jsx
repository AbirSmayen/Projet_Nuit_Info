import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      const user = localStorage.getItem('chatbruti_user');
      const token = localStorage.getItem('chatbruti_token');

      if (user && token) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    init();
  }, []);


  const handleLogin = (username) => {
    localStorage.setItem('chatbruti_user', username);
    localStorage.setItem('chatbruti_token', 'dummy_token'); // ou token réel
    setCurrentUser(username);
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('chatbruti_user');
    localStorage.removeItem('chatbruti_token');
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat username={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;