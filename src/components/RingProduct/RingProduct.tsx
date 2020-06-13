import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './RingProduct.module.scss';

import { formatCurrency, ringDataToArray } from '../../helper';
import ProductImageGallery from './ProductImageGallery/ProductImageGallery';
import ProductMetalSelection from './ProductMetalSelection/ProductMetalSelection';
import ProgressBar from '../ProgressBar/ProgressBar';

import { METAL } from '../../constants';

import { addToCart, addRing, CartItem } from '../../store/actions';
import { RingBuilderRingData } from '../../store/reducers/ringbuilder';

interface RingProductProps {}

const RingProduct: React.FC<RingProductProps> = () => {
  const [ringData, setRingData] = useState<any>({ gallery: [], metals: [] });
  const [metal, setMetal] = useState(METAL.WHITE);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);

  const dispatch = useDispatch();
  let { sku } = useParams();
  const history = useHistory();

  const onAddToRing = (ringData: RingBuilderRingData) => {
    dispatch(addRing(ringData));
  };

  useEffect(() => {
    (async function () {
      const queryParams = `?orderBy="sku"&equalTo="${sku}"`
      const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
      const response = await axios.get(url + queryParams);
      const data = await response.data;
      const ringCatalog = ringDataToArray(data);
      setRingData(ringCatalog[0]);
    })();
  });

  const metalChangeHandler = (metal: string) => {
    setMetal(metal);
  };

  const addToRingHandler = () => {
    const ringBuilderRingData: RingBuilderRingData = {
      sku: ringData.sku,
      image: ringData.gallery,
      name: ringData.name,
      style: ringData.style,
      metal: ringData.metal,
      price: ringData.price,
    }

    onAddToRing(ringBuilderRingData)
    // if a diamond has not been selected, then direct to diamonds catalog page, else to review page
    if (!diamondData) {
      history.push({ pathname: '/diamonds' });
    } else {
      history.push({ pathname: '/review' })
    }
  };

  return (
    <div className={classes.RingProduct}>
      <ProgressBar />
      <div className={classes.grid}>
      <ProductImageGallery images={ringData.gallery} selectedMetal={metal} />
      <div className={classes.description}>
        <h3>{ringData.name}</h3>
        <p>
          {ringData.style !== 'Solitaire' ? 'Diamond' : null} {ringData.style} Ring
        </p>
        <p>{ringData.description}</p>
        <ProductMetalSelection
          selectedMetal={metal}
          metals={ringData.metals}
          metalChange={metalChangeHandler}
        />
        <p className={classes.price}>{formatCurrency(ringData.price)}</p>
        <button className={classes.addToCart} onClick={addToRingHandler}>
          Add To Ring
        </button>
        </div>
      </div>
    </div>
  );
};

export default RingProduct;
