import Router from "next/router";
import { useEffect, useState } from "react";
import { useGameData, useGameInfo } from "../../utils/hooks";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

function Game() {
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [, loading, buzzed] = useGameData();
    const [isInProgress, progressLoading] = useGameInfo();
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        if (!isInProgress && !progressLoading) {
            Router.push("/game/player");
        }
    }, [isInProgress, progressLoading]);

    useEffect(() => {
        setUser(localStorage.getItem("username"));
    }, []);

    useEffect(() => {
        if (!loading && buzzed.length == 0) {
            setButtonEnabled(true);
        }
    }, [buzzed, loading]);

    const reportBuzz = async () => {
        const collRef = collection(db, "game/info/buzzed");
        await addDoc(collRef, {
            name: user,
            timestamp: serverTimestamp(),
        });
        setButtonEnabled(false);
    };
    if (user == null) {
        return <h1>You have no permissions to be here.</h1>;
    }
    return (
        <>
            You are playing as {user}.
            <button
                disabled={!buttonEnabled}
                className="btn-primary btn"
                onClick={() => reportBuzz()}
            >
                Buzz
            </button>
        </>
    );
}

export default Game;
