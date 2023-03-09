import { useGameData } from "../../utils/hooks";
import { useState } from "react";
import { MultiSelect } from "@mantine/core";
import type { Player, Team } from "../../utils/hooks";

function Commander() {
    const [teams, players, loading] = useGameData();
    const [teamSelections, setTeamSelections] = useState<{
        [teamName: string]: Player[];
    }>({});

    if (loading) {
        return <div>Loading....</div>;
    }

    // Filter out the "no_team" and create a MultiSelect component for each team
    const teamSelects = teams
        .filter((team) => team.name !== "no_team")
        .map((team) => (
            <div key={team.name}>
                <h2>{team.name}</h2>
                <MultiSelect
                    data={players.filter(
                        (player) =>
                            teamSelections[team.name]?.includes(player) ?? true
                    )}
                    label="Select Players"
                    placeholder="Select players"
                    searchable
                    nothingFound="No players found"
                    multiple
                    onChange={(selectedPlayers) => {
                        // Remove selected players from no_team selection
                        setTeamSelections((prevSelections) => {
                            const noTeamSelection =
                                prevSelections.no_team || [];
                            const newNoTeamSelection = noTeamSelection.filter(
                                (player) => !selectedPlayers.includes(player)
                            );
                            return {
                                ...prevSelections,
                                no_team: newNoTeamSelection,
                                [team.name]: selectedPlayers,
                            };
                        });
                    }}
                />
            </div>
        ));

    // Create the MultiSelect component for the "no_team" selection
    const noTeamSelect = (
        <div>
            <h2>No Team</h2>
            <MultiSelect
                data={
                    players.filter(
                        (player) =>
                            !Object.values(teamSelections)
                                .flat()
                                .includes(player)
                    ) as string[]
                }
                label="Select Players"
                placeholder="Select players"
                searchable
                nothingFound="No players found"
                multiple
                onChange={(selectedPlayers) => {
                    const newSelections = { ...teamSelections };
                    Object.keys(newSelections).forEach((teamName) => {
                        newSelections[teamName] = newSelections[teamName]
                            ? newSelections[teamName].filter(
                                  (player) => !selectedPlayers.includes(player)
                              )
                            : [];
                    });
                    // Ensure no_team selection is always an array
                    newSelections.no_team = selectedPlayers ?? [];
                    setTeamSelections(newSelections);
                }}
            />
        </div>
    );

    return (
        <>
            <h1>Commander</h1>
            {teamSelects}
            {noTeamSelect}
            <button
                onClick={() => {
                    // Save team selections to db
                    console.log(teamSelections);
                }}
            >
                Save
            </button>
        </>
    );
}

export default Commander;
