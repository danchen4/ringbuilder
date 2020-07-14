import React, { useState, useEffect } from 'react';
import axios from 'axios';
// CSS
import classes from './DiamondCatalogFilter.module.scss';
// Components
import { IconCheckboxGroup } from '../../UI/IconCheckboxGroup/IconCheckboxGroup';
import { DiscreteRangeSlider } from '../../UI/DiscreteRangeSlider/DiscreteRangeSlider';
import { RangeSlider } from '../../UI/RangeSlider/RangeSlider';
import { MobileDropDownWrapper } from '../../UI/MobileDropDownWrapper/MobileDropDownWrapper';

// Misc.
import { diamondDataToTableArray } from '../../../helper';
import {
  DIAMOND_FILTER_COLOR_MARKS,
  DIAMOND_FILTER_COLOR_VALUES,
  DIAMOND_FILTER_CLARITY_MARKS,
  DIAMOND_FILTER_CLARITY_VALUES,
} from '../../../constants';

interface FilterNumRange {
  min: number;
  max: number;
}

interface DiamondCatalogFilterProps {
  /** Handler callback function for filtering diamond shape */
  filterPrice(filterMinMax: { [key: string]: number }): void;
  /** Handler callback function for filtering diamond shape */
  filterShape(filterMinMax: { [key: string]: string }): void;
  /** Handler callback function for filtering diamond color*/
  filterColor(filterMinMax: { [key: string]: string }): void;
  /** Handler callback function for filtering diamond clarity*/
  filterClarity(filterMinMax: { [key: string]: string }): void;
  /** Values allowed for ring center shape.  Based on diamond shape chosen*/
  diamondShapes: string[];
}

// Object is used to determine which filter to expand on mobile.  Only one filter can be expanded on mobile at one time.
const toggleDropDowns: { [key: string]: boolean } = {
  shape: false,
  price: false,
  color: false,
  clarity: false,
};

export const DiamondCatalogFilter: React.FC<DiamondCatalogFilterProps> = React.memo(
  ({ filterPrice, filterShape, filterColor, filterClarity, diamondShapes }) => {
    const [priceRange, setPriceRange] = useState<FilterNumRange>({ min: 0, max: 99999 });
    const [toggle, setToggle] = useState(toggleDropDowns);

    // For mobile, will only allow one filter to dropdown at a time.  When you open a dropdown, it will close all the other dropdowns.
    const toggleHandler = (name: string) => {
      setToggle({
        ...toggleDropDowns,
        [name]: !toggle[name],
      });
    };

    // Get min and max price of all diamonds in database to use for price range filter
    useEffect(() => {
      (async function () {
        const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
        const queryMinCost = `?orderBy="cost"&limitToFirst=1`;
        const queryMaxCost = `?orderBy="cost"&limitToLast=1`;

        try {
          const [responseMin, responseMax] = await Promise.all([
            axios.get(url + queryMinCost),
            axios.get(url + queryMaxCost),
          ]);
          const [minCostDiamond, maxCostDiamond] = await Promise.all([
            responseMin.data,
            responseMax.data,
          ]);
          const minPrice = diamondDataToTableArray(minCostDiamond)[0].price;
          const maxPrice = diamondDataToTableArray(maxCostDiamond)[0].price;

          setPriceRange({
            min: minPrice,
            max: maxPrice,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }, []);

    // Diamond table filter outputs for desktop
    let desktopOutput = (
      <div className={classes.DiamondCatalogFilter_desktop}>
        <div className={classes.DiamondCatalogFilter__filter}>
          <IconCheckboxGroup header="Shape" values={diamondShapes} checked={filterShape} />
        </div>
        <div className={classes.DiamondCatalogFilter__filter}>
          <h4>Price: </h4>
          <RangeSlider min={priceRange.min} max={priceRange.max} inputs changed={filterPrice} />
        </div>
        <div className={classes.DiamondCatalogFilter__filter}>
          <h4>Color: </h4>
          <DiscreteRangeSlider
            min={10}
            max={50}
            marks={DIAMOND_FILTER_COLOR_MARKS}
            range={DIAMOND_FILTER_COLOR_VALUES}
            changed={filterColor}
          />
        </div>
        <div className={classes.DiamondCatalogFilter__filter}>
          <h4>Clarity: </h4>
          <DiscreteRangeSlider
            min={10}
            max={40}
            marks={DIAMOND_FILTER_CLARITY_MARKS}
            range={DIAMOND_FILTER_CLARITY_VALUES}
            changed={filterClarity}
          />
        </div>
      </div>
    );

    // Diamond table filter outputs for mobile screens
    let mobileOutput = (
      <div className={classes.DiamondCatalogFilter_mobile}>
        <div className={classes.DiamondCatalogFilter__filter}>
          <MobileDropDownWrapper
            header="Shape"
            name="shape"
            dropdown={toggle.shape}
            toggle={toggleHandler}
          >
            <IconCheckboxGroup
              header="Shape"
              mobile={true}
              values={['Round', 'Oval']}
              checked={filterShape}
            />
          </MobileDropDownWrapper>
        </div>
        <div className={classes.DiamondCatalogFilter__filter}>
          <MobileDropDownWrapper
            header="Price"
            name="price"
            dropdown={toggle.price}
            toggle={toggleHandler}
          >
            <RangeSlider min={priceRange.min} max={priceRange.max} inputs changed={filterPrice} />
          </MobileDropDownWrapper>
        </div>
        <div className={classes.DiamondCatalogFilter__filter}>
          <MobileDropDownWrapper
            header="Color"
            name="color"
            dropdown={toggle.color}
            toggle={toggleHandler}
          >
            <DiscreteRangeSlider
              min={10}
              max={50}
              marks={DIAMOND_FILTER_COLOR_MARKS}
              range={DIAMOND_FILTER_COLOR_VALUES}
              changed={filterColor}
            />
          </MobileDropDownWrapper>
        </div>
        <div className={classes.DiamondCatalogFilter__filter}>
          <MobileDropDownWrapper
            header="Clarity"
            name="clarity"
            dropdown={toggle.clarity}
            toggle={toggleHandler}
          >
            <DiscreteRangeSlider
              min={10}
              max={40}
              marks={DIAMOND_FILTER_CLARITY_MARKS}
              range={DIAMOND_FILTER_CLARITY_VALUES}
              changed={filterClarity}
            />
          </MobileDropDownWrapper>
        </div>
      </div>
    );

    return (
      <div className={classes.DiamondCatalogFilter}>
        {desktopOutput}
        {mobileOutput}
      </div>
    );
  }
);
