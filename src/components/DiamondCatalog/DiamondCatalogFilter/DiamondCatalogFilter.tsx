import React, {useState, useEffect } from 'react'
import axios from 'axios'
// CSS
import classes from './DiamondCatalogFilter.module.scss'
// Components
import CheckboxGroup from '../../UI/CheckboxGroup/CheckboxGroup'
import DiscreteRangeSlider from '../../UI/DiscreteRangeSlider/DiscreteRangeSlider'
import RangeSlider from '../../UI/RangeSlider/RangeSlider'
// Misc.
import { diamondDataToTableArray } from '../../../helper';

const colorMarks = [
  { value: 10, label: 'D' },
  { value: 20, label: 'E' },
  { value: 30, label: 'F' },
  { value: 40, label: 'G' },
  { value: 50, label: 'H' }
]

const colorRange = {
  10: 'D',
  20: 'E',
  30: 'F',
  40: 'G',
  50: 'H',
}

const clarityMarks = [
  { value: 10, label: 'VS1' },
  { value: 20, label: 'VS2' },
  { value: 30, label: 'SI1' },
  { value: 40, label: 'SI2' },
]

const clarityRange = {
  10: 'VS1',
  20: 'VS2',
  30: 'SI1',
  40: 'SI2',
}

interface FilterNumRange {
  min: number,
  max: number,
}

interface DiamondCatalogFilterProps {
  /** Handler callback function for filtering diamond shape */
  filterPrice(filterMinMax: { [key: string]: number }): void;
  /** Handler callback function for filtering diamond shape */
  filterShape(filterMinMax: { [key: string]: string }): void;
  /** Handler callback function for filtering diamond color*/
  filterColor(filterMinMax: {[key: string]: string}): void;
  /** Handler callback function for filtering diamond clarity*/
  filterClarity(filterMinMax: {[key: string]: string }): void;
}

export const DiamondCatalogFilter: React.FC<DiamondCatalogFilterProps> = React.memo(({ filterPrice, filterShape, filterColor, filterClarity }) => {
  const [priceRange, setPriceRange] = useState<FilterNumRange>({ min: 0, max: 99999 });

  useEffect(() => {
    (async function () {
      const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
      const queryMinCost = `?orderBy="cost"&limitToFirst=1`;
      const queryMaxCost = `?orderBy="cost"&limitToLast=1`;

      const [responseMin, responseMax] = await Promise.all([axios.get(url + queryMinCost), axios.get(url + queryMaxCost)])
      const [minCostDiamond, maxCostDiamond] = await Promise.all([responseMin.data, responseMax.data]);

      const minPrice = diamondDataToTableArray(minCostDiamond)[0].price;
      const maxPrice = diamondDataToTableArray(maxCostDiamond)[0].price;

      setPriceRange({
        min: minPrice,
        max: maxPrice,
      });
    })()
  }, [])

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
        <h4>Price: </h4>
        <RangeSlider
          min={priceRange.min}
          max={priceRange.max}
          inputs
          changed={filterPrice}
        />
      </div>
      <div className={classes.filterGroup}>
        <h4>Color: </h4>
        <DiscreteRangeSlider
          min={10}
          max={50}
          marks={colorMarks}
          range={colorRange}
          changed={filterColor}
        />
      </div>
      <div className={classes.filterGroup}>
        <h4>Clarity: </h4>
        <DiscreteRangeSlider
          min={10}
          max={40}
          marks={clarityMarks}
          range={clarityRange}
          changed={filterClarity}
        />
      </div>
    </div>);
})

export default DiamondCatalogFilter