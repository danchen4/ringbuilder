import React, { useState } from 'react';
// CSS
import classes from './RingCatalogFilter.module.scss';
//MISC
import { RING_ATTRIBUTES, RING_PRICE_SORT, RING_PRICE_SORT_LABEL } from '../../../constants';
// Components
import Select from '../../UI/Select/Select';
import CheckboxDropDown from '../../UI/CheckboxDropDown/CheckboxDropDown';
import SelectDropDown from '../../UI/SelectDropDown/SelectDropDown';

interface RingCatalogFilterProps {
  /** Handler callback function for filtering ring style*/
  filterStyle(e: any): void;
  /** Handler callback function for filtering ring center stone shape*/
  filterShape(e: any): void;
  /** Handler callback function for price sort*/
  selectSort(value: any): void;
  /** Value of ring style radio button selected*/
  ringStyleSelected: string;

  ringShapeSelected: string;
}

const priceSortValues = [
  { value: RING_PRICE_SORT.LOWTOHIGH, label: RING_PRICE_SORT_LABEL.LOWTOHIGH },
  { value: RING_PRICE_SORT.HIGHTOLOW, label: RING_PRICE_SORT_LABEL.HIGHTOLOW },
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
      <div className={classes.filter_group}>
        <div className={classes.filter}>
          <CheckboxDropDown
            header="Ring Style"
            name={RING_ATTRIBUTES.STYLE}
            values={['All', 'Halo', 'Pave', 'Solitaire']}
            checked={filterStyle}
            selected={ringStyleSelected}
          />
        </div>
        <div className={classes.filter}>
          <CheckboxDropDown
            header="Center Stone Shape"
            name={RING_ATTRIBUTES.CENTER}
            values={['All', 'Round', 'Oval']}
            checked={filterShape}
            selected={ringShapeSelected}
          />
        </div>
      </div>
      <div className={classes.sort_group}>
        <div className={classes.filter}>
          <SelectDropDown values={priceSortValues} checked={selectSort} />
          {/* <Select header="Sort By" name="priceSort" values={optionValues} selected={selectSort} /> */}
        </div>
      </div>
    </div>
  );
};

export default RingCatalogFilter;
