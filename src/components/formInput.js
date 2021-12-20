import React from "react";
import styled from "styled-components";

const Main = styled.div`
    display: flex;
    justify-content: center;
`;

function StatefulInput(){
    const[value, setValue] = useState(null);

    function onChange(e){
        console.log(e.target.value);
        setValue(e.target.value);
    }

    return (
        value,
        onChange
    )
}

export default function FormInput ({isMetric, whatData}){
    const inputProps = StatefulInput();

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
    
    return (
        <Main>
            <label for={whatData}>{whatData}</label>
            <input id={whatData} type="number" name={whatData} {...inputProps} />
        </Main>
    )
}