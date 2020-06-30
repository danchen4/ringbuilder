import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// CSS
import classes from './DiamondCatalog.module.scss';
// Router
import { useRouteMatch } from 'react-router-dom';
// Components
import DiamondCatalogFilter from './DiamondCatalogFilter/DiamondCatalogFilter';
import DiamondTable from './DiamondTable/DiamondTable';
import ProgressBar from '../ProgressBar/ProgressBar';
// Misc.
import { diamondDataToTableArray, filterArrayObject, sortArrayObject } from '../../helper';

interface DiamondCatalogProps {}

interface FilterNumRange {
  min: number;
  max: number;
}

interface FilterStringRange {
  min: string;
  max: string;
}

export const DiamondCatalog: React.FC<DiamondCatalogProps> = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [shapeFilter, setShapeFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<FilterNumRange>({ min: 0, max: 99999 });
  const [colorRange, setColorRange] = useState<FilterStringRange>({ min: 'D', max: 'H' });
  const [clarityRange, setClarityRange] = useState<FilterStringRange>({ min: 'VS1', max: 'SI2' });
  const { url } = useRouteMatch();

  useEffect(() => {
    (async function () {
      const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
      const response = await axios.get(url);
      const catalog = response.data;
      const diamondCatalog = diamondDataToTableArray(catalog);

      const sortedDiamondCatalog = sortArrayObject('price', diamondCatalog, true);

      // filters rules for ring style and ring center shape
      const filters = {
        shape(shape: string) {
          let matched = true;
          // If shapeFilter has items and the shape is not included in what is checked, then return false
          if (!shapeFilter.includes(shape) && shapeFilter.length) matched = false;
          return matched;
        },
        price(price: number) {
          return price >= priceRange.min && price <= priceRange.max;
        },
        color(color: string) {
          const diamondColorRange = ['D', 'E', 'F', 'G', 'H'];
          const filteredRange = diamondColorRange.slice(
            diamondColorRange.indexOf(colorRange.min),
            diamondColorRange.indexOf(colorRange.max) + 1
          );
          return filteredRange.includes(color);
        },
        clarity(clarity: string) {
          const diamondClarityRange = ['VS1', 'VS2', 'SI1', 'SI2']; //VS1 < VS2 < SI1 < SI2
          const filteredRange = diamondClarityRange.slice(
            diamondClarityRange.indexOf(clarityRange.min),
            diamondClarityRange.indexOf(clarityRange.max) + 1
          );
          return filteredRange.includes(clarity);
        },
      };

      const filteredCatalog = filterArrayObject(sortedDiamondCatalog, filters);
      setCatalog(filteredCatalog);
    })();
  }, [shapeFilter, colorRange, clarityRange, priceRange]);

  const filterShapeHandler = useCallback((filters: any) => {
    // filters can be an object in the form {Round: Round, Oval: Oval} or an array in the form ["Round", "Oval"]
    // if it is an object then
    if (typeof filters === 'object') {
      const shapeFilterArray = [];

      for (let shape in filters) {
        if (filters[shape]) shapeFilterArray.push(shape);
      }
      setShapeFilter(shapeFilterArray);
    } else {
      setShapeFilter(filters);
    }
  }, []);

  const filterPriceHandler = useCallback((priceRange: any) => {
    console.log(priceRange);
    setPriceRange(priceRange);
  }, []);

  const filterColorHandler = useCallback((colorRange: any) => {
    // console.log(colorRange);
    setColorRange(colorRange);
  }, []);

  const filterClarityHandler = useCallback((clarityRange: any) => {
    // console.log(clarityRange);
    setClarityRange(clarityRange);
  }, []);

  const sortTableHandler = (e: any, sortDesc: boolean) => {
    const target = e.target;
    const label = target.textContent.toLowerCase();
    const catalogCopy = sortArrayObject(label, catalog, sortDesc);
    setCatalog(catalogCopy);
  };

  return (
    <div className={classes.DiamondCatalog}>
      <ProgressBar />
      <DiamondCatalogFilter
        filterPrice={filterPriceHandler}
        filterShape={filterShapeHandler}
        filterColor={filterColorHandler}
        filterClarity={filterClarityHandler}
        ringShapeSelected={shapeFilter}
      ></DiamondCatalogFilter>
      <div className={classes.DiamondCatalog__content}>
        <h1>Diamond Page</h1>
        <DiamondTable diamondArray={catalog} sortTable={sortTableHandler} />
      </div>
    </div>
  );
};

export default DiamondCatalog;
