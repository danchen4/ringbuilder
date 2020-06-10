import React from 'react';
import classes from './RingCatalogFilter.module.scss';
import { RING_ATTRIBUTES, RING_PRICE_SORT } from '../../../constants/rings';
import Select from '../../UI/Select/Select';
import RadioGroup from '../../UI/RadioGroup/RadioGroup';

interface RingCatalogFilterProps {
  /** Handler callback function for filtering ring style*/

  filterStyle(e: any): void;
  /** Handler callback function for filtering ring center stone shape*/
  filterShape(e: any): void;
  /** Handler callback function for price sort*/
  selectSort(e: any): void;
  /** Value of ring style radio button selected*/
  ringStyleSelected: string;

  ringShapeSelected: string;
}

const optionValues = [
  { value: RING_PRICE_SORT.LOWTOHIGH, label: 'Price - low to high' },
  { value: RING_PRICE_SORT.HIGHTOLOW, label: 'Price - high to low' },
];

const RingCatalogFilter: React.FC<RingCatalogFilterProps> = ({
  filterStyle,
  filterShape,
  selectSort,
  ringStyleSelected,
  ringShapeSelected,
}) => {
  return (
    <div className={classes.FilterBar}>
      <div className={classes.filterGroup}>
        <RadioGroup
          header="Ring Style"
          name={RING_ATTRIBUTES.STYLE}
          values={['All', 'Halo', 'Pave', 'Solitaire']}
          checked={filterStyle}
          selected={ringStyleSelected}
        />
      </div>
      <div className={classes.filterGroup}>
        <RadioGroup
          header="Center Stone Shape"
          name={RING_ATTRIBUTES.CENTER}
          values={['All', 'Round', 'Oval']}
          checked={filterShape}
          selected={ringShapeSelected}
        />
      </div>
      <div className={classes.filterGroup}>
        <Select header="Sort By" name="priceSort" values={optionValues} selected={selectSort} />
      </div>
    </div>
  );
};

export default RingCatalogFilter;
