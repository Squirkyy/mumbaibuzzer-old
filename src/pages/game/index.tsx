import { doc } from "@firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../utils/firebase";

function Game() {
    const [value, loading, error] = useDocument(doc(db, "game", "info"));
    const [isInProgress, setIsInProgress] = useState();
    useEffect(() => {
        console.log(value, loading, error);
        if (!isInProgress && !loading) {
            Router.push("/game/player");
        }
    }, [isInProgress]);
    useEffect(() => {
        if (!loading) {
            setIsInProgress(value?.data()?.isRunning);
        }
    }, [value, loading]);
    return <div>Game</div>;
}

export default Game;
