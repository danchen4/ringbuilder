import React from 'react';
import cn from 'classnames';
import classes from './CatalogMetalSelection.module.scss';
import { METAL } from '../../../constants/rings';

interface CatalogMetalSelectionProps {
  /** An string to indicate the selected metal */
  selectedMetal: string;
  /** An array of ring metal options */
  metals: string[];
  /** A click handler function to determine which metal was clicked */
  metalChange(metal: string): void;
}

const CatalogMetalSelection: React.FC<CatalogMetalSelectionProps> = ({
  selectedMetal,
  metals,
  metalChange,
}) => {
  return (
    <div className={classes.metalSelection}>
      {metals.map((metal: string) => {
        return (
          <div
            key={metal}
            className={cn({
              [classes.circle]: true,
              [classes.circle_selected]: metal === selectedMetal,
              [classes.wg]: metal === METAL.WHITE,
              [classes.yg]: metal === METAL.YELLOW,
              [classes.rg]: metal === METAL.ROSE,
            })}
            onClick={() => metalChange(metal)}
          />
        );
      })}
      <div className={classes.metalName}>{selectedMetal}</div>
    </div>
  );
};

export default CatalogMetalSelection;
