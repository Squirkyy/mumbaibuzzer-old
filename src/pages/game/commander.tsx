import { useGameData } from "../../utils/hooks";

function Commander() {
    const [players, loading] = useGameData();
    const playerList = players.map((user) => (
        <li key={user.Name}>{user.Name}</li>
    ));
    if (loading) {
        return <div>Loading Players...</div>;
    } else {
        return (
            <>
                <ul>{playerList}</ul>
            </>
        );
    }
}

export default Commander;
