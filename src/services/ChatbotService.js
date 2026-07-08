import Dialogflow from 'react-native-dialogflow';
import firestore from '@react-native-firebase/firestore';

class ChatbotService {
  constructor() {
    // 🔥 මෙතනට ඔබගේ Dialogflow Client Access Token එක paste කරන්න
    this.clientAccessToken = 'YOUR_CLIENT_ACCESS_TOKEN'; // <-- මෙය වෙනස් කරන්න
    
    // 🔥 මෙතනට ඔබගේ Dialogflow Agent ID එක paste කරන්න
    this.agentId = 'YOUR_AGENT_ID'; // <-- මෙය වෙනස් කරන්න
    
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