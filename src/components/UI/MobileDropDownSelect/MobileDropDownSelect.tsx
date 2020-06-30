import React from 'react';
// CSS
import classes from './MobileDropDownSelect.module.scss';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
// Misc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface MobileDropDownSelectProps {
  //** Header for the button group */
  header: string;
  //** Array of strings for values*/
  values: string[];
  //** button that was clicked to determine which button to outline */
  selected: string;
  //** name to use to toggle open close of dropdown*/
  name?: string;
  //** boolean to determine if dropdown should be shown*/
  dropdown?: boolean;
  //** Handler callback to determine checkbox selection */
  checked(e: any): void;
  //** Handler callback to whether to toggle dropdown  */
  toggle(name: any): void;
}

export const MobileDropDownSelect: React.FC<MobileDropDownSelectProps> = ({
  header,
  values,
  selected,
  name,
  dropdown,
  checked,
  toggle,
}) => {
  return (
    <div className={classes.MobileDropDownSelect}>
      <div
        className={cn(classes.MobileDropDownSelect__anchor, {
          [classes.MobileDropDownSelect__anchor_mobile]: dropdown,
        })}
      >
        <h3 className={classes.MobileDropDownSelect__header}>{header}</h3>
        <FontAwesomeIcon
          className={classes.MobileDropDownSelect__icon}
          icon={dropdown ? faMinus : faPlus}
          onClick={() => toggle(name)}
        />
      </div>
      <CSSTransition
        in={dropdown}
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
                name={name}
                onClick={checked}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};
