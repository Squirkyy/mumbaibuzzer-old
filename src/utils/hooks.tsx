import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";

export interface Player {
    Name: string;
}

const useGameData = (): [Player[], boolean] => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [values, loading, error] = useCollectionData(
        collection(db, "player")
    );

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (values && !loading) {
            const mappedPlayers = values.map((value) => ({
                Name: value.name,
            })) as Player[];
            setPlayers(mappedPlayers);
        }
    }, [values, loading, error]);

    return [players, loading];
};

const useGameInfo = (): [boolean | undefined, boolean, boolean | undefined] => {
    const [value, loading, error] = useDocument(doc(db, "game", "info"));
    const [isInProgress, setIsInProgress] = useState<boolean | undefined>(
        undefined
    );
    const [isPaused, setIsPaused] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (value && !loading) {
            setIsInProgress(value?.data()?.isRunning);
            setIsPaused(value?.data()?.isPaused);
        }
    }, [value, loading]);

    return [isInProgress, loading, isPaused];
};

export { useGameData, useGameInfo };
