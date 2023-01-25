import Router from "next/router";
import { useEffect, useState } from "react";

function Game() {
  const [isInProgress, setIsInProgress] = useState(false);
  useEffect(() => {
    if (!isInProgress) {
      Router.push("/game/player");
    }
  }, [isInProgress]);
  return <div>Game</div>;
}

export default Game;
