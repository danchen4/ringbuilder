import React, { useState } from 'react';
// CSS
import classes from './SortDropDown.module.scss';
import { CSSTransition } from 'react-transition-group';
// Misc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SortDropDownProps {
  //** Array of strings for values*/
  values: string[];
  //** Default sort order label */
  defaultSortHeader: string;
  //** Handler callback to determine sort sortion */
  checked(e: any): void;
}

const SortDropDown: React.FC<SortDropDownProps> = ({ values, defaultSortHeader, checked }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [sortSelection, setSortSelection] = useState(defaultSortHeader);

  const clickHandler = (e: any, label: string) => {
    setSortSelection(label);
    checked(e);
  };

  return (
    <div className={classes.SortDropDown}>
      <div
        className={classes.SortDropDown__anchor}
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        <h3 className={classes.SortDropDown__header}>Sort: {sortSelection}</h3>
        <span>
          {showDropDown ? (
            <FontAwesomeIcon className={classes.icon_chevron} icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon className={classes.icon_chevron} icon={faChevronDown} />
          )}
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
          <div className={classes.SortDropDown__dropdown}>
            {values.map((value: string, index: number) => {
              return (
                <input
                  className={classes.SortDropDown__button}
                  key={value}
                  type="button"
                  value={value}
                  name={value}
                  onClick={(e: any) => clickHandler(e, value)}
                />
              );
            })}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default SortDropDown;
