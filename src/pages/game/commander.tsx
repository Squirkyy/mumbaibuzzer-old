import { Button } from "@mantine/core";
import { useGameData } from "../../utils/hooks";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

function Commander() {
    const [players, loading] = useGameData();
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

    if (loading) {
        return <div>Loading Players...</div>;
    } else {
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
    }
}

export default Commander;
