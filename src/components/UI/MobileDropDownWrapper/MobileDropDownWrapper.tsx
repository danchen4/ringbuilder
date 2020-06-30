import React from 'react';
// CSS
import classes from './MobileDropDownWrapper.module.scss';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
// Misc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface MobileDropDownWrapperProps {
  //** Header for the button group */
  header: string;
  //** Array of strings for values*/
  name: string;
  //** boolean to determine if dropdown should be shown*/
  dropdown?: boolean;
  //** Handler callback to whether to toggle dropdown  */
  toggle(name: any): void;
}

export const MobileDropDownWrapper: React.FC<MobileDropDownWrapperProps> = ({
  header,
  name,
  dropdown,
  children,
  toggle,
}) => {
  return (
    <div className={classes.MobileDropDownWrapper}>
      <div
        className={cn(classes.MobileDropDownWrapper__anchor, {
          [classes.MobileDropDownWrapper__anchor_mobile]: dropdown,
        })}
      >
        <h3 className={classes.MobileDropDownWrapper__header}>{header}</h3>
        <FontAwesomeIcon
          className={classes.MobileDropDownWrapper__icon}
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
        <div className={classes.MobileDropDownWrapper__dropdown}>{children}</div>
      </CSSTransition>
    </div>
  );
};
