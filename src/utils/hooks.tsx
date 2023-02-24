import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";

type Team = {
    name: string;
    player: string[];
};

const useGameData = (): [Team[], string[], boolean] => {
    const [values, loading, error] = useCollectionData<Team>(collection(db, "team"));
    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<string[]>([]);

    const fillState = (values: Team[]) => {
        setTeams(values);
        const allPlayers: string[] = [];
        values.forEach((team) => {
            team.player.forEach((player) => {
                allPlayers.push(player);
            });
        });
        setPlayers(allPlayers);
    };

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        console.log(values, loading, error);
        if (values && !loading) {
            fillState(values);
        }
    }, [values, loading]);

    return [teams, players, loading];
};

const useGameInfo = (): [boolean | undefined, boolean] => {
    const [value, loading, error] = useDocument(doc(db, "game", "info"));
    const [isInProgress, setIsInProgress] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        if (value && !loading) {
            setIsInProgress(value?.data()?.isRunning);
        }
    }, [value, loading]);

    return [isInProgress, loading];
};

export { useGameData, useGameInfo };
