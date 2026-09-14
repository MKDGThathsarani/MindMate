import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MoodTrackerScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

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
    if (!uid || saving) return;

    setSaving(true);
    try {
      const date = new Date().toISOString().split('T')[0];
      await firestore().collection('moods').doc(`${uid}_${date}`).set({
        uid,
        mood: mood.name,
        note: note.trim(),
        date,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      setSelectedMood(mood.name);
      Alert.alert('Check-in saved', 'Thanks for checking in with yourself today.');
    } catch (error) {
      console.error('Error saving mood:', error);
      Alert.alert('Could not save check-in', 'Please check your connection and try again.');
    } finally {
      setSaving(false);
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

      <Text style={styles.noteLabel}>Want to add a note? (optional)</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="What is on your mind today?"
        placeholderTextColor="#8A8A8A"
        multiline
        value={note}
        onChangeText={setNote}
        maxLength={500}
      />
      <Text style={styles.helperText}>{saving ? 'Saving your check-in...' : 'Tap a mood above to save your check-in.'}</Text>
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
  noteLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  noteInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  helperText: {
    color: '#777',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 24,
  },
});

export default MoodTrackerScreen;
