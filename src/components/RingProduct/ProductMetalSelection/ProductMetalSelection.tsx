import React from 'react';
// CSS
import cn from 'classnames';
import classes from './ProductMetalSelection.module.scss';
// Components
import { Label } from '../../StyledUI/Label';
import { Attribute } from '../../StyledUI/Attribute';
import { Spacer } from '../../StyledUI/Spacer';
// Misc
import { METAL, METAL_SHORTNAME } from '../../../constants';

interface ProductMetalSelectionProps {
  /** A   string to indicate the selected metal */
  selectedMetal: string;
  /** An array of ring metal options */
  metals: string[];
  /** A click handler function to determine which metal was clicked */
  metalChange(metal: string): void;
}

const metalShortened = {
  [METAL.WHITE]: METAL_SHORTNAME.WHITE,
  [METAL.YELLOW]: METAL_SHORTNAME.YELLOW,
  [METAL.ROSE]: METAL_SHORTNAME.ROSE,
};

export const ProductMetalSelection: React.FC<ProductMetalSelectionProps> = ({
  selectedMetal,
  metals,
  metalChange,
}) => {
  return (
    <div className={classes.ProductMetalSelection}>
      <Spacer>
        <Label>Metal:</Label>
        <Attribute>{selectedMetal}</Attribute>
      </Spacer>
      {metals.map((metal: string) => {
        return (
          <div
            key={metal}
            className={cn(classes.ProductMetalSelection__options, {
              [classes.ProductMetalSelection__options_selected]: metal === selectedMetal,
              [classes.wg]: metal === METAL.WHITE,
              [classes.yg]: metal === METAL.YELLOW,
              [classes.rg]: metal === METAL.ROSE,
            })}
            onClick={() => metalChange(metal)}
          >
            {metalShortened[metal]}
          </div>
        );
      })}
    </div>
  );
};
