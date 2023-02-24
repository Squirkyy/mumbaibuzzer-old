import { useGameData } from "../../utils/hooks";

function Commander() {
    const [teams, players, loading] = useGameData();
    const playerListItem = Array.isArray(players)
        ? players.map((player) => <li key={player}>{player}</li>)
        : null;
    const teamListItem = Array.isArray(teams)
        ? teams.map((team) => <li key={team}>{team.name}</li>)
        : null;
    return (
        <>
            <h1>Commander</h1>
            {loading ? <div>loading</div> : <ul>{playerListItem}</ul>}
            <br />
            {loading ? <div>loading</div> : <ul>{teamListItem}</ul>}
        </>
    );
}

export default Commander;
