import React, {useState} from "react";
import styled from "styled-components";

import { VanillaButton } from "../GlobalComponent";
import FormInput from "./formInput";

import { useCalculationContext, useChangeCalculationContext } from "./body";

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const FormBox = styled.div`
    align-items: start;
    background-color: #4d4d4d;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    padding: 10px 20px;
`;

const Warning = styled.div`
    display: ${({inputInvalid}) => inputInvalid ? "flex" : "none"};
    & > p {
        color: red;
    }
`;

const MetricChoiceContainer = styled.div`
    align-self: center;
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const MetricChoice = styled(VanillaButton)`
    align-self: center;
    background-color: rgba(0, 0, 0, 0);
    color: ${({chosen}) => chosen ? "white" : "rgba(255, 255, 255, 0.4)"};
    border-radius: 5px; 
`;


export default function Form (){
    const[isMetric, setIsMetric] = useState(true);
    const[heightValidity, setHeightValidity] = useState("");
    const[weightValidity, setWeightValidity] = useState("");
    const[invalidInput, setInvalidInput] = useState(null);

    const calculation = useCalculationContext();
    const changeCalculation = useChangeCalculationContext();

    function handleMetricChoiceClick (clickedMetric){
        if (clickedMetric !== isMetric){
            setIsMetric((prevIsMetric) => !prevIsMetric);
        }
    }

    function checkIfNatural (number){
        if (isNaN(number)){
            return "not a number";
        }

        if (number <= 0){
            return "not natural number";
        }

        return "yes";
    }

    function checkInputValidity (height, weight) {
        setHeightValidity(checkIfNatural(height));
        setWeightValidity(checkIfNatural(weight));
        if (checkIfNatural(height) === "yes" && checkIfNatural(weight) === "yes"){
            return true;
        } else {
            return false;
        }
    }

    function calculateBMI (height, weight){
        if (checkInputValidity(height, weight)){
            let newBMI = height/(weight**2)
            if (!isMetric){
                newBMI = newBMI * 703;
            }
            changeCalculation(newBMI);
        }
    }

    function isCurrentInputInvalid (){
        if ((heightValidity !== "yes" && heightValidity !== "") || (weightValidity !== "yes" && weightValidity !== "")) {
            return true;  
        } else {
            return false;
        }
    }

    function warningText (){
        return ""
    }

    return (
        <Main>
            <FormBox>
                <FormInput isMetric={isMetric} whatData="Weight" />
                <FormInput isMetric={isMetric} whatData="Height" />
                <MetricChoiceContainer>
                    <MetricChoice chosen={isMetric ? true : false} onClick={() => handleMetricChoiceClick(true)}>Metric</MetricChoice>
                    <MetricChoice chosen={!isMetric ? true : false}onClick={() => handleMetricChoiceClick(false)}>Imperial</MetricChoice>
                </MetricChoiceContainer>
                <Warning inputInvalid={isCurrentInputInvalid()}>
                    <p>{warningText()}</p>
                </Warning>
            </FormBox>
        </Main>
    )
}