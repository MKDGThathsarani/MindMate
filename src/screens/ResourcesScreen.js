import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ResourcesScreen = () => {
  const resources = [
    {
      id: '1',
      title: 'Meditation Guide',
      description: 'Learn guided meditation techniques',
      icon: 'leaf',
    },
    {
      id: '2',
      title: 'Breathing Exercises',
      description: 'Calm your mind with breathing techniques',
      icon: 'wind',
    },
    {
      id: '3',
      title: 'Wellness Articles',
      description: 'Read articles about mental wellness',
      icon: 'book',
    },
    {
      id: '4',
      title: 'Crisis Hotlines',
      description: 'Emergency mental health support numbers',
      icon: 'call',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellness Resources</Text>
      </View>

      {resources.map((resource) => (
        <TouchableOpacity key={resource.id} style={styles.resourceCard}>
          <View style={styles.resourceIcon}>
            <Icon name={resource.icon} size={30} color="#4CAF50" />
          </View>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
          </View>
          <Icon name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
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
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  resourceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  resourceDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default ResourcesScreen;
