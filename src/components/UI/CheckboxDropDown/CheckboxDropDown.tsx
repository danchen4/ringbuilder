import React, { useState } from 'react';
// CSS
import classes from './CheckboxDropDown.module.scss';
import cn from 'classnames';
// Misc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface CheckboxDropDownProps {
  //** Header for the checkbox group */
  header: string;
  //** Array of strings for values*/
  values: string[];
  //** Name property of checkbox to group by */
  name: string;
  //** checkbox that was selected */
  selected: string;
  //** Handler callback to determine checkbox selection */
  checked(e: any): void;
}

const CheckboxDropDown: React.FC<CheckboxDropDownProps> = ({
  header,
  values,
  name,
  selected,
  checked,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  let checkboxes = null;
  if (showDropDown) {
    checkboxes = (
      <div className={classes.checkbox_group}>
        {values.map((value: string, index: number) => {
          return (
            <div className={classes.checkbox} key={value}>
              <input
                type="checkbox"
                name={name}
                value={value}
                onChange={checked}
                checked={value === selected}
              />
              <label className={classes.checkbox_label}>{value}</label>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.CheckboxDropDown}>
      <div
        className={classes.checkbox_dropdown}
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        <h3 className={classes.checkbox_header}>
          {header}
          <span>
            {showDropDown ? (
              <FontAwesomeIcon className={classes.icon_chevron} icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon className={classes.icon_chevron} icon={faChevronDown} />
            )}
          </span>
        </h3>
        {showDropDown && checkboxes}
      </div>
    </div>
  );
};

export default CheckboxDropDown;
