import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const CELL_SIZE = 15;
export const BOARD_ROWS = Math.floor(height * 0.5 / CELL_SIZE); // Roughly half screen height
export const BOARD_COLS = Math.floor(width * 0.9 / CELL_SIZE); // Roughly 90% screen width
export const BOARD_SIZE = BOARD_COLS * CELL_SIZE; // Use BOARD_COLS for square board or adjust

export const COLORS = {
  PRIMARY: '#00FF00', // Retro green
  SECONDARY: '#000000', // Black
  ACCENT: '#FF0000', // Red for food/game over
  SNAKE_HEAD: '#00DD00',
  SNAKE_BODY: '#00AA00',
  FOOD: '#FF0000',
  BOARD_BACKGROUND: '#333333',
  BUTTON_BACKGROUND: '#00FF00',
  BUTTON_TEXT: '#000000',
};

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const INITIAL_SNAKE_LENGTH = 4;
export const INITIAL_GAME_SPEED = 150; // milliseconds
export const SPEED_INCREASE_INTERVAL = 5; // Score points to increase speed

// Asset paths (placeholders - actual assets would be in base64 or bundled files)
export const ASSET_PATHS = {
  SNAKE_HEAD: require('../assets/images/snake_head.png'),
  SNAKE_BODY: require('../assets/images/snake_body.png'),
  FOOD: require('../assets/images/food.png'),
  GAME_START_SOUND: require('../assets/sounds/game_start.mp3'),
  FOOD_COLLECT_SOUND: require('../assets/sounds/food_collect.mp3'),
  GAME_OVER_SOUND: require('../assets/sounds/game_over.mp3'),
};
