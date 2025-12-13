"use client"

import type {ReactNode} from "react";

type GameLayoutProps = {
children: ReactNode;
score: number;
livesRemaining: number;
isGameOver: boolean;
onRestartRequested: () => void;
};

export function GameLayout({
children,
score,
livesRemaining,
isGameOver, 
onRestartRequested
}:GameLayoutProps    ){
return(
<div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-shadow-slate-100">
        <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Frogger Clone</h1>
                <p className="mt-1 text-sm text-slate-400">
                Pfeiltasten beutzen, um den Frosch sicher nach oben zu bringen.
                </p>
        </div>
</div>

<div>

        <div></div>
</div>
)
};

