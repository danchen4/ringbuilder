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
import { diamondDataToTable, filterArrayObject } from '../../helper';


interface DiamondCatalogProps {}

interface ColorRange {
  minColor: string,
  maxColor: string,
}

export const DiamondCatalog: React.FC<DiamondCatalogProps> = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [shapeFilter, setShapeFilter] = useState<string[]>([]);
  const [colorRange, setColorRange] = useState<ColorRange>({minColor: 'D', maxColor: 'H'});
  const { url } = useRouteMatch();

  useEffect(() => {
    async function fetch() {
      // const queryParams = ringStyleFilter.query
      //   ? `?orderBy="${ringStyleFilter.query}"&equalTo="${ringStyleFilter.style}"`
      //   : '';
      const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
      const response = await axios.get(url);
      const catalog = response.data;
      const diamondCatalog = diamondDataToTable(catalog);

      // filters rules for ring style and ring center shape
      const filters = {
        shape(shape: string) {
          let matched = true;
          // If shapeFilter has items and the shape is not included in what is checked, then return false
          if (!shapeFilter.includes(shape) && shapeFilter.length) matched = false;
          return matched;
        },
        color(color: string) {
          const diamondColorRange = ['D', 'E', 'F', 'G', 'H'];
          const filteredRange = diamondColorRange.filter(color => colorRange.minColor <= color && color <= colorRange.maxColor);
          return filteredRange.includes(color);
        }
      };

      const filteredCatalog = filterArrayObject(diamondCatalog, filters);
      setCatalog(filteredCatalog);
    }
    fetch();  
  }, [shapeFilter, colorRange]);

  const filterShapeHandler = (filters:any) => {
    // let target = e.target;
    // setShapeFilter(target.value);  
    const shapeFilterArray = [];
    for (let shape in filters) {
      if (filters[shape]) shapeFilterArray.push(shape)
    }
    console.log('shapeFilterArray', shapeFilterArray);
    setShapeFilter(shapeFilterArray);
  }

  const filterColorHandler = useCallback((colorRange: any) => {
    console.log(colorRange);
    setColorRange(colorRange)
  },[])

  return (
    <div className={classes.DiamondCatalog}>
      <ProgressBar />
      <DiamondCatalogFilter
        filterShape={filterShapeHandler}
        filterColor={filterColorHandler}
      ></DiamondCatalogFilter>
      <h1>Diamond Page</h1>
      <DiamondTable diamondArray={catalog}/>
    </div>
  );
};

export default DiamondCatalog;
