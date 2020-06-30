import React, { useState } from 'react';
//CSS
import classes from './ToggleSort.module.scss';
//Misc.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface ToggleSortProps {
  label: string;
  clicked(e: any, sortDesc: boolean): void;
}

export const ToggleSort: React.FC<ToggleSortProps> = ({ label, clicked }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHander = (e: any, sortDesc: boolean) => {
    setToggle(!toggle);
    clicked(e, toggle);
  };

  return (
    <div className={classes.ToggleSort} onClick={(e) => toggleHander(e, toggle)}>
      <div className={classes.ToggleSort__label}>{label}</div>
      <FontAwesomeIcon
        className={classes.icon_chevron}
        icon={toggle ? faChevronUp : faChevronDown}
      />
    </div>
  );
};

export default ToggleSort;
