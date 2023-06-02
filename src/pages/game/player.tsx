import Router from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useGameInfo } from "../../utils/hooks";

function Player() {
    const [isInProgress, progressLoading] = useGameInfo();
    const [currPlayer, setCurrPlayer] = useState<string>("");
    const [username, setUsername] = useState("");
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isInProgress && !progressLoading) {
            Router.push("/game");
        }
    }, [isInProgress]);

    useEffect(() => {
        const savedUsername = sessionStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleUsernameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Placeholder check for username availability using `confirm`
        const isNameAvailable = confirm("Do you want to use this username?");
        if (isNameAvailable) {
            sessionStorage.setItem("username", username);
            setIsUsernameTaken(false);
            setErrorMessage("");
        } else {
            setIsUsernameTaken(true);
            setErrorMessage(
                "Sorry, that username is already taken. Please choose another one."
            );
        }
    };

    const handleClearSession = () => {
        sessionStorage.clear();
        setUsername("");
    };

    return (
        <div>
            {!username && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" />
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
