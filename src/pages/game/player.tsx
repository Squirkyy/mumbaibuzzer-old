import Router from "next/router";
import { useEffect, useState } from "react";
import { useGameInfo, useGameData } from "../../utils/hooks";
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import type { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";

function Player() {
    const [isInProgress, progressLoading] = useGameInfo();
    const [players, loading] = useGameData();
    const [currPlayer, setCurrPlayer] = useState<string>("");
    const [username, setUsername] = useState("");
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    useEffect(() => {
        if (!loading && !players.some((player) => player.Name === currPlayer)) {
            handleClearSession();
        }
    }, [players, loading]);

    useEffect(() => {
        if (isInProgress && !progressLoading) {
            Router.push("/game");
        }
    }, [isInProgress]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currPlayer) {
            const isExist = isUsernameExist(currPlayer);
            if (isExist) {
                setIsUsernameTaken(true);
                setErrorMessage("Username is already taken.");
            } else {
                setUsername(currPlayer);
                localStorage.setItem("username", currPlayer);
                await addDoc(collection(db, "player"), { name: currPlayer });
                setIsUsernameTaken(false);
                setErrorMessage("");
            }
        }
    };

    const handleClearSession = async () => {
        await deleteDocumentByName();
        localStorage.removeItem("username");
        setUsername("");
    };

    const deleteDocumentByName = async (): Promise<void> => {
        const collectionRef = collection(db, "player");
        const q = query(collectionRef, where("name", "==", currPlayer));
        try {
            const snapshot: QuerySnapshot = await getDocs(q);

            if (snapshot.size === 0) {
                console.log("No documents found.");
                return;
            }

            snapshot.forEach(async (doc: DocumentSnapshot) => {
                await deleteDoc(doc.ref);
                console.log("Document deleted successfully:", doc.id);
            });
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

    function isUsernameExist(name: string): boolean {
        return players.some((player) => player.Name === name);
    }

    return (
        <div>
            {!username && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={currPlayer}
                            onChange={(e) => setCurrPlayer(e.target.value)}
                        />
                    </label>
                    <button type="submit">Save</button>
                    {isUsernameTaken && <p className="error">{errorMessage}</p>}
                </form>
            )}
            {username && (
                <div>
                    <p>Username: {username}</p>
                    <button onClick={handleClearSession}>
                        Change Username
                    </button>
                </div>
            )}
        </div>
    );
}
export default Player;
