// src/services/ChatbotService.js
import Dialogflow from 'react-native-dialogflow';
import firestore from '@react-native-firebase/firestore';

class ChatbotService {
  constructor() {
    // 🔥 ඔබගේ සැබෑ Client Access Token එක මෙතනට දාන්න
    this.clientAccessToken = '8a9b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t'; // <-- උදාහරණයක් පමණයි!
    
    // 🔥 ඔබගේ සැබෑ Agent ID එක මෙතනට දාන්න
    this.agentId = 'mindmate-chatbot-es-xxxxx'; // <-- උදාහරණයක් පමණයි!
    
    Dialogflow.setConfiguration(
      this.clientAccessToken,
      this.agentId,
      Dialogflow.LANG_ENGLISH
    );
  }

  async sendMessage(userId, text) {
    return new Promise((resolve, reject) => {
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