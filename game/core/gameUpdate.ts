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
