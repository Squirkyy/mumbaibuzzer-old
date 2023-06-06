import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import PlayerList from "./PlayerList";

export async function removeAllUser() {
    const colRef = collection(db, "player");
    const snapshop = await getDocs(colRef);

    snapshop.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}


function SideBar() {
    return ( 
        <ul className="menu bg-slate-900  flex flex-col basis-1/12 ml-5 items-center">
                <button className="btn btn-accent mt-5 mb-4" onClick={() => removeAllUser()}>Kick all players</button>
                <div className="divider mx-4 my-0"/>
                <h1 className="text-xl text-center text-gray-200 my-2">Players</h1>
                <PlayerList />
        </ul>
    )
}

export default SideBar;