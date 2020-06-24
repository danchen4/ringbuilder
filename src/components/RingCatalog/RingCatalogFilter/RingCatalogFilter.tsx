import React from 'react';
// CSS
import classes from './RingCatalogFilter.module.scss';
import cn from 'classnames';
//MISC
import { RING_ATTRIBUTES, RING_PRICE_SORT_LABEL } from '../../../constants';
// Components
import CheckboxDropDown from '../../UI/CheckboxDropDown/CheckboxDropDown';
import SortDropDown from '../../UI/SortDropDown/SortDropDown';
import MobileDropDownSelect from '../../UI/MobileDropDownSelect/MobileDropDownSelect';

interface RingCatalogFilterProps {
  /** Handler callback function for filtering ring style*/
  filterStyle(e: any): void;
  /** Handler callback function for filtering ring center stone shape*/
  filterShape(e: any): void;
  /** Handler callback function for price sort*/
  selectSort(e: any): void;
  /** Value of ring style selected*/
  ringStyleSelected: string;
  /** Value of ring center shape selected*/
  ringShapeSelected: string;
}

const priceSortValues = [RING_PRICE_SORT_LABEL.LOWTOHIGH, RING_PRICE_SORT_LABEL.HIGHTOLOW];

const RingCatalogFilter: React.FC<RingCatalogFilterProps> = ({
  filterStyle,
  filterShape,
  selectSort,
  ringStyleSelected,
  ringShapeSelected,
}) => {
  let desktopOutput = (
    <div className={classes.FilterBar_desktop}>
      <div className={cn(classes.FilterBar__filter, classes.FilterBar__filter_left)}>
        <CheckboxDropDown
          header="Style"
          name={RING_ATTRIBUTES.STYLE}
          values={['All', 'Halo', 'Pave', 'Solitaire']}
          checked={filterStyle}
          selected={ringStyleSelected}
        />
      </div>
      <div className={cn(classes.FilterBar__filter, classes.FilterBar__filter_left)}>
        <CheckboxDropDown
          header="Diamond Shape"
          name={RING_ATTRIBUTES.CENTER}
          values={['All', 'Round', 'Oval']}
          checked={filterShape}
          selected={ringShapeSelected}
        />
      </div>
      <div className={cn(classes.FilterBar__filter, classes.FilterBar__filter_right)}>
        <SortDropDown
          values={priceSortValues}
          checked={selectSort}
          defaultSortHeader={RING_PRICE_SORT_LABEL.LOWTOHIGH}
        />
      </div>
    </div>
  );

  let mobileOutput = (
    <div className={classes.FilterBar_mobile}>
      <div className={cn(classes.FilterBar__filter)}>
        <MobileDropDownSelect
          header="Style"
          values={['All', 'Halo', 'Pave', 'Solitaire']}
          checked={filterStyle}
          selected={ringStyleSelected}
        />
      </div>
      <div className={cn(classes.FilterBar__filter)}>
        <MobileDropDownSelect
          header="Diamond Shape"
          values={['All', 'Round', 'Oval']}
          checked={filterShape}
          selected={ringShapeSelected}
        />
      </div>
      <div className={cn(classes.FilterBar__filter)}>
        <MobileDropDownSelect
          header="Sort"
          values={priceSortValues}
          checked={selectSort}
          selected={ringShapeSelected}
        />
      </div>
    </div>
  );

  return (
    <div className={classes.FilterBar}>
      {desktopOutput}
      {mobileOutput}
    </div>
  );
};

export default RingCatalogFilter;
