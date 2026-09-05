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
    const now = new Date();
    const reminderTime = new Date(now);
    // Set reminder for 9 AM daily
    reminderTime.setHours(9, 0, 0, 0);
    
    // If 9 AM has already passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: 'mindmate-channel',
      title: '🧠 MindMate Check-in',
      message: 'Hey there! 🌟 How are you feeling today? Take a moment to check in with yourself.',
      date: reminderTime,
      repeatType: 'day',
      allowWhileIdle: true,
    });
  }

  initialize() {
    this.scheduleDailyReminder();
  }
}

export default new NotificationService();