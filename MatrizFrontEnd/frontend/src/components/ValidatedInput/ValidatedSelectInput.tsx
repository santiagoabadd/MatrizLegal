import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import { determineValidatedTextLabel } from "../../utils/DetermineStylesUtil";
import "./ValidatedInput.css";

interface ValidatedSelectInputProps {
    valid: boolean;
    name: string;
    label: string;
    options:string[];
   
    data?: string;
    attributes?: Record<string, string | number | boolean>;
  }

export const ValidatedSelectInput: React.FC<ValidatedSelectInputProps> = ({  
    data,
    valid,
    name,
    label,
   
    options,

}) => { 

    const [value, setValue] = useState<string>(data ? data : "");
    const [borderActive, setBorderActive] = useState<boolean>(false);
    const [labelActive, setLabelActive] = useState<boolean>(false);
    const [color, setColor] = useState<string>("gray");
  
    const focus = (): void => {
      setBorderActive(!borderActive);
  
      if (!value) {
        setLabelActive(!labelActive);
      }
    };
  
  
    useEffect(() => {
      if (value && !labelActive) {
        setLabelActive(true);
        console.log("ACTIVOOOO");
      }
  
      setColor(determineValidatedTextLabel(borderActive, valid));
    }, [value, borderActive, labelActive, color]);    




//const ValidatedSelectInput = () => {
  
    
//};

return (

    <div className="validated-input">
      <StyledInputBox active={borderActive} valid={valid}>
        <StyledInputLabel color={color} active={labelActive} valid={valid}>
          {label}
        </StyledInputLabel>
        <Select
            className="validated-input-value"
            name={name}
            onFocus={focus}
            onBlur={focus}
            options={options}
            isSearchable={false}
            placeholder="Select an option"
        />
  
        
      </StyledInputBox>
    </div>
);

};