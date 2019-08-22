import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Game from "./game.js";

const Content = styled.div`
  height: 100%;
`;

const App = () => (
  <Content>
    <Game />
  </Content>
);

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

