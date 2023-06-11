import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import PlayerList from "./PlayerList";
import { useRouter } from "next/router";

//make countercheck on user side with token in localstorage
export async function removeAllUser() {
    const colRef = collection(db, "player");
    const snapshop = await getDocs(colRef);

    snapshop.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

function SideBar() {
    const router = useRouter();
    return (
        <ul className="menu ml-5  flex basis-1/12 flex-col items-center bg-slate-900">
            {router.pathname == "/game/commander" && (
                <button
                    className="btn-accent btn mb-4 mt-5"
                    onClick={() => removeAllUser()}
                >
                    Kick all players
                </button>
            )}
            <div className="divider mx-4 my-0" />
            <h1 className="my-2 text-center text-xl text-gray-200">Players</h1>
            <PlayerList />
        </ul>
    );
}

export default SideBar;
