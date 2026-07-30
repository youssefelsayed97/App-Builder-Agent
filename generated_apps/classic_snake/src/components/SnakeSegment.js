import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CELL_SIZE, COLORS, ASSET_PATHS } from '../constants';

export default function SnakeSegment({ x, y, isHead }) {
  const segmentStyle = {
    left: x * CELL_SIZE,
    top: y * CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    borderRadius: CELL_SIZE / 4,
    backgroundColor: isHead ? COLORS.SNAKE_HEAD : COLORS.SNAKE_BODY,
  };

  return (
    <View style={segmentStyle}>
      {/* If using image sprites, uncomment and adjust: */}
      {/* <Image
        source={isHead ? ASSET_PATHS.SNAKE_HEAD : ASSET_PATHS.SNAKE_BODY}
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
