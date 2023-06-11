import type { Dispatch, SetStateAction } from "react";
import { useGameInfo } from "../utils/hooks";
import { removeAllUser } from "./SideBar";
import { updateDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import React, { useState } from "react";
import { Modal } from "@mantine/core";

const ToggleGame: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isInProgress, gameinfoLoading] = useGameInfo();

    const toggleState = async () => {
        setIsOpen(false);
        if (isInProgress) {
            removeAllUser();
            removeAllBuzzed();
        }
        const docRef = doc(db, "game", "info");
        await updateDoc(docRef, {
            isRunning: !isInProgress,
        });
    };
    return (
        <>
            <input
                type="checkbox"
                className="toggle-accent toggle"
                checked={isInProgress}
                onClick={() => {
                    setIsOpen(true);
                }}
            />
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                title="Are you sure you want to Switch the game State?"
            >
                <div className="mb-3">
                    You are currently in:
                    <b>{isInProgress ? " Game-Stage" : " Setup-Stage"}</b>
                </div>
                <div className="alert alert-warning mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    {isInProgress
                        ? "By switching you would disable the login for new Players and all currently logged in Players would be redirected into the game."
                        : "By switching you would kick all current players and require everyone to login again."}
                </div>
                <div className="mb-3">Do you want to proceed?</div>
                <div className="flex flex-row justify-center">
                    <button
                        className="btn-success btn mr-2 flex flex-col"
                        onClick={toggleState}
                    >
                        Proceed
                    </button>
                    <button
                        className="btn-error btn flex flex-col"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
};

export async function removeAllBuzzed() {
    const colRef = collection(db, "game/info/buzzed");
    const snapshop = await getDocs(colRef);

    snapshop.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

export default ToggleGame;
