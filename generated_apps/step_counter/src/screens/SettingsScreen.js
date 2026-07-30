import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { withTheme } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const SettingsScreen = ({ theme }) => {
  const [dailyGoal, setDailyGoal] = useState('');

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const savedGoal = await AsyncStorage.getItem('dailyStepGoal');
        if (savedGoal !== null) {
          setDailyGoal(savedGoal);
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };
    fetchGoal();
  }, []);

  const handleSaveGoal = async () => {
    const goalInt = parseInt(dailyGoal, 10);
    if (isNaN(goalInt) || goalInt <= 0) {
      Alert.alert('Invalid Goal', 'Please enter a valid positive number for your daily step goal.');
      return;
    }
    try {
      await AsyncStorage.setItem('dailyStepGoal', dailyGoal);
      Alert.alert('Success', 'Daily step goal updated!');
    } catch (error) {
      console.error('Error saving goal:', error);
      Alert.alert('Error', 'Could not save your daily step goal.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.label}>Set Daily Step Goal:</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.secondary, color: theme.colors.primary }]} 
          value={dailyGoal}
          onChangeText={setDailyGoal}
          keyboardType="numeric"
          placeholder="e.g., 10000"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          onPress={handleSaveGoal}
        >
          <Text style={styles.buttonText}>Save Goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: width * 0.9,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
    alignSelf: 'flex-start',
  },
  input: {
    height: 50,
    borderColor: '#8BC34A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#8BC34A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default withTheme(SettingsScreen);
