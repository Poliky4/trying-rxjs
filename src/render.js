import React from "react";
import styled from "styled-components";

const GameDiv = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const Entity = styled.div(({ x, y, width, height }) => {
  
  return `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${width}vw;
    height: ${height}vh;
    background-color: yellow;
  `;
});

const Ground = styled(Entity)`
    background-color: darkgreen;
`;

const Player = styled.div(({ x, y, z, width, height }) => {
  
  const calculatedZ = z * 5;

  return `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    border-radius: 50%;
    width: ${width}vmin;
    height: ${height}vmin;
    background-color: darkred;
    transform: translate(-50%, ${50 - calculatedZ}%);
    transition-duration: 100ms;
    transition-timing-function: linear;
    transition-property: left, top transform;

    ::after {
      content: "";
      display: block;
      position: absolute;
      top: -20px;
      left: 20px;
      width: ${width}vmin;
      height: ${height}vmin;
      background-color: rgba(0, 0, 0, 0.2);
    }
  `;
});

const p = num => num.toFixed(0);
const Render = ({ data }) => {
  const { player, ground, map } = data;
  const { x, y, z, vx, vy, vz } = player;
  return (
    <GameDiv>
      <Ground {...ground} />
      <Player {...player} />
      <div>
        <p>{`pos: (${p(x)},${p(y)},${p(z)})`}</p>
        <p>{`vel: (${p(vx)},${p(vy)},${p(vz)})`}</p>
      </div>
    </GameDiv>
  );
}

export default Render;

