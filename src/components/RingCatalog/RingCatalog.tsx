import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './RingCatalog.module.scss';
import Card from '../UI/Card/Card';
import CatalogImageGallery from './CatalogImageGallery/CatalogImageGallery';
import { Link, useRouteMatch } from 'react-router-dom';

import { formatCurrency, ringDataToArray, filterArrayObject } from '../../helper';
import { RING_PRICE_SORT } from '../../constants/rings';

import FilterBar from './RingCatalogFilter/RingCatalogFilter';

interface RingCatalogProps {}

const RingCatalog: React.FC<RingCatalogProps> = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const { url } = useRouteMatch();

  const [ringStyleFilter, setRingStyleFilter] = useState('All');
  const [ringShapeFilter, setRingShapeFilter] = useState('All');
  // filters rules for ring style and ring center shape
  const filters = {
    style(style: string) {
      return style === ringStyleFilter || ringStyleFilter === 'All';
    },
    center(center: string) {
      return center === ringShapeFilter || ringShapeFilter === 'All';
    },
  };

  useEffect(() => {
    async function fetch() {
      // const queryParams = ringStyleFilter.query
      //   ? `?orderBy="${ringStyleFilter.query}"&equalTo="${ringStyleFilter.style}"`
      //   : '';
      const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
      const response = await axios.get(url);
      const catalog = response.data;
      const ringCatalog = ringDataToArray(catalog);

      // filter the array based on selection
      const filteredCatalog = filterArrayObject(ringCatalog, filters);
      setCatalog(filteredCatalog);
    }
    fetch();
  }, [ringStyleFilter, ringShapeFilter]);

  const filterStyleHandler = (e: any) => {
    let styleValue = e.target.value;
    setRingStyleFilter(styleValue);
  };

  const filterShapeHandler = (e: any) => {
    let shapeValue = e.target.value;
    setRingShapeFilter(shapeValue);
  };

  const selectSortHandler = (e: any) => {
    let sortValue = e.target.value;
    const catalogCopy = [...catalog];
    const sortedCatalog = catalogCopy.sort((a, b) => {
      if (sortValue === RING_PRICE_SORT.HIGHTOLOW) {
        return b.price - a.price;
      }
      return a.price - b.price;
    });
    setCatalog(sortedCatalog);
  };

  return (
    <div className={classes.RingCatalog}>
      <FilterBar
        filterStyle={filterStyleHandler}
        filterShape={filterShapeHandler}
        selectSort={selectSortHandler}
        ringStyleSelected={ringStyleFilter}
        ringShapeSelected={ringShapeFilter}
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
