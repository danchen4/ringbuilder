import React, { useState } from 'react';
// CSS
import classes from './MobileDropDownSelect.module.scss';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
// Misc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface MobileDropDownSelectProps {
  //** Header for the checkbox group */
  header: string;
  //** Array of strings for values*/
  values: string[];
  //** Name property of checkbox to group by */
  name?: string;
  //** checkbox that was selected */
  selected: string;
  //** Handler callback to determine checkbox selection */
  checked(e: any): void;
  //** Handler for toggling dropdown on mobile screens */
}

const MobileDropDownSelect: React.FC<MobileDropDownSelectProps> = ({
  header,
  values,
  name,
  selected,
  checked,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className={classes.MobileDropDownSelect}>
      <div
        className={cn(classes.MobileDropDownSelect__anchor, {
          [classes.MobileDropDownSelect__anchor_mobile]: showDropDown,
        })}
      >
        <h3 className={classes.MobileDropDownSelect__header}>{header}</h3>
        {showDropDown ? (
          <FontAwesomeIcon
            className={classes.MobileDropDownSelect__icon_plus}
            icon={faMinus}
            onClick={toggleDropDownHandler}
          />
        ) : (
          <FontAwesomeIcon
            className={classes.MobileDropDownSelect__icon}
            icon={faPlus}
            onClick={toggleDropDownHandler}
          />
        )}
      </div>
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
        <div className={classes.MobileDropDownSelect__dropdown}>
          {values.map((value: string, index: number) => {
            return (
              <input
                className={cn(classes.MobileDropDownSelect__button, {
                  [classes.MobileDropDownSelect__button_selected]: selected === value,
                })}
                key={value}
                type="button"
                value={value}
                onClick={checked}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default MobileDropDownSelect;
