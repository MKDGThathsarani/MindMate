import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [todayMood, setTodayMood] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    fetchTodayMood();
  }, []);

  const fetchTodayMood = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    const today = new Date().toISOString().split('T')[0];
    const snapshot = await firestore()
      .collection('moods')
      .where('uid', '==', uid)
      .where('date', '==', today)
      .get();

    if (!snapshot.empty) {
      setTodayMood(snapshot.docs[0].data());
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
        <Text style={styles.userName}>
          {user?.displayName || user?.email || 'Anonymous User'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.moodCard}
        onPress={() => navigation.navigate('Mood')}
      >
        <Text style={styles.moodCardTitle}>Today's Mood</Text>
        {todayMood ? (
          <View style={styles.moodResult}>
            <Text style={styles.moodEmoji}>
              {todayMood.mood === 'happy' && '😊'}
              {todayMood.mood === 'neutral' && '😐'}
              {todayMood.mood === 'sad' && '😔'}
              {todayMood.mood === 'anxious' && '😰'}
              {todayMood.mood === 'stressed' && '😫'}
              {todayMood.mood === 'depressed' && '😞'}
            </Text>
            <Text style={styles.moodText}>{todayMood.mood?.toUpperCase()}</Text>
          </View>
        ) : (
          <View style={styles.noMood}>
            <Text style={styles.noMoodText}>Tap to check in</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.actionEmoji}>💬</Text>
          <Text style={styles.actionTitle}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Resources')}
        >
          <Text style={styles.actionEmoji}>📚</Text>
          <Text style={styles.actionTitle}>Resources</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('PeerSupport')}
        >
          <Text style={styles.actionEmoji}>👥</Text>
          <Text style={styles.actionTitle}>Peer Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.emergencyCard]}
          onPress={() => navigation.navigate('Emergency')}
        >
          <Text style={styles.actionEmoji}>🚨</Text>
          <Text style={styles.actionTitle}>Emergency</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 20, paddingTop: 40 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  userName: { fontSize: 16, color: '#666', marginTop: 4 },
  moodCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodCardTitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  moodResult: { alignItems: 'center' },
  moodEmoji: { fontSize: 48 },
  moodText: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50', marginTop: 8 },
  noMood: { alignItems: 'center', padding: 10 },
  noMoodText: { fontSize: 18, color: '#4CAF50', fontWeight: 'bold' },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emergencyCard: { backgroundColor: '#FFE5E5' },
  actionEmoji: { fontSize: 32 },
  actionTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 8 },
});

export default HomeScreen;