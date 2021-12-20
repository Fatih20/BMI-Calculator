import React, {useState} from "react";
import styled from "styled-components";

const Main = styled.div`
    align-items: center;
    display: flex;
    gap: 5px;

    & p {
        color: white;
    }
`;

const StyledInput = styled.input`
    height: 100%;

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{
        appearance: none;
        margin: 0;
    }
`;

function StatefulInput(setExternalValue){
    const[value, setValue] = useState("");

    function onChange(e){
        console.log(e);
        setExternalValue(e.target.value);
        setValue(e.target.value);
        console.log(e.target.value);
    }

    return ({
        value,
        onChange
    })
}

export default function FormInput ({isMetric, whatData, setExternalValue}){
    const inputProps = StatefulInput(setExternalValue);

    const unitConverter = {
        "true" : {
            "Height" : "cm",
            "Weight" : "kg",
        }, 
        "false" : {
            "Height" : "in",
            "Weight" : "lbs",
        }
    }

    function onlyNumberKey(evt) {
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode < 58 && ASCIICode > 47){
            return false;
        }
        return true;
    }
    
    return (
        <Main>
            <p>{whatData}</p>
            <StyledInput id={whatData} type="number" name={whatData} {...inputProps} />
            <p>{unitConverter[isMetric.toString()][whatData]}</p>
        </Main>
    )
}