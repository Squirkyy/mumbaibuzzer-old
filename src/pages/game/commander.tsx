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

    const gameStage = () => {
        return (
            <>
                <h1>Game View</h1>
                <ol>
                    {buzzed.map((player) => (
                        <li key={player.timestamp.toString()}>{player.Name}</li>
                    ))}
                </ol>
                <button onClick={() => removeAllBuzzed()}>
                    Remove the buzzed
                </button>
            </>
        );
    };

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
