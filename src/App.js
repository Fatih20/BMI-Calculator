import React from "react";
import styled from "styled-components";

import './App.css';

import Header from "./components/header";
import Body from "./components/body";

import { GlobalTransition } from "./GlobalComponent";

const Main = styled.div`
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <>
      <GlobalTransition />
      <Main>
        <Header />
        <Body />
      </Main>
    </>
  );
}

export default App;
