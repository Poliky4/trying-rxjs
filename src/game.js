import React, { useState, useEffect, useRef, useReducer } from "react";
import styled from "styled-components";

import Render from "./render";
import { getGameState } from "./logic";

const GameWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(10, 0, 0, 0.6);
`;

const Game = () => {
  const [gameData, setGameData] = useReducer((_, data) => data);

  useEffect(() => {
    setInterval(() => {
      const gameState = getGameState();
      setGameData({...gameState});
    }, 250);
  }, []);

  return (
    <GameWrapper>
      {gameData && <Render data={gameData} />}
    </GameWrapper>
  );
}

export default Game;

