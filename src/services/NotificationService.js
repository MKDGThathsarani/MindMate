import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('📱 Notification received:', notification);
      },
      requestPermissions: Platform.OS === 'ios' ? true : false,
    });

    PushNotification.createChannel(
      {
        channelId: 'mindmate-channel',
        channelName: 'MindMate Notifications',
        channelDescription: 'Notifications for mental wellness support',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`📢 Channel created: ${created}`)
    );
  }

  scheduleDailyReminder() {
    PushNotification.localNotificationSchedule({
      channelId: 'mindmate-channel',
      title: '🧠 MindMate Check-in',
      message: 'Hey there! 🌟 How are you feeling today? Take a moment to check in with yourself.',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      repeatType: 'day',
      repeatTime: 1,
      allowWhileIdle: true,
    });
  }

  initialize() {
    this.scheduleDailyReminder();
  }
}

export default new NotificationService();