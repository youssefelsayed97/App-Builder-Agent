import { StyleSheet } from 'react-native';
import { BOARD_COLS, BOARD_ROWS, CELL_SIZE, COLORS } from '../constants';

export const gameStyles = StyleSheet.create({
  gameBoard: {
    width: BOARD_COLS * CELL_SIZE,
    height: BOARD_ROWS * CELL_SIZE,
    backgroundColor: COLORS.BOARD_BACKGROUND,
    borderWidth: 5,
    borderColor: COLORS.PRIMARY,
    position: 'relative',
    marginBottom: 20,
    overflow: 'hidden', // Ensures snake and food stay within bounds
  },
});
