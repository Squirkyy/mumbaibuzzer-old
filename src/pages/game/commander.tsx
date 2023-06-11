import { removeAllBuzzed } from "../../components/ToggleGame";
import { useGameData, useGameInfo } from "../../utils/hooks";

function Commander() {
    const [players, loading, buzzed] = useGameData();
    const [isInProgress, gameinfoLoading] = useGameInfo();

    const setupStage = () => {
        return (
            <>
                <b>Setup View</b>
                <div>You can relax here!</div>
            </>
        );
    };

    //TODO: Styling of the Playing Phase where users buzz and jakob and clear it.
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

    //TODO: The placement of the button to toggle the state may be changed to a switch and put in one of the corners so that it isn't accidentally pressed
    if (loading || gameinfoLoading) {
        return <div>Loading Players...</div>;
    } else {
        return <>{!isInProgress ? setupStage() : gameStage()}</>;
    }
}

export default Commander;
