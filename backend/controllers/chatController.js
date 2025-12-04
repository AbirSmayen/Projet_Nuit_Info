const ChatMessage = require("../models/ChatMessage");
const { exec } = require("child_process");

exports.sendMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Sauvegarde du message user
    await ChatMessage.create({ userId, role: "user", message });

    // Appel du script Python
    exec(`python backend/utils/generate.py "${message}"`, async (error, stdout) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur IA" });
      }

      const botReply = stdout.trim();

      // Sauvegarde message bot
      await ChatMessage.create({
        userId,
        role: "bot",
        message: botReply,
      });

      res.json({ reply: botReply });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    const history = await ChatMessage.find({ userId }).sort({ createdAt: 1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    const { userId } = req.body;

    await ChatMessage.deleteMany({ userId });

    res.json({ message: "History cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBotPersonality = async (req, res) => {
  res.json({
    name: "Chat’bruti",
    style: "absurde + drôle + sarcastique",
  });
};

exports.getStats = async (req, res) => {
  const totalMessages = await ChatMessage.countDocuments();
  res.json({
    totalMessages,
    uptime: process.uptime(),
  });
};
