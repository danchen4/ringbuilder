import React, { useState, useEffect, useCallback, useRef } from 'react';
// CSS
import classes from './DiamondCatalog.module.scss';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiamondCatalog } from '../../store/actions';
// Components
import { DiamondCatalogFilter } from './DiamondCatalogFilter/DiamondCatalogFilter';
import { DiamondTable } from './DiamondTable/DiamondTable.index';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { PageContent } from '../StyledUI/PageContent';
import { Spacer } from '../StyledUI/Spacer';
import { Spinner } from '../UI/Spinner/Spinner';
// Misc.
import { filterArrayObject, sortArrayObject } from '../../helper';

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
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState<any[]>([]);
  const [shapeFilter, setShapeFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<FilterNumRange>({
    min: 0,
    max: 99999,
  });
  const [colorRange, setColorRange] = useState<FilterStringRange>({ min: 'D', max: 'H' });
  const [clarityRange, setClarityRange] = useState<FilterStringRange>({ min: 'VS1', max: 'SI2' });
  const fullCatalog = useSelector((state: any) => state.diamondCatalog.diamondCatalogData);
  const loading = useSelector((state: any) => state.diamondCatalog.loading);
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  let ringCenterShapes = useRef<string[]>(['Round', 'Oval']);

  // Retrieve diamond catalog from firebase on mount
  useEffect(() => {
    dispatch(fetchDiamondCatalog());
  }, [dispatch]);

  // Set diamond catalog to local state after loaded from firebase and after sorting by price
  useEffect(() => {
    setCatalog(fullCatalog);
  }, [fullCatalog]);

  useEffect(() => {
    // Only allow selection of rings based on shape of center diamond selected.  For e.g., if a Round diamond is selected, only allow selection of rings with Round center stone
    if (ringData) {
      console.log(ringData.center);
      setShapeFilter([ringData.center]);
      ringCenterShapes.current = [ringData.center];
    }
  }, [ringData]);

  // Anytime a filter is changed, update the local state
  useEffect(() => {
    // filters rules diamond filters
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
    const filteredCatalog = filterArrayObject(fullCatalog, filters);
    setCatalog(filteredCatalog);
  }, [shapeFilter, colorRange, clarityRange, priceRange]);

  const filterShapeHandler = useCallback((filters: any) => {
    // filters can be an object in the form {Round: Round, Oval: Oval} or an array in the form ["Round", "Oval"]
    // if it is an object then convert to an array
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
    // console.log(priceRange);
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
      <PageContent>
        <DiamondCatalogFilter
          filterPrice={filterPriceHandler}
          filterShape={filterShapeHandler}
          filterColor={filterColorHandler}
          filterClarity={filterClarityHandler}
          diamondShapes={ringCenterShapes.current}
        ></DiamondCatalogFilter>
        <Spacer mTop={2}>
          {loading ? (
            <Spinner />
          ) : (
            <DiamondTable diamondArray={catalog} sortTable={sortTableHandler} />
          )}
        </Spacer>
      </PageContent>
    </div>
  );
};

export default DiamondCatalog;
