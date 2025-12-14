import type { GameState } from "./gameTypes";
import {
	GAME_CANVAS_HEIGHT_IN_PIXELS,
	GAME_CANVAS_WIDTH_IN_PIXELS,
} from "./gameConstants";

// Zeichnet einen kompletten Frame basierend auf dem GameState
export function renderGameStateToCanvas(
	drawingContext: CanvasRenderingContext2D,
	currentGameState: GameState
): void {
	const context = drawingContext;

	// Canvas leeren
	context.clearRect(0, 0, GAME_CANVAS_WIDTH_IN_PIXELS, GAME_CANVAS_HEIGHT_IN_PIXELS);

	// Hintergrund
	context.fillStyle = "#020617"; // Tailwind: slate-950
	context.fillRect(0, 0, GAME_CANVAS_WIDTH_IN_PIXELS, GAME_CANVAS_HEIGHT_IN_PIXELS);

	// Zielzone (oben)
	context.fillStyle = "#166534"; // Tailwind: green-700
	context.fillRect(0, 0, GAME_CANVAS_WIDTH_IN_PIXELS, 60);

	// Straße in der Mitte
	context.fillStyle = "#1f2937"; // Tailwind: gray-800
	context.fillRect(0, 140, GAME_CANVAS_WIDTH_IN_PIXELS, 100);

	// Autos
	context.fillStyle = "#ef4444"; // Tailwind: red-500
	currentGameState.cars.forEach((car) => {
		context.fillRect(car.position.x, car.position.y, car.width, car.height);
	});

	// Frosch
	context.fillStyle = "#22c55e"; // Tailwind: green-500
	context.fillRect(
		currentGameState.frog.position.x,
		currentGameState.frog.position.y,
		currentGameState.frog.width,
		currentGameState.frog.height
	);
}

