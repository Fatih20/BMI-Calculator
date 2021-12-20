import React from "react";
import styled from "styled-components";


const Main = styled.div`
    align-items: center;
    background-color: black;
    color: white; 
    display: flex;
    flex-direction: column;
    height: 90px;
    justify-content: center;
    width: 100%;
`;

const Title = styled.h1`

`;

export default function Header (){
    return (
        <Main>
            <Title>Calculate your BMI!</Title>
        </Main>
    )
}