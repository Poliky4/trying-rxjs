import React from "react";
import styled from "styled-components";

const GameDiv = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const Entity = styled.div`
  position: absolute;
  width: ${({width}) => width}vmin;
  height: ${({height}) => height}vmin;
`;

const StyledPlayer = styled(Entity)`
  border-radius: 50%;
  background-color: darkred;
  transition-duration: 250ms;
  transition-timing-function: linear;
  transition-property: left, top, transform;
`;
const StyledShadow = styled(StyledPlayer)`
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
`;
const Shadow = (({style, z, ...props}) => {
  const zz = (z/1000);
  return (
    <StyledShadow
      style={{
        ...style,
        transform: `
          translate(-60%, 90%)
	  scale(${0.4 + zz})
        `,
      }}
      {...props}
    />
  );
});
const Player = (player => {
  const { x, y, z, ...props } = player;
  const zx = z * 0.5;
  const zy = z * 3;
  return (
    <>
      <Shadow
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        {...player}
      />
      <StyledPlayer 
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(${-50 + zx}%, ${50 - zy}%)`,
        }}
        {...player}
      />
    </>
  );
});

const p = num => num.toFixed(0);
const StyledInfo = styled.div`
  display: inline-block;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: darkorange;
`;
const Info = ({ x, y, z, vx, vy, vz }) => {
  return (
    <StyledInfo>
      <p>{`pos: (${p(x)},${p(y)},${p(z)})`}</p>
      <p>{`vel: (${p(vx)},${p(vy)},${p(vz)})`}</p>
    </StyledInfo>
  );
};
const Render = ({ data }) => {
  const { player } = data;
  return (
    <GameDiv>
      <Player {...player} />
      <Info {...player}  />
    </GameDiv>
  );
}

export default Render;

