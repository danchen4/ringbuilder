import React, { useState } from 'react';
// CSS
import classes from './SelectDropDown.module.scss';
// Misc
import { RING_PRICE_SORT_LABEL } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Labels {
  value: string;
  label: string;
}

interface SelectDropDownProps {
  //** Header for the select group */
  header?: string;
  //** Array of strings for values*/
  values: Labels[];
  //** Name property of select to group by */
  name?: string;
  //** select that was selected */
  selected?: string;
  //** Handler callback to determine select selection */
  checked(value: any): void;
}

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  header,
  values,
  name,
  selected,
  checked,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectionHeader, setSelectionHeader] = useState(RING_PRICE_SORT_LABEL.LOWTOHIGH);

  const clickHandler = (e: any, value: any) => {
    const target = e.target;
    console.log(value);
    setSelectionHeader(target.innerHTML);
    checked(value);
  };

  let selections = null;
  if (showDropDown) {
    selections = (
      <div className={classes.select_group}>
        {values.map((value: Labels, index: number) => {
          return (
            <div
              className={classes.select}
              key={value.value}
              onClick={(e) => clickHandler(e, value.value)}
            >
              {value.label}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.SelectDropDown}>
      <div
        className={classes.select_dropdown}
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        <h3 className={classes.select_header}>
          Sort: {selectionHeader}
          <span>
            {showDropDown ? (
              <FontAwesomeIcon className={classes.icon_chevron} icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon className={classes.icon_chevron} icon={faChevronDown} />
            )}
          </span>
        </h3>
        {showDropDown && selections}
      </div>
    </div>
  );
};

export default SelectDropDown;
