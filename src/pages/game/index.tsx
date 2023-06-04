import Router from "next/router";
import { useEffect, useState } from "react";
import { useGameData, useGameInfo } from "../../utils/hooks";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useHotkeys } from "@mantine/hooks";

function Game() {
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [, loading, buzzed] = useGameData();
    const [isInProgress, progressLoading] = useGameInfo();
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        if (!isInProgress && !progressLoading) {
            Router.push("/game/player");
        }
    }, [isInProgress]);

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
    //TODO: Error-Page (when no Username in Session was found)
    if (user == null) {
        return <h1>You have no permissions to be here.</h1>;
    }
    //TODO: Actual buzzer (maybe with Icon and the Width and size) + potentially the username in one of the corners
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
