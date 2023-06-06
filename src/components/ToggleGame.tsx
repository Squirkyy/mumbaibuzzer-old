import { useState } from "react";
import { useGameInfo } from "../utils/hooks";
import { removeAllUser } from "./SideBar";
import { updateDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../utils/firebase";




function ToggleGame() {
    const [isInProgress, gameinfoLoading] = useGameInfo();

    const toggleState = async () => {
        if (isInProgress) {
            removeAllUser();
            removeAllBuzzed();
        }
        const docRef = doc(db, "game", "info");
        await updateDoc(docRef, {
            isRunning: !isInProgress,
        });
    };

    async function removeAllBuzzed() {
        const colRef = collection(db, "game/info/buzzed");
        const snapshop = await getDocs(colRef);
    
        snapshop.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }
    return (
        <>
            <input type="checkbox" className="toggle toggle-accent" checked={isInProgress} onClick={() => {
                toggleState();
            }}/>
        </>
    )
}

export default ToggleGame;