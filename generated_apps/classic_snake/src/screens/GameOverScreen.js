import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../constants';

export default function GameOverScreen({ route, navigation }) {
  const { score } = route.params;

  return (
    <View style={commonStyles.container}>
      <Text style={styles.gameOverText}>Game Over!</Text>
      <Text style={styles.finalScoreText}>Final Score: {score}</Text>
      <Button title="Play Again" onPress={() => navigation.replace('GameScreen')} />
      <Button title="Main Menu" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.ACCENT,
    marginBottom: 20,
    textShadowColor: COLORS.SECONDARY,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  finalScoreText: {
    fontSize: 32,
    color: COLORS.PRIMARY,
    marginBottom: 50,
    fontWeight: 'bold',
  },
});
