import React from 'react';
import classes from './FilterBar.module.scss';
import { RING_ATTRIBUTES, RING_PRICE_SORT } from '../../../constants/rings';
import Select from '../../UI/Select/Select';
import RadioGroup from '../../UI/RadioGroup/RadioGroup';

interface FilterBarProps {
  checkedStyle(e: any): void;
  checkedShape(e: any): void;
  selectSort(e: any): void;
}

const optionValues = [
  { value: RING_PRICE_SORT.LOWTOHIGH, label: 'Price - low to high' },
  { value: RING_PRICE_SORT.HIGHTOLOW, label: 'Price - high to low' },
];

const FilterBar: React.FC<FilterBarProps> = ({ checkedStyle, checkedShape, selectSort }) => {
  return (
    <div className={classes.FilterBar}>
      <div className={classes.filterGroup}>
        <RadioGroup
          header="Ring Style"
          name={RING_ATTRIBUTES.STYLE}
          values={['All', 'Halo', 'Pave', 'Solitaire']}
          checked={checkedStyle}
        />
      </div>
      <div className={classes.filterGroup}>
        <RadioGroup
          header="Center Stone Shape"
          name={RING_ATTRIBUTES.CENTER}
          values={['All', 'Round', 'Oval']}
          checked={checkedShape}
        />
      </div>
      <div className={classes.filterGroup}>
        <Select header="Sort By" name="priceSort" values={optionValues} selected={selectSort} />
      </div>
    </div>
  );
};

export default FilterBar;
