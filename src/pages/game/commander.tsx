import { useGameData, useGameInfo } from "../../utils/hooks";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

function Commander() {
    const [players, loading, buzzed] = useGameData();
    const [isInProgress, gameinfoLoading] = useGameInfo();
    const playerList = players.map((user) => (
        <li key={user.Name}>{user.Name}</li>
    ));

    async function removeAllUser() {
        const colRef = collection(db, "player");
        const snapshop = await getDocs(colRef);

        snapshop.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }

    async function removeAllBuzzed() {
        const colRef = collection(db, "game/info/buzzed");
        const snapshop = await getDocs(colRef);

        snapshop.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }

    const toggleState = async () => {
        if (isInProgress) {
            removeAllUser();
            removeAllBuzzed();
        }
        const docRef = doc(db, "game", "info");
        await updateDoc(docRef, {
            isRunning: !isInProgress,
        });
    };

    //TODO: Styling of the Setup phase where users choose their names
    const setupStage = (): JSX.Element => {
        return (
            <>
                {players.some((player) => player.Name !== null) ? (
                    <>
                        <ul>{playerList}</ul>
                        <button className="btn" onClick={() => removeAllUser()}>
                            Remove all Users
                        </button>
                    </>
                ) : (
                    <h1>No Players here Yet.....</h1>
                )}
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
        return (
            <>
                {!isInProgress ? setupStage() : gameStage()}
                <button
                    className="btn-accent btn"
                    onClick={() => toggleState()}
                >
                    Toggle Game in Progress
                </button>
            </>
        );
    }
}

export default Commander;
