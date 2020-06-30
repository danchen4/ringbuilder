import React, { useState } from 'react';
// CSS
import classes from './CheckboxDropDown.module.scss';
import { CSSTransition } from 'react-transition-group';
// Misc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className={classes.CheckboxDropDown}>
      <div
        className={classes.CheckboxDropDown__anchor}
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        <h3 className={classes.CheckboxDropDown__header}>{header}</h3>
        <span>
          <FontAwesomeIcon
            className={classes.icon_chevron}
            icon={showDropDown ? faChevronUp : faChevronDown}
          />
        </span>
        <CSSTransition
          in={showDropDown}
          timeout={100}
          mountOnEnter
          unmountOnExit
          classNames={{
            enter: classes.fadeEnter,
            enterActive: classes.fadeEnterActive,
            exitActive: classes.fadeExit,
            exit: classes.fadeExitActive,
          }}
        >
          <div className={classes.CheckboxDropDown__dropdown}>
            {values.map((value: string, index: number) => {
              return (
                <div className={classes.CheckboxDropDown__checkbox} key={value}>
                  <input
                    type="checkbox"
                    name={name}
                    value={value}
                    onChange={checked}
                    checked={value === selected}
                  />
                  <label className={classes.CheckboxDropDown__checkbox_label}>{value}</label>
                </div>
              );
            })}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default CheckboxDropDown;
