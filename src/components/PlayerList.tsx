import { useGameData } from "../utils/hooks";

function PlayerList() {
    const [players] = useGameData();
    if (players.length === 0) return (
        <div className="text-sm text-error">No players online!</div>
    );

    const playerList = players.map((user) => (
        <li key={user.Name} className="py-1">{user.Name}</li>
    ));
    return <>{playerList}</>;
}

export default PlayerList;