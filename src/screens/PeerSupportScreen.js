import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const PeerSupportScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([
    {
      id: '1',
      name: 'Anxiety Support Circle',
      members: 245,
      description: 'A safe space to discuss anxiety management',
    },
    {
      id: '2',
      name: 'Student Wellness Group',
      members: 512,
      description: 'Support group for university students',
    },
    {
      id: '3',
      name: 'Sleep & Rest Community',
      members: 189,
      description: 'Share tips and support for better sleep',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Peer Support Groups</Text>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupIcon}>
              <Icon name="people" size={30} color="#4CAF50" />
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupDescription}>{item.description}</Text>
              <Text style={styles.groupMembers}>{item.members} members</Text>
            </View>
            <Icon name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
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
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  groupIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  groupContent: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  groupDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  groupMembers: {
    fontSize: 11,
    color: '#999',
  },
});

export default PeerSupportScreen;
