import Router from "next/router";
import { useEffect } from "react";
import { useGameInfo } from "../../utils/hooks";

function Player() {
    const [isInProgress, progressLoading] = useGameInfo();
    useEffect(() => {
        if (isInProgress && !progressLoading) {
            Router.push("/game");
        }
    }, [isInProgress]);
    return <div>Player</div>;
}

export default Player;
