/* tslint:disable */
import React, { useState } from "react";
import { Typography, InputLabel } from "@material-ui/core";
import { Handle, Range } from "rc-slider";
import { FieldRenderProps } from "react-final-form";

import "rc-slider/assets/index.css";
import { BottleIcon } from "../../Icons";
import { Field } from '../../../containers';

import { ValuesContainer, SliderContainer, trackStyle, handlerStyle, railStyle, LabelContainer } from "./style";

const handle = (props: any) => {
  const { dragging, index, ...other } = props;
  return (

      <Handle key={index} {...other}>
            <BottleIcon />
      </Handle>
  );
};

export interface ReactSliderProps extends FieldRenderProps {
  step: number;
  label?: string;
}

const CustomizedRange = ({ step, label, input: { value, onChange }}: ReactSliderProps) => {
  const [sliderValue, setSliderValue] = useState(value);

  const onSliderChange = (value: number[]) => {
    if (onChange) {
      onChange(value);
    }
    setSliderValue(value);
  };

  return (
    <SliderContainer>
      {label && (<LabelContainer>
        <InputLabel>{label}</InputLabel>
      </LabelContainer>)}
      <Range
        allowCross={false}
        trackStyle={[{ ...trackStyle }]}
        handleStyle={[{ ...handlerStyle }, { ...handlerStyle}]}
        railStyle={{ ...railStyle }}
        step={step}
        value={sliderValue}
        onChange={onSliderChange}
        handle={handle}
      />
      <ValuesContainer>
        <Typography variant={`h6`}>{sliderValue[0]}</Typography>
        <Typography variant={`h6`}>{sliderValue[1]}</Typography>
      </ValuesContainer>
    </SliderContainer>
  );
};

export default Field(CustomizedRange);
