const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Gestion des erreurs
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }
  
  return data;
};

// API d'authentification
export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(response);
  },
  
  signup: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(response);
  },
  
  logout: () => {
    localStorage.removeItem('chatbruti_token');
    localStorage.removeItem('chatbruti_user');
  }
};

// API de chat
export const chatAPI = {
  sendMessage: async (message) => {
    const token = localStorage.getItem('chatbruti_token');
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message })
    });
    return handleResponse(response);
  },
  
  getHistory: async () => {
    const token = localStorage.getItem('chatbruti_token');
    const response = await fetch(`${API_URL}/chat/history`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    return handleResponse(response);
  }
};

export default { authAPI, chatAPI };