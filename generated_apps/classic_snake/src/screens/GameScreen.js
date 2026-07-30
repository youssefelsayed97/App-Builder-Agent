import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, PanResponder } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { gameStyles } from '../styles/gameStyles';
import { 
  BOARD_SIZE, 
  CELL_SIZE, 
  DIRECTIONS, 
  COLORS, 
  INITIAL_SNAKE_LENGTH,
  INITIAL_GAME_SPEED,
  SPEED_INCREASE_INTERVAL
} from '../constants';
import { 
  getRandomCoordinates, 
  isCollision,
  checkSelfCollision,
  hasEatenFood
} from '../utils/gameLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DirectionalControls from '../components/DirectionalControls';
import SnakeSegment from '../components/SnakeSegment';
import Food from '../components/Food';
import AdManager from '../utils/adManager';

const MAX_HIGH_SCORES = 10;

export default function GameScreen({ navigation }) {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(true);
  const gameInterval = useRef(null);
  const currentDirection = useRef(direction);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  
  // Update refs when state changes
  useEffect(() => { currentDirection.current = direction; }, [direction]);
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { foodRef.current = food; }, [food]);

  const saveHighScore = useCallback(async (newScore) => {
    try {
      const existingScoresJSON = await AsyncStorage.getItem('highScores');
      const existingScores = existingScoresJSON ? JSON.parse(existingScoresJSON) : [];
      
      const updatedScores = [...existingScores, newScore].sort((a, b) => b - a).slice(0, MAX_HIGH_SCORES);
      await AsyncStorage.setItem('highScores', JSON.stringify(updatedScores));
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: 5 - i, y: 5 });
    }
    setSnake(initialSnake);
    setDirection(DIRECTIONS.RIGHT);
    setFood(getRandomCoordinates(BOARD_SIZE / CELL_SIZE, initialSnake));
    setScore(0);
    setGameOver(false);
    setGamePaused(true); // Start paused
    clearInterval(gameInterval.current);
  }, []);

  useEffect(() => {
    resetGame();
    AdManager.showBannerAd(); // Show banner ad when game screen mounts
    return () => {
      clearInterval(gameInterval.current);
      AdManager.hideBannerAd(); // Hide banner ad when game screen unmounts
    };
  }, [resetGame]);

  const updateGameSpeed = useCallback((currentScore) => {
    // Increase speed every SPEED_INCREASE_INTERVAL points
    const speedMultiplier = Math.floor(currentScore / SPEED_INCREASE_INTERVAL);
    return Math.max(50, INITIAL_GAME_SPEED - (speedMultiplier * 10)); // Min speed 50ms
  }, []);

  const onGameOver = useCallback(async (finalScore) => {
    setGameOver(true);
    setGamePaused(true);
    clearInterval(gameInterval.current);
    await saveHighScore(finalScore);
    AdManager.showInterstitialAd(); // Show interstitial ad on game over
    navigation.replace('GameOverScreen', { score: finalScore });
  }, [navigation, saveHighScore]);

  const gameLoop = useCallback(() => {
    if (gameOver || gamePaused) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      const currentDir = currentDirection.current;

      head.x += currentDir.x;
      head.y += currentDir.y;

      // Check wall collision
      if (isCollision(head, BOARD_SIZE / CELL_SIZE)) {
        onGameOver(score);
        return prevSnake;
      }

      // Check self collision (if snake has more than 1 segment, after moving)
      if (checkSelfCollision(head, prevSnake)) {
        onGameOver(score);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (hasEatenFood(head, foodRef.current)) {
        setScore(prevScore => prevScore + 1);
        setFood(getRandomCoordinates(BOARD_SIZE / CELL_SIZE, newSnake));
        // No pop, snake grows
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }
      return newSnake;
    });
  }, [gameOver, gamePaused, score, onGameOver]);

  useEffect(() => {
    if (!gamePaused && !gameOver) {
      clearInterval(gameInterval.current);
      const speed = updateGameSpeed(score);
      gameInterval.current = setInterval(gameLoop, speed);
    }
    return () => clearInterval(gameInterval.current);
  }, [gamePaused, gameOver, score, gameLoop, updateGameSpeed]);

  const handleDirectionChange = useCallback((newDir) => {
    if (gamePaused) return; // Don't change direction if paused
    const current = currentDirection.current;
    // Prevent reversing direction
    if (
      (newDir === DIRECTIONS.UP && current === DIRECTIONS.DOWN) ||
      (newDir === DIRECTIONS.DOWN && current === DIRECTIONS.UP) ||
      (newDir === DIRECTIONS.LEFT && current === DIRECTIONS.RIGHT) ||
      (newDir === DIRECTIONS.RIGHT && current === DIRECTIONS.LEFT)
    ) {
      return;
    }
    setDirection(newDir);
  }, [gamePaused]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (dx > 0) handleDirectionChange(DIRECTIONS.RIGHT);
          else handleDirectionChange(DIRECTIONS.LEFT);
        } else {
          // Vertical swipe
          if (dy > 0) handleDirectionChange(DIRECTIONS.DOWN);
          else handleDirectionChange(DIRECTIONS.UP);
        }
      },
    })
  ).current;

  const startGame = () => {
    setGamePaused(false);
  };

  return (
    <View style={commonStyles.container} {...panResponder.panHandlers}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={gameStyles.gameBoard}>
        {snake.map((segment, index) => (
          <SnakeSegment key={index} x={segment.x} y={segment.y} isHead={index === 0} />
        ))}
        {food && <Food x={food.x} y={food.y} />}
      </View>
      
      {gamePaused && !gameOver && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Tap to Start</Text>
        </TouchableOpacity>
      )}

      <DirectionalControls onDirectionChange={handleDirectionChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 20,
    alignSelf: 'center',
  },
  startButton: {
    position: 'absolute',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    zIndex: 10,
  },
  startButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
  },
});
