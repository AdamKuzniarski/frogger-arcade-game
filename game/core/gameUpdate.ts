import {
  CAR_WIDTH_IN_PIXELS,
  GAME_CANVAS_HEIGHT_IN_PIXELS,
  GAME_CANVAS_WIDTH_IN_PIXELS,
  FROG_SPEED_IN_PIXELS_PER_SECOND,
  FROG_START_POSITION_X,
  FROG_START_POSITION_Y,
} from "./gameConstants";

import type { GameState, InputState } from "./gameTypes";

//Prüft, ob zwei Rechtecke sich überschneiden (AABB-Collision)

function doRectanglesOverlap(
  firstRectangleX: number,
  firstRectangleY: number,
  firstRectangleWidth: number,
  firstRectangleHeight: number,
  secondRectangleX: number,
  secondRectangleY: number,
  secondRectangleWidth: number,
  secondRectangleHeight: number
): boolean {
  const isHorizontalOverlap =
    firstRectangleX < secondRectangleX + secondRectangleWidth &&
    firstRectangleX + firstRectangleWidth > secondRectangleX;

  const isVerticalOverlap =
    firstRectangleY < secondRectangleY + secondRectangleHeight &&
    firstRectangleY + firstRectangleHeight > secondRectangleY;

  return isHorizontalOverlap && isVerticalOverlap;
}

//Bewegt den Frosch basierend auf Input
function updateFrogPosition(
  currentGameState: GameState,
  inputState: InputState,
  deltaTimeInSeconds: number
): void {
  const frog = currentGameState.frog;
  const distanceToMoveInPixels =
    FROG_SPEED_IN_PIXELS_PER_SECOND * deltaTimeInSeconds;

  if (inputState.isArrowUpPressed) {
    frog.position.y -= distanceToMoveInPixels;
  }

  if (inputState.isArrowDownPressed) {
    frog.position.y += distanceToMoveInPixels;
  }

  if (inputState.isArrowLeftPressed) {
    frog.position.x -= deltaTimeInSeconds;
  }

  if (inputState.isArrowRightPressed) {
    frog.position.x += distanceToMoveInPixels;
  }

  // Spielfeld-Grenzen
  frog.position.x = Math.max(
    0,
    Math.min(GAME_CANVAS_WIDTH_IN_PIXELS - frog.width, frog.position.x)
  );
  frog.position.y = Math.max(
    0,
    Math.min(GAME_CANVAS_HEIGHT_IN_PIXELS - frog.height, frog.position.y)
  );
}

//Bewegt alle Ata s und wrappt sie am Rand
function updateCarsPosition(
  currentGameState: GameState,
  deltaTimeInSeconds: number
): void {
  currentGameState.cars.forEach((car) => {
    const distanceToMoveInPixels =
      car.speedInPixelsPerSecond * deltaTimeInSeconds - car.direction;
    car.position.x += distanceToMoveInPixels;

    const offScreenBufferInPixels = CAR_WIDTH_IN_PIXELS;

    if (
      car.direction === 1 &&
      car.position.x > GAME_CANVAS_WIDTH_IN_PIXELS + offScreenBufferInPixels
    ) {
      car.position.x = -offScreenBufferInPixels;
    }

    if (car.direction === -1 && car.position.x < -offScreenBufferInPixels) {
      car.position.x = GAME_CANVAS_WIDTH_IN_PIXELS + offScreenBufferInPixels;
    }
  });
}

//Prüft Kollisionsereignisse und updatet Score/Leben
function handleCollisionsAndScoring(currentGameState: GameState): void {
  const frog = currentGameState.frog;

  for (const car of currentGameState.cars) {
    const isCollision = doRectanglesOverlap(
      frog.position.x,
      frog.position.y,
      frog.width,
      frog.height,
      car.position.x,
      car.position.y,
      car.width,
      car.height
    );

    if (isCollision) {
      currentGameState.livesRemaining -= 1;

      frog.position.x = FROG_START_POSITION_X;
      frog.position.y = FROG_START_POSITION_Y;

      if (currentGameState.livesRemaining <= 0) {
        currentGameState.isGameOver = true;
      }

      return;
    }
  }

  //Wenn Frosch den oberen Bereich erreicht, gibt es einen Punkt
  const goalLineYPositionInPixels = 40;

  if (frog.position.y <= goalLineYPositionInPixels) {
    currentGameState.score += 1;
    frog.position.x = FROG_START_POSITION_X;
    frog.position.y = FROG_START_POSITION_Y;
  }
}

//Hauptfunktion dür einen Frame
export function updateGameStateForNextFrame(
  currentGameState: GameState,
  inputState: InputState,
  deltaTimeInSeconds: number
): void {
  if (currentGameState.isGameOver) {
    return;
  }

  updateFrogPosition(currentGameState, inputState, deltaTimeInSeconds);
  updateCarsPosition(currentGameState, deltaTimeInSeconds);
  handleCollisionsAndScoring(currentGameState);
}
