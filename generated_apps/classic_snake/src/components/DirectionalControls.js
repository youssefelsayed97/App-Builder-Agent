import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DIRECTIONS, COLORS } from '../constants';

export default function DirectionalControls({ onDirectionChange }) {
  return (
    <View style={styles.controlsContainer}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => onDirectionChange(DIRECTIONS.UP)}>
          <Text style={styles.buttonText}>▲</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => onDirectionChange(DIRECTIONS.LEFT)}>
          <Text style={styles.buttonText}>◀</Text>
        </TouchableOpacity>
        <View style={styles.centerPad} />
        <TouchableOpacity style={styles.button} onPress={() => onDirectionChange(DIRECTIONS.RIGHT)}>
          <Text style={styles.buttonText}>▶</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => onDirectionChange(DIRECTIONS.DOWN)}>
          <Text style={styles.buttonText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderColor: COLORS.SECONDARY,
    borderWidth: 2,
  },
  buttonText: {
    color: COLORS.SECONDARY,
    fontSize: 24,
    fontWeight: 'bold',
  },
  centerPad: {
    width: 70,
    height: 70,
  },
});
