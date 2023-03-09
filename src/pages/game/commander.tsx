import { useGameData } from "../../utils/hooks";
import { useEffect, useState } from "react";
import { MultiSelect } from "@mantine/core";
import type { Player, Team } from "../../utils/hooks";

function Commander() {
    const [teams, players, loading] = useGameData();
    const [teamSelections, setTeamSelections] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            setTeamSelections(teams);
            setIsLoading(false);
        }
    }, [loading]);

    const unselectedPlayers = teamSelections
        .filter((team) => team.name === "no_team")
        .flatMap((team) =>
            team.player.map((person) => ({
                label: person,
                value: person,
            }))
        );

    const TeamSelect =
        !isLoading &&
        teamSelections //.filter((team) => team.name !== "no_team")
            .map((team) => (
                <div key={team.name}>
                    <MultiSelect
                        data={unselectedPlayers}
                        label={team.name}
                        value={team.player}
                        placeholder="Pick all that you like"
                    />
                </div>
            ));

    return (
        <>
            <h1>Commander</h1>
            {isLoading ? <div>Loading....</div> : TeamSelect}
            <button
                onClick={() => {
                    // Save team selections to db
                    console.log(unselectedPlayers);
                }}
            >
                Save
            </button>
        </>
    );
}

export default Commander;
