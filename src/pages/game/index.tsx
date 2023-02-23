import Router from "next/router";
import { useEffect } from "react";
import { useGameInfo } from "../../utils/hooks";

function Game() {
    const [isInProgress, progressLoading] = useGameInfo();
    useEffect(() => {
        if (!isInProgress && !progressLoading) {
            Router.push("/game/player");
        }
    }, [isInProgress]);
    return <div>Game</div>;
}

export default Game;
