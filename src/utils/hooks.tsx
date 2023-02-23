import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./firebase";

const useGameData = () => {
    const [values, loading, error] = useCollectionData(collection(db, "team"));
    const [teams, setTeams] = useState();
    const [players, setPlayers] = useState();

    const fillState = (values) => {
        setTeams(values);
        const allPlayers = [];
        values.map((team) => {
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

export default useGameData;
