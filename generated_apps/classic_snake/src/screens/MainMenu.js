import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { commonStyles } from '../styles/commonStyles';
import { COLORS } from '../constants';

export default function MainMenu({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text style={styles.title}>Classic Snake</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('GameScreen')} />
      <Button title="High Scores" onPress={() => navigation.navigate('HighScoresScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 50,
    textShadowColor: COLORS.SECONDARY,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
