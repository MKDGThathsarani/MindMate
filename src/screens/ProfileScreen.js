import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalMoodLogs: 0,
    chatMessages: 0,
  });

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    loadStats();
  }, []);

  const loadStats = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    try {
      const moods = await firestore().collection('moods').where('uid', '==', uid).get();
      const chats = await firestore().collection('chats').where('uid', '==', uid).get();

      setStats({
        totalMoodLogs: moods.size,
        chatMessages: chats.size,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          auth().signOut();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.avatar}>
          <Icon name="person" size={50} color="#4CAF50" />
        </View>
        <Text style={styles.email}>{user?.email || 'Anonymous User'}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalMoodLogs}</Text>
          <Text style={styles.statLabel}>Mood Logs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.chatMessages}</Text>
          <Text style={styles.statLabel}>Chat Messages</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="settings" size={24} color="#333" />
        <Text style={styles.menuItemText}>Settings</Text>
        <Icon name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="help-circle" size={24} color="#333" />
        <Text style={styles.menuItemText}>Help & Support</Text>
        <Icon name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
