import React from "react";
import styled from "styled-components";
import { BarChart, Bar } from "recharts";

import { useCalculationContext } from "./body";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;

`;


export default function Charts (){
    const calculation = useCalculationContext();

    return (
        <Main>
        </Main>
    )
}