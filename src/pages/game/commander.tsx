import useSound from "use-sound";
import { removeAllBuzzed } from "../../components/ToggleGame";
import { useGameData, useGameInfo } from "../../utils/hooks";
import { useEffect } from "react";

function Commander() {
    const [players, loading, buzzed] = useGameData();
    const [isInProgress, gameinfoLoading] = useGameInfo();
    const [play, info] = useSound("/sound/ding.mp3");
    useEffect(() => {
        if (buzzed.length !== 0) {
            play();
        }
    }, [buzzed]);
    const setupStage = () => {
        return (
            <>
                <b>Setup View</b>
                <div>You can relax here!</div>
            </>
        );
    };

    const gameStage = () => {
        return (
            <>
                <h1>Game View</h1>
                <ol className="list-decimal">
                    {buzzed.map((player) => {
                        const timestamp = player.timestamp.toDate();
                        const formattedTime = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
                        return (
                            <li key={player.timestamp.toString()}>
                                {player.Name} ({formattedTime})
                            </li>
                        );
                    })}
                </ol>
                <button
                    className="btn-info btn"
                    onClick={() => removeAllBuzzed()}
                >
                    Remove the buzzed
                </button>
            </>
        );
    };

    if (loading || gameinfoLoading) {
        return <div>Loading Players...</div>;
    } else {
        return <>{!isInProgress ? setupStage() : gameStage()}</>;
    }
}

export default Commander;
