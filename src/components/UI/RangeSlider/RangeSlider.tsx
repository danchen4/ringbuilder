import React, { useState, useEffect } from 'react'
// CSS
import classes from './RangeSlider.module.scss'
// Components
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
// Misc
import { formatCurrency } from '../../../helper';

interface RangeSliderProps {
  /** minimum value of slider */
  min: number;
  /** maximum value of slider */
  max: number;
  /**If true, allows text inputs for min and max values  */
  inputs?: boolean;
  /** Handler callback function for filtering data*/
  changed(filterMinMax: any): void
}



export const RangeSlider: React.FC<RangeSliderProps> = React.memo(({min, max, inputs = false, changed}) => {
  const [value, setValue] = React.useState<number[]>([min, max]);


  useEffect(() => {
    const timer = setTimeout(() => {
      // Due to the ability to overlap the endpoints in the slider, need to get the lowest and highest value of the range
      const valueSorted = [...value];
      const min = Math.min(...valueSorted);
      const max = Math.max(...valueSorted);
      const sortedRange = {
        min: min,
        max: max,
      }
      changed(sortedRange)
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [changed, value]);

  useEffect(() => {
    setValue([min, max])
  }, [min, max])

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const values = newValue as number[];
    setValue(values);
  };

  const inputChangeHandler = (e:any) => {
    // let target = e.target;
    // if (target.name === 'min') {
    //   setValue([target.value, value[1]])
    // } else {
    //   setValue([value[0], target.value])
    // }
  }

  let rangeInputs = null;
  if (inputs) {
    rangeInputs = (
      <div className={classes.rangeInputs}>
        <input
          className={classes.input}
          type="text"
          name="min"
          value={formatCurrency(value[0])}
          onChange={inputChangeHandler}
        />
        <input
          className={classes.input}
          type="text"
          name="max"
          value={formatCurrency(value[1])}
          onChange={inputChangeHandler}
        />
      </div>
    )
  }

  return (
    <div className={classes.DiscreteRangeSlider}>
      <Slider
        aria-labelledby="range-slider"
        onChange={handleSliderChange}
        value={value}
        min={min}
        max={max}
      />
      {rangeInputs}
    </div>
  );
})

export default RangeSlider