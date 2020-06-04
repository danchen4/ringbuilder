import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './RingCatalog.module.scss';
import Card from '../UI/Card/Card';
import CatalogImageGallery from './CatalogImageGallery/CatalogImageGallery';
import { Link, useRouteMatch } from 'react-router-dom';

import { formatCurrency, ringDataToArray } from '../../helper';
import { RING_PRICE_SORT } from '../../constants/rings';

import FilterBar from './Filter/FilterBar';

interface Props {}

const RingCatalog = (props: Props) => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [ringStyleFilter, setRingStyleFilter] = useState(null);
  const [ringShapeFilter, setRingShapeFilter] = useState(null);
  const [sortPriceFilter, setSortPriceFilter] = useState(null);

  const { url } = useRouteMatch();

  useEffect(() => {
    async function fetch() {
      // const queryParams = ringStyleFilter.query
      //   ? `?orderBy="${ringStyleFilter.query}"&equalTo="${ringStyleFilter.style}"`
      //   : '';

      const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
      const response = await axios.get(url);
      const catalog = response.data;
      // catalog looks like
      // catalog: {
      //ER12876: {
      // accent_weight: 0.27
      // band_thickness: 1.5
      // ...
      // }
      // }

      // convert to array
      const ringCatalog = ringDataToArray(catalog);

      const sortedCatalog = ringCatalog.sort((a, b) => {
        if (sortPriceFilter === RING_PRICE_SORT.HIGHTOLOW) {
          return b.price - a.price;
        }
        return a.price - b.price;
      });

      const filteredCatalog = sortedCatalog.filter((ring) => {
        if (ringStyleFilter && ringShapeFilter) {
          return ring.style === ringStyleFilter && ring.center === ringShapeFilter;
        }
        if (ringStyleFilter) {
          return ring.style === ringStyleFilter;
        }
        if (ringShapeFilter) {
          return ring.center === ringShapeFilter;
        }
        return true;

        // return ring.style === ringStyleFilter || ring.center === ringShapeFilter;
      });

      setCatalog(filteredCatalog);
    }
    fetch();
  }, [ringStyleFilter, ringShapeFilter, sortPriceFilter]);

  const checkedStyleHandler = (e: any) => {
    let target = e.target;
    if (target.value === 'All') {
      target.value = null;
    }
    setRingStyleFilter(target.value);
  };

  const checkedShapeHandler = (e: any) => {
    let target = e.target;
    if (target.value === 'All') {
      target.value = null;
    }
    setRingShapeFilter(target.value);
  };

  const selectSortHandler = (e: any) => {
    let target = e.target;
    console.log(target.value);
    setSortPriceFilter(target.value);
  };

  return (
    <div className={classes.RingCatalog}>
      <FilterBar
        checkedStyle={checkedStyleHandler}
        checkedShape={checkedShapeHandler}
        selectSort={selectSortHandler}
      />
      {catalog.map((product) => {
        return (
          <Card key={product.sku}>
            <CatalogImageGallery images={product.gallery} metals={product.metals} />
            <h4 className={classes.productName}>{product.name}</h4>
            <p>
              {product.style !== 'Solitaire' ? 'Diamond' : null} {product.style} Ring
            </p>
            <p className={classes.price}>{formatCurrency(product.price)}</p>
            <Link to={`${url}/${product.sku}`}>Shop Now</Link>
          </Card>
        );
      })}
    </div>
  );
};

export default RingCatalog;
