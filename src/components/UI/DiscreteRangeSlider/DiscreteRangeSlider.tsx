import React, { useState, useEffect } from 'react';
// CSS
import classes from './DiscreteRangeSlider.module.scss';
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
  marks: Marks[];
  /** Object with key value pairs of mark values and filter values*/
  range: { [key: string]: string };
  /** Handler callback function for filtering data*/
  changed(filterMinMax: any): void;
}

export const DiscreteRangeSlider: React.FC<SliderProps> = React.memo(
  ({ min, max, marks, range, changed }) => {
    const [value, setValue] = React.useState<number[]>([min, max]);

    useEffect(() => {
      const timer = setTimeout(() => {
        // Due to the ability to overlap the endpoints in the slider, need to get the lowest and highest value of the range
        const valueSorted = value;
        valueSorted.sort();
        const sortedRange = {
          min: range[valueSorted[0]],
          max: range[valueSorted[1]],
        };
        changed(sortedRange);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }, [changed, range, value]);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
      const values = newValue as number[];
      setValue(values);
    };

    return (
      <div className={classes.DiscreteRangeSlider}>
        <Slider
          aria-labelledby="range-slider"
          onChange={handleSliderChange}
          value={value}
          step={null}
          marks={marks}
          min={min}
          max={max}
        />
      </div>
    );
  }
);
