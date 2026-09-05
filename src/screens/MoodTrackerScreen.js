import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MoodTrackerScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { name: 'happy', emoji: '😊', color: '#FFD700' },
    { name: 'neutral', emoji: '😐', color: '#87CEEB' },
    { name: 'sad', emoji: '😔', color: '#4169E1' },
    { name: 'anxious', emoji: '😰', color: '#FF6347' },
    { name: 'stressed', emoji: '😫', color: '#FF4500' },
    { name: 'depressed', emoji: '😞', color: '#2F4F4F' },
  ];

  const saveMood = async (mood) => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    try {
      await firestore().collection('moods').add({
        uid,
        mood: mood.name,
        date: new Date().toISOString().split('T')[0],
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      setSelectedMood(mood.name);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling today?</Text>
      </View>

      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.name}
            style={[
              styles.moodButton,
              { backgroundColor: mood.color },
              selectedMood === mood.name && styles.moodButtonSelected,
            ]}
            onPress={() => saveMood(mood)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: '48%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  moodButtonSelected: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default MoodTrackerScreen;
