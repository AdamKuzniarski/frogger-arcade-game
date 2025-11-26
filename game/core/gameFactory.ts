import {
  CAR_BASE_SPEED_IN_PIXELS_PER_SECOND,
  CAR_HEIGHT_IN_PIXELS,
  CAR_WIDTH_IN_PIXELS,
  FROG_HEIGHT_IN_PIXELS,
  FROG_START_POSITION_X,
  FROG_START_POSITION_Y,
  FROG_WIDTH_IN_PIXELS,
  GAME_CANVAS_WIDTH_IN_PIXELS,
} from "./gameConstants";

import type { Car, Frog, GameState } from "./gameTypes";

//Erzeugt einen neuen Frosch mit Startposition
export function createInitialFrog(): Frog {
  return {
    position: {
      x: FROG_START_POSITION_X,
      y: FROG_START_POSITION_Y,
    },
    width: FROG_WIDTH_IN_PIXELS,
    height: FROG_HEIGHT_IN_PIXELS,
  };
}

//Erzeugt eine Liste von Autos in veschidenen "Lanes"
export function createInitialCars(): Car[] {
  const laneYPositions: number[] = [220, 190, 160];

  const cars: Car[] = [];

  laneYPositions.forEach((laneYPosition, laneIndex) => {
    const direction = laneIndex % 2 === 0 ? 1 : -1;

    for (let carIndex = 0; carIndex < 3; carIndex++) {
      const carSpacing = 120;
      const startXPosition =
        direction === 1
          ? carIndex * carSpacing
          : GAME_CANVAS_WIDTH_IN_PIXELS - carIndex * carSpacing;

      cars.push({
        position: {
          x: startXPosition,
          y: laneYPosition,
        },
        width: CAR_WIDTH_IN_PIXELS,
        height: CAR_HEIGHT_IN_PIXELS,
        speedInPixelsPerSecond:
          CAR_BASE_SPEED_IN_PIXELS_PER_SECOND + laneIndex * 20,
        direction,
      });
    }
  });

  return cars;
}

//Setzt kompletten GameState zusammen
export function createInitialGameState(): GameState {
  return {
    frog: createInitialFrog(),
    cars: createInitialCars(),
    isGameOver: false,
    score: 0,
    livesRemaining: 3,
  };
}
