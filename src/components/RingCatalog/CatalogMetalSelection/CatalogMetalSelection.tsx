import React from 'react';
// CSS
import cn from 'classnames';
import classes from './CatalogMetalSelection.module.scss';
// Misc.
import { METAL } from '../../../constants/rings';
import { Spacer } from '../../StyledUI/Spacer';
import { Attribute } from '../../StyledUI/Attribute';

interface CatalogMetalSelectionProps {
  /** An string to indicate the selected metal */
  selectedMetal: string;
  /** An array of ring metal options */
  metals: string[];
  /** A click handler function to determine which metal was clicked */
  metalChange(metal: string): void;
}

export const CatalogMetalSelection: React.FC<CatalogMetalSelectionProps> = ({
  selectedMetal,
  metals,
  metalChange,
}) => {
  return (
    <div className={classes.MetalSelection}>
      {metals.map((metal: string) => {
        return (
          <div
            key={metal}
            className={cn(classes.MetalSelection__options, {
              [classes.MetalSelection__options_selected]: metal === selectedMetal,
              [classes.wg]: metal === METAL.WHITE,
              [classes.yg]: metal === METAL.YELLOW,
              [classes.rg]: metal === METAL.ROSE,
            })}
            onClick={() => metalChange(metal)}
          />
        );
      })}
      <Spacer mTop={1} mBot={0.1}>
        <Attribute fontSize={1.3}>{selectedMetal}</Attribute>
      </Spacer>
    </div>
  );
};
