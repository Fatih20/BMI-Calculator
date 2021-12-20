import React, {useState} from "react";
import styled from "styled-components";

import { VanillaButton } from "../GlobalComponent";

import { useCalculationContext, useChangeCalculationContext } from "./body";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const FormBox = styled.div`
    align-items: center;
    background-color: #4d4d4d;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    max-width: 250px;
    padding: 10px 20px;
`;

const MetricChoiceContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const MetricChoice = styled(VanillaButton)`
    background-color: rgba(0, 0, 0, 0);
    color: ${({chosen}) => chosen ? "white" : "rgba(255, 255, 255, 0.4)"};
    border-radius: 5px; 
`;


export default function Form (){
    const[isMetric, setIsMetric] = useState(true);
    const calculation = useCalculationContext();
    const changeCalculation = useChangeCalculationContext();

    function handleMetricChoiceClick (clickedMetric){
        if (clickedMetric !== isMetric){
            setIsMetric((prevIsMetric) => !prevIsMetric);
        }
    }

    function calculateBMI (height, weight){
        if (height >= 0 && weight >= 0){
            let newBMI = height/(weight**2)
            if (!isMetric){
                newBMI = newBMI * 703;
            }
            changeCalculation(newBMI);
        }
    }

    return (
        <Main>
            <FormBox>
                <MetricChoiceContainer>
                    <MetricChoice chosen={isMetric ? true : false} onClick={() => handleMetricChoiceClick(true)}>Metric</MetricChoice>
                    <MetricChoice chosen={!isMetric ? true : false}onClick={() => handleMetricChoiceClick(false)}>Imperial</MetricChoice>
                </MetricChoiceContainer>
            </FormBox>
        </Main>
    )
}