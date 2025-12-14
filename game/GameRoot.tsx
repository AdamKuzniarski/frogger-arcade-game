"use client"


import { useEffect, useRef, useState } from "react"
import { GameLayout } from "./components/GameLayout"

import { GAME_CANVAS_HEIGHT_IN_PIXELS, GAME_CANVAS_WIDTH_IN_PIXELS } from "./core/gameConstants"


import { createInitialGameState } from "./core/gameFactory"
import { renderGameStateToCanvas } from "./core/gameRender"
import { updateGameStateForNextFrame } from "./core/gameUpdate"
import type { GameState, InputState } from "./core/gameTypes"

export default function GameRoot() { }

