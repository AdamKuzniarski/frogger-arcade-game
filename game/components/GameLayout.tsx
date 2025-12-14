"use client";

import type { ReactNode } from "react";

type GameLayoutProps = {
  children: ReactNode;
  score: number;
  livesRemaining: number;
  isGameOver: boolean;
  onRestartRequested: () => void;
};

export function GameLayout({
  children   ,
  score,
  livesRemaining,
  isGameOver,
  onRestartRequested,
}: GameLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-slate-100">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Frogger Clone</h1>
        <p className="mt-1 text-sm text-slate-400">
          Pfeiltasten benutzen, um den Frosch sicher nach oben zu bringen.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-slate-800/60 p-4 shadow-lg">
        {/* HUD */}
        <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-4 py-2 text-sm">
          <span className="font-mono">
            Score: <span className="font-bold text-green-400">{score}</span>
          </span>
          <span className="font-mono">
            Lives: <span className="font-bold text-red-400">{livesRemaining}</span>
          </span>
          {isGameOver && (
            <span className="rounded bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-300">
              Game Over
            </span>
          )}
        </div>

        {/* Canvas */}
        <div className="flex items-center justify-center">
          {children}
        </div>

        {/* Restart Button */}
        <button
          type="button"
          onClick={onRestartRequested}
          className="mt-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-600"
        >
          Spiel neu starten
        </button>
      </div>
    </div>
  );
}
