import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Router
import { Link, useRouteMatch } from 'react-router-dom';
// CSS
import classes from './RingCatalog.module.scss';
// Misc.
import { formatCurrency, ringDataToArray, filterArrayObject } from '../../helper';
import { RING_PRICE_SORT_LABEL } from '../../constants/rings';
// Components
import RingCatalogFilter from './RingCatalogFilter/RingCatalogFilter';
import CatalogImageGallery from './CatalogImageGallery/CatalogImageGallery';
import ProgressBar from '../ProgressBar/ProgressBar';
import Card from '../UI/Card/Card';

interface RingCatalogProps {}

const RingCatalog: React.FC<RingCatalogProps> = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const { url } = useRouteMatch();

  const [ringStyleFilter, setRingStyleFilter] = useState('All');
  const [ringShapeFilter, setRingShapeFilter] = useState('All');

  useEffect(() => {
    (async function () {
      const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
      const response = await axios.get(url);
      const data = response.data;
      const ringCatalog = ringDataToArray(data);

      // filters rules for ring style and ring center shape
      const filters = {
        style(style: string) {
          return style === ringStyleFilter || ringStyleFilter === 'All';
        },
        center(center: string) {
          return center === ringShapeFilter || ringShapeFilter === 'All';
        },
      };

      // filter the array based on selection
      const filteredCatalog = filterArrayObject(ringCatalog, filters);
      setCatalog(filteredCatalog);
    })();
  }, [ringStyleFilter, ringShapeFilter]);

  const filterStyleHandler = (e: any) => {
    let target = e.target;
    setRingStyleFilter(target.value);
  };

  const filterShapeHandler = (e: any) => {
    let target = e.target;
    setRingShapeFilter(target.value);
  };

  const selectSortHandler = (e: any) => {
    const target = e.target;
    const catalogCopy = [...catalog];
    const sortedCatalog = catalogCopy.sort((a, b) => {
      if (target.value === RING_PRICE_SORT_LABEL.HIGHTOLOW) {
        return b.price - a.price;
      }
      return a.price - b.price;
    });
    setCatalog(sortedCatalog);
  };

  return (
    <div className={classes.RingCatalog}>
      <ProgressBar />
      <RingCatalogFilter
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
            <div className={classes.RingCatalog__description}>
              <h4 className={classes.RingCatalog__name}>{product.name}</h4>
              <p className={classes.RingCatalog__style}>
                {product.style} {product.style !== 'Solitaire' ? 'Diamond' : null} Ring
              </p>
              <p className={classes.RingCatalog__price}>{formatCurrency(product.price)}</p>
              <Link className={classes.RingCatalog__btn_text} to={`${url}/${product.sku}`}>
                Shop Now
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default RingCatalog;
