// src/services/ChatbotService.js
import Dialogflow from 'react-native-dialogflow';
import firestore from '@react-native-firebase/firestore';

class ChatbotService {
  constructor() {
    this.clientAccessToken = '';
    this.agentId = '';
    this.isConfigured = Boolean(this.clientAccessToken && this.agentId);

    if (this.isConfigured) {
      Dialogflow.setConfiguration(
        this.clientAccessToken,
        this.agentId,
        Dialogflow.LANG_ENGLISH
      );
    }
  }

  async sendMessage(userId, text) {
    if (!this.isConfigured) {
      const fallbackReply = this.getLocalReply(text);
      await this.saveChatSession(userId, text, fallbackReply, null);
      return fallbackReply;
    }

    return new Promise((resolve, _reject) => {
      Dialogflow.requestQuery(
        text,
        (result) => {
          const reply = result.queryResult.fulfillmentText || 
            "I'm here to listen. How are you feeling? 💚";
          this.saveChatSession(userId, text, reply, result);
          resolve(reply);
        },
        (error) => {
          console.error('Dialogflow Error:', error);
          const fallbackReply = "I'm here to support you. Please reach out to a helpline if you need immediate assistance. 💚";
          this.saveChatSession(userId, text, fallbackReply, null);
          resolve(fallbackReply);
        }
      );
    });
  }

  getLocalReply(text) {
    const normalizedText = text.toLowerCase();

    if (normalizedText.includes('emergency') || normalizedText.includes('suicide') || normalizedText.includes('hurt myself')) {
      return 'I am glad you reached out. Please open Emergency Support in MindMate or contact a trusted person and local emergency services now.';
    }

    if (normalizedText.includes('anxious') || normalizedText.includes('anxiety') || normalizedText.includes('stress')) {
      return 'That sounds difficult. Try taking five slow breaths, then name one thing you can control in the next ten minutes.';
    }

    return "I am here to listen. Dialogflow is not configured yet, but you can still use your mood check-in and wellness resources. 💚";
  }

  async saveChatSession(userId, userMessage, botReply, result) {
    try {
      await firestore().collection('chats').add({
        uid: userId,
        userMessage: userMessage,
        botReply: botReply,
        intent: result?.queryResult?.intent?.displayName || 'unknown',
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  }
}

export default new ChatbotService();