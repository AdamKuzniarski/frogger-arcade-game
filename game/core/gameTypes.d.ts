// Beschreibt eiene zweidimesionale Position
export type Vector2D = {
  x: number;
  y: number;
};

//Beschreibt den Frosch, den der Spieler steuert
export type Frog = {
  position: Vector2D;
  width: number;
  height: number;
};

//Bescheibt ein Ata, das über die Straße fährt
export type Car = {
  position: Vector2D;
  width: number;
  height: number;
  speedInPixelsPerSecond: number;
  direction: 1 | -1; //1 nach rechts, -1 nach links
};

//Spielerstatus mit allem, was für einen Frame wichtig ist
export type GameState = {
  frog: Frog;
  cars: Car[];
  isGameOver: boolean;
  score: number;
  livesRemaining: number;
};

//Beschreibt, welche Tasten aktuell gedrückt sind
export type InputState = {
  isArrowUpPressed: boolean;
  isArrowDownPressed: boolean;
  isArrowLeftPressed: boolean;
  isArrowRightPressed: boolean;
};
