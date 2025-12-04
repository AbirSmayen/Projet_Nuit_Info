const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat/message - Envoyer un message et obtenir une réponse
router.post('/message', chatController.sendMessage);

// GET /api/chat/history - Récupérer l'historique des messages
router.get('/history', chatController.getHistory);

// DELETE /api/chat/history - Supprimer l'historique
router.delete('/history', chatController.clearHistory);

// GET /api/chat/personality - Obtenir la personnalité du bot
router.get('/personality', chatController.getBotPersonality);

// GET /api/chat/stats - Obtenir des statistiques
router.get('/stats', chatController.getStats);

module.exports = router;