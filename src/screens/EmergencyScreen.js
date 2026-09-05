import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EmergencyScreen = () => {
  const hotlines = [
    {
      id: '1',
      name: 'National Crisis Hotline',
      number: '1-800-273-8255',
      available: '24/7',
      description: 'Free mental health crisis support',
    },
    {
      id: '2',
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      available: '24/7',
      description: 'Text-based mental health support',
    },
    {
      id: '3',
      name: 'International Association for Suicide Prevention',
      number: 'Check website for local numbers',
      available: '24/7',
      description: 'Global crisis support resources',
    },
  ];

  const handleCall = (number) => {
    const phoneNumber = number.replace(/\D/g, '');
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      alert('Unable to make call');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.warningBox}>
        <Icon name="alert-circle" size={40} color="#FF4444" />
        <Text style={styles.warningTitle}>Emergency Support</Text>
        <Text style={styles.warningText}>
          If you're having thoughts of self-harm or suicide, please reach out immediately.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Crisis Hotlines</Text>

      {hotlines.map((hotline) => (
        <View key={hotline.id} style={styles.hotlineCard}>
          <View style={styles.hotlineContent}>
            <Text style={styles.hotlineName}>{hotline.name}</Text>
            <Text style={styles.hotlineNumber}>{hotline.number}</Text>
            <Text style={styles.hotlineAvailable}>Available: {hotline.available}</Text>
            <Text style={styles.hotlineDescription}>{hotline.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => handleCall(hotline.number)}
          >
            <Icon name="call" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>What to do now:</Text>
        <Text style={styles.tipItem}>• Reach out to a trusted friend or family member</Text>
        <Text style={styles.tipItem}>• Call a crisis hotline</Text>
        <Text style={styles.tipItem}>• Go to your nearest emergency room</Text>
        <Text style={styles.tipItem}>• Remove access to means of self-harm</Text>
        <Text style={styles.tipItem}>• Stay in a safe environment</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  warningBox: {
    backgroundColor: '#FFE8E8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4444',
    marginTop: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  hotlineCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotlineContent: {
    flex: 1,
  },
  hotlineName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  hotlineNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF4444',
    marginBottom: 3,
  },
  hotlineAvailable: {
    fontSize: 11,
    color: '#4CAF50',
    marginBottom: 3,
  },
  hotlineDescription: {
    fontSize: 11,
    color: '#666',
  },
  callButton: {
    backgroundColor: '#FF4444',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  tipsBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D5016',
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 12,
    color: '#2D5016',
    marginBottom: 5,
  },
});

export default EmergencyScreen;
