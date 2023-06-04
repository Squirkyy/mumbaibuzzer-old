import { collection, doc } from "firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";

export interface Player {
    Name: string;
}

interface BuzzedPlayer {
    Name: string;
    timestamp: Timestamp;
}

const useGameData = (): [Player[], boolean, BuzzedPlayer[]] => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [bplayers, setBPlayers] = useState<BuzzedPlayer[]>([]);

    const [values, loading, error] = useCollectionData(
        collection(db, "player")
    );

    const [valuesB, loadingB, errorB] = useCollectionData(
        collection(db, "game/info/buzzed")
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

    useEffect(() => {
        if (errorB) {
            console.error(errorB);
        }
        if (valuesB && !loadingB) {
            const mappedBPlayers = valuesB.map((value) => ({
                Name: value.name,
                timestamp: value.timestamp,
            })) as BuzzedPlayer[];
            const sorted = [...mappedBPlayers].sort((a, b) => {
                if (a.timestamp && b.timestamp) {
                    return (
                        a.timestamp.toDate().getTime() -
                        b.timestamp.toDate().getTime()
                    );
                } else if (a.timestamp) {
                    return -1; // a has a timestamp, but b is null, so a comes before b
                } else if (b.timestamp) {
                    return 1; // b has a timestamp, but a is null, so b comes before a
                } else {
                    return 0; // both a and b are null, so they are considered equal
                }
            });
            setBPlayers(sorted);
        }
    }, [valuesB, loadingB, errorB]);

    return [players, loading, bplayers];
};

const useGameInfo = (): [boolean | undefined, boolean] => {
    const [value, loading, error] = useDocument(doc(db, "game", "info"));
    const [isInProgress, setIsInProgress] = useState<boolean | undefined>(
        undefined
    );
    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (value && !loading) {
            setIsInProgress(value?.data()?.isRunning);
        }
    }, [value, loading, error]);

    return [isInProgress, loading];
};

export { useGameData, useGameInfo };
