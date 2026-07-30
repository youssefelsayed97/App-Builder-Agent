import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CELL_SIZE, COLORS, ASSET_PATHS } from '../constants';

export default function Food({ x, y }) {
  const foodStyle = {
    left: x * CELL_SIZE,
    top: y * CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    borderRadius: CELL_SIZE / 2, // Makes it circular
    backgroundColor: COLORS.FOOD,
  };

  return (
    <View style={foodStyle}>
      {/* If using image sprites, uncomment and adjust: */}
      {/* <Image
        source={ASSET_PATHS.FOOD}
        style={styles.image}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
