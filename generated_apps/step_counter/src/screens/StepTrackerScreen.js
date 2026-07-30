import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressBar, withTheme } from 'react-native-elements';
import Pedometer from 'react-native-pedometer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const StepTrackerScreen = ({ theme }) => {
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const savedGoal = await AsyncStorage.getItem('dailyStepGoal');
        if (savedGoal !== null) {
          setGoal(parseInt(savedGoal, 10));
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    fetchGoal();

    const subscription = Pedometer.startPedometerUpdatesFromDate(new Date().getTime(), (
      error,
      data
    ) => {
      if (error) {
        console.error('Pedometer error:', error);
        return;
      }
      setSteps(data.numberOfSteps);
    });

    return () => {
      Pedometer.stopPedometerUpdates();
    };
  }, []);

  const progress = goal > 0 ? (steps / goal) * 100 : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Daily Steps</Text>
        <Text style={styles.stepsText}>{steps}</Text>
        <Text style={styles.goalText}>Goal: {goal}</Text>
        <ProgressBar
          style={styles.progressBar}
          progress={progress / 100}
          color={theme.colors.secondary}
          height={10}
        />
        <Text style={styles.progressText}>{Math.round(progress)}% of goal</Text>
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
    marginBottom: 15,
    color: '#333',
  },
  stepsText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  goalText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
  },
});

export default withTheme(StepTrackerScreen);
