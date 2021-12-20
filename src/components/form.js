import React, {useEffect, useState} from "react";
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
    display: ${({showWarning}) => showWarning ? "flex" : "none"};
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
    const[invalidInput, setInvalidInput] = useState(null);
    const[height, setHeight] = useState("initial value");
    const[weight, setWeight] = useState("initial value");

    const calculation = useCalculationContext();
    const changeCalculation = useChangeCalculationContext();

    useEffect(() => {
        console.log("Bruh")
        calculateBMI();
    }, [height, weight])

    function handleMetricChoiceClick (clickedMetric){
        if (clickedMetric !== isMetric){
            setIsMetric((prevIsMetric) => !prevIsMetric);
        }
    }

    function checkIfNatural (number){
        if (number === "initial value"){
            return "initial value"
        }
        if (parseFloat(number) === NaN){
            console.log(parseFloat(number))
            return "not a number";
        }

        if (number <= 0){
            return "not natural number";
        }

        return "yes";
    }

    function checkInputValidity () {
        if (checkIfNatural(height) === "yes" && checkIfNatural(weight) === "yes"){
            return true;
        } else {
            return false;
        }
    }

    function calculateBMI (){
        // console.log(checkInputValidity());
        if (checkInputValidity()){
            let newBMI = height/(weight**2)
            if (!isMetric){
                newBMI = newBMI * 703;
            }
            console.log(newBMI);
            changeCalculation(newBMI);
        }
    }

    function showWarning (){
        if(checkIfNatural(height) !== "yes" && checkIfNatural(height) !== "initial value"){
            return true;
        }
        
        if(checkIfNatural(weight) !== "yes" && checkIfNatural(weight) !== "initial value"){
            return true;
        }

        return false;
    }

    function warningText (){
        return ""
    }

    return (
        <Main>
            <FormBox>
                <FormInput isMetric={isMetric} whatData="Weight" setExternalValue={setWeight} />
                <FormInput isMetric={isMetric} whatData="Height" setExternalValue={setHeight} />
                <MetricChoiceContainer>
                    <MetricChoice chosen={isMetric ? true : false} onClick={() => handleMetricChoiceClick(true)}>Metric</MetricChoice>
                    <MetricChoice chosen={!isMetric ? true : false}onClick={() => handleMetricChoiceClick(false)}>Imperial</MetricChoice>
                </MetricChoiceContainer>
                <Warning showWarning={showWarning()}>
                    <p>{warningText()}</p>
                </Warning>
            </FormBox>
        </Main>
    )
}