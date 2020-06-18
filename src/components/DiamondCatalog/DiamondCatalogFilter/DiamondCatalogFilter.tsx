import React from 'react'
// CSS
import classes from './DiamondCatalogFilter.module.scss'
// Components
import CheckboxGroup from '../../UI/CheckboxGroup/CheckboxGroup'
import DiscreteRangeSlider from '../../UI/DiscreteRangeSlider/DiscreteRangeSlider'

const marks = [
  { value: 10, label: 'D' },
  { value: 20, label: 'E' },
  { value: 30, label: 'F' },
  { value: 40, label: 'G' },
  { value: 50, label: 'H' }
]

const range = {
  10: 'D',
  20: 'E',
  30: 'F',
  40: 'G',
  50: 'H',
}

interface DiamondCatalogFilterProps {
  /** Handler callback function for filtering diamond shape */
  filterShape(filters: any): void;
  /** Handler callback function for filtering diamond color*/
  filterColor(colorRange: any): void;
}

export const DiamondCatalogFilter: React.FC<DiamondCatalogFilterProps> = ({ filterShape, filterColor }) => {
  return (
    <div className={classes.DiamondCatalogFilter}>
      <div className={classes.filterGroup}>
        <CheckboxGroup
          header='Shape'
          values={['Round', 'Oval']}
          checked={filterShape}
        />
      </div>
      <div className={classes.filterGroup}>
        <h4>Color: </h4>
        <DiscreteRangeSlider
          min={10}
          max={50}
          marks={marks}
          range={range}
          changed={filterColor}
        />
      </div>
    </div>);
}

export default DiamondCatalogFilter