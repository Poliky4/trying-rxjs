import React from "react";
import styled from "styled-components";

const GameDiv = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Entity = styled.div``;

const StyledPlayer = styled(Entity)`
  border-radius: 50%;
  background-color: darkred;
  transition-duration:; 25ms;
  transition-timing-function:; linear;
  transition-property:; left, top, transform;
`;
const StyledShadow = styled(StyledPlayer)`
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
`;
const Shadow = (({width, height, x, y, z}) => {
  const cz = (z/1000);
  return (
    <StyledShadow
      style={{
	width: `${width}vmin`,
	height: `${height}vmin`,
        transform: `
	  scale(${0.4 + cz})
          translate(calc(${
	    -60
	  }% + ${
	    x
	  }vw), calc(${
	    90
	  }% + ${
            y
	  }vh))
        `,
      }}
    />
  );
});
const Player = (player => {
  const {
    width,
    height,
    x,
    y,
    z,
  } = player;
  const zx = z * 0.25;
  const zy = z * 1.5;
  const cx = x - 50;
  const cy = y - 50;

  return (
    <>
      <Shadow
        x={cx}
        y={cy}
        z={z}
      />
      <StyledPlayer 
        style={{
	  width: `${width}vmin`,
	  height: `${height}vmin`,
          transform: `translate(calc(${
	    -50 + zx
	  }% + ${
	    cx
	  }vw), calc(${
	    50 - zy
	  }% + ${
            cy
	  }vh))`,
        }}
      >
      </StyledPlayer>
    </>
  );
});

const p = num => num.toFixed(0);
const StyledInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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

