import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../constants';

export default function HighScoresScreen() {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHighScores = useCallback(async () => {
    try {
      setLoading(true);
      const scoresJSON = await AsyncStorage.getItem('highScores');
      const scores = scoresJSON ? JSON.parse(scoresJSON) : [];
      setHighScores(scores);
    } catch (error) {
      console.error('Failed to load high scores:', error);
      // Optionally, show an alert to the user
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHighScores();
  }, [loadHighScores]);

  const renderItem = ({ item, index }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreRank}>#{index + 1}</Text>
      <Text style={styles.scoreValue}>{item}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      {highScores.length === 0 ? (
        <Text style={styles.noScoresText}>No high scores yet! Play to set one.</Text>
      ) : (
        <FlatList
          data={highScores}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 20,
    width: '80%',
    alignSelf: 'center',
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  scoreRank: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  scoreValue: {
    fontSize: 22,
    color: COLORS.ACCENT,
    fontWeight: 'bold',
  },
  noScoresText: {
    fontSize: 20,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
});
