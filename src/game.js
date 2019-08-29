import React, { useState, useEffect, useRef, useReducer } from "react";
import styled from "styled-components";

import Render from "./render";
import Logic from "./logic";

const GameWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: rgb(0, 50, 0);
`;

const { getGameState } = new Logic();
const fps = 1000/30;

const Game = () => {
  const [gameData, updateGameData] = useReducer(() => {
    return { ...getGameState() };
  });

  const raf = cb => {
    requestAnimationFrame(() => {
      cb();
      raf(cb);
    });
  };

  // /*
  useEffect(() => {
    raf(updateGameData);
  }, []);
  // */
  /*
  useEffect(() => {
    setInterval(updateGameData, fps);
  }, []);
  // */

  return (
    <GameWrapper>
      {gameData && <Render data={gameData} />}
    </GameWrapper>
  );
}

export default Game;

