import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CounselorBookingScreen = () => {
  const [counselors] = useState([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialty: 'Anxiety & Stress Management',
      availability: 'Available Today',
      rating: 4.8,
      rate: '$50/hour',
    },
    {
      id: '2',
      name: 'Dr. Anil Fernando',
      specialty: 'Depression & Mood Disorders',
      availability: 'Available Tomorrow',
      rating: 4.9,
      rate: '$55/hour',
    },
    {
      id: '3',
      name: 'Dr. Asha Patel',
      specialty: 'Student Wellness',
      availability: 'Available in 2 days',
      rating: 4.7,
      rate: '$45/hour',
    },
  ]);

  const handleBooking = (counselor) => {
    Alert.alert(
      'Book Session',
      `Book a session with ${counselor.name}?`,
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Book', onPress: () => Alert.alert('Success', 'Session booked!') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Professional Counselors</Text>
      </View>

      <FlatList
        data={counselors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.counselorCard}>
            <View style={styles.counselorHeader}>
              <View style={styles.avatar}>
                <Icon name="person-circle" size={50} color="#4CAF50" />
              </View>
              <View style={styles.counselorInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
            </View>

            <View style={styles.details}>
              <Text style={styles.availability}>📅 {item.availability}</Text>
              <Text style={styles.rate}>{item.rate}</Text>
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => handleBooking(item)}
            >
              <Text style={styles.bookButtonText}>Book Session</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
  counselorCard: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
    padding: 15,
  },
  counselorHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    marginRight: 15,
  },
  counselorInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  specialty: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    marginBottom: 15,
  },
  availability: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 5,
  },
  rate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CounselorBookingScreen;
