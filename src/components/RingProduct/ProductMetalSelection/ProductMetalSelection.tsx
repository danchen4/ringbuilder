import React from 'react';
import cn from 'classnames';
import classes from './ProductMetalSelection.module.scss';
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

const ProductMetalSelection: React.FC<ProductMetalSelectionProps> = ({
  selectedMetal,
  metals,
  metalChange,
}) => {
  return (
    <div className={classes.ProductMetalSelection}>
      <div className={classes.ProductMetalSelection__name}>
        <span className={classes.ProductMetalSelection__label}>Metal:</span> {selectedMetal}
      </div>
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

export default ProductMetalSelection;
