import React, { useState, useEffect } from 'react'
// CSS
import classes from './DiscreteRangeSlider.module.scss'
// Components
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface Marks {
  value: number;
  label: string;
}

interface SliderProps {
  /** minimum value of slider */
  min: number;
  /** maximum value of slider */
  max: number;
  /** Marks indicate predetermined values to which the user can move the slider.  Requires an array of objects with value and label key */
  marks?: Marks[];

  range: {[key: string]: string};
/** Handler callback function for filtering diamond color*/
  changed(colorRange:any): void
}

export const DiscreteRangeSlider: React.FC<SliderProps> = ({ min, max, marks, range, changed }) => {
  const [value, setValue] = React.useState<number[]>([min, max]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Due to the ability to overlap the endpoints in the slider, need to get the lowest and highest value of the range
      const valueSorted = value;
      valueSorted.sort();
      const colorRange = {
        minColor: range[valueSorted[0]],
        maxColor: range[valueSorted[1]],
      }
      changed(colorRange)
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [changed, range, value]);

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleChange = (event: any, newValue: number | number[]) => {
    const values = newValue as number[];
    setValue(values);
  };

  return (
    <div className={classes.DiscreteRangeSlider}>
      <Slider
        aria-labelledby="range-slider"
        // valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        // defaultValue={30}
        onChange={handleChange}
        value={value}
        step={null}
        marks={marks}
        min={min}
        max={max}
      />
    </div>
  );
}

export default DiscreteRangeSlider