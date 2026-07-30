import { CELL_SIZE, BOARD_COLS, BOARD_ROWS } from '../constants';

export const getRandomCoordinates = (boardDimension, occupiedCells = []) => {
  let x, y;
  let isOccupied;
  do {
    x = Math.floor(Math.random() * boardDimension);
    y = Math.floor(Math.random() * boardDimension);
    isOccupied = occupiedCells.some(cell => cell.x === x && cell.y === y);
  } while (isOccupied);
  return { x, y };
};

export const isCollision = (head, boardDimension) => {
  // Wall collision
  if (head.x < 0 || head.x >= boardDimension || head.y < 0 || head.y >= boardDimension) {
    return true;
  }
  return false;
};

export const checkSelfCollision = (head, snakeBody) => {
  // Self-collision (check head against body segments)
  for (let i = 1; i < snakeBody.length; i++) {
    if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
      return true;
    }
  }
  return false;
};

export const hasEatenFood = (head, food) => {
  return food && head.x === food.x && head.y === food.y;
};
