import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './DiamondCatalog.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';

import { diamondDataToArray } from '../../helper/diamondDataToArray';
import DiamondTable from './DiamondTable/DiamondTable';



interface DiamondCatalogProps {}

export const DiamondCatalog: React.FC<DiamondCatalogProps> = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    async function fetch() {
      // const queryParams = ringStyleFilter.query
      //   ? `?orderBy="${ringStyleFilter.query}"&equalTo="${ringStyleFilter.style}"`
      //   : '';
      const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
      const response = await axios.get(url);
      const catalog = response.data;
      const diamondCatalog = diamondDataToArray(catalog);
      // console.log(diamondCatalog);
      setCatalog(diamondCatalog);
    }
    fetch();
  }, []);

  return (
    <div className={classes.DiamondCatalog}>
      <h1>Diamond Page</h1>
      <DiamondTable diamondArray={catalog}/>
    </div>
  );
};

export default DiamondCatalog;
