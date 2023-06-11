import useSound from "use-sound";
import { removeAllBuzzed } from "../../components/ToggleGame";
import { useGameData, useGameInfo } from "../../utils/hooks";
import { useEffect } from "react";
import moment from 'moment';


function Commander() {
    const [, loading, buzzed] = useGameData();
    const [isInProgress, gameinfoLoading] = useGameInfo();
    const [play] = useSound("/sound/ding.mp3");
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
                <ol className="list-decimal mb-3">
                    {buzzed.map((player) => {
                        const timestamp = player.timestamp.toDate();
                        const formattedTime = moment(timestamp).format('HH:mm:ss');
                        return (
                            <li key={player.timestamp.toString()}>
                                <b>{player.Name}</b> ({formattedTime})
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
