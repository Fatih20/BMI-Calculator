import React, {useState, useContext} from "react";
import styled from "styled-components";

import Form from "./form";
import Charts from "./chart";

const Main = styled.div`
`;

const CalculationContext = React.createContext();
const ChangeCalculationContext = React.createContext();

export function useCalculationContext (){
    return useContext(CalculationContext);
}

export function useChangeCalculationContext(){
    return useContext(ChangeCalculationContext);
}

export default function Body (){
    const[calculation, setCalculation] = useState(null);
    return (
        <Main>
            <CalculationContext.Provider value={calculation}>
            <ChangeCalculationContext.Provider value={setCalculation}>
                <Form />
                <Charts />
            </ChangeCalculationContext.Provider>
            </CalculationContext.Provider>
        </Main>
    )
}