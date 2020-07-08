import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Router
import { useParams, useHistory } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchRingProduct, addRing } from '../../store/actions';
import { RingBuilderRingData } from '../../store/reducers/ringbuilder';
// CSS
import classes from './RingProduct.module.scss';
// Components
import ProductImageGallery from './ProductImageGallery/ProductImageGallery';
import ProductMetalSelection from './ProductMetalSelection/ProductMetalSelection';
import ProgressBar from '../ProgressBar/ProgressBar';
import Spinner from '../UI/Spinner/Spinner';
import { Backdrop } from '../UI/BackDrop/Backdrop';
// Helpers, constants
import { METAL } from '../../constants';
import { formatCurrency, ringDataToArray } from '../../helper';

interface RingProductProps {}

export const RingProduct: React.FC<RingProductProps> = () => {
  // const [ringData, setRingData] = useState<any>({ gallery: [], metals: [] });
  const [metal, setMetal] = useState(METAL.WHITE);

  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);
  const ringData = useSelector((state: any) => state.ringProduct.ringProductData);
  const loading = useSelector((state: any) => state.ringProduct.loading);

  const dispatch = useDispatch();
  let { sku } = useParams();
  const history = useHistory();

  const onAddToRing = (ringData: RingBuilderRingData) => {
    dispatch(addRing(ringData));
  };

  useEffect(() => {
    dispatch(fetchRingProduct(sku));
  }, [dispatch, sku]);

  const metalChangeHandler = (metal: string) => {
    setMetal(metal);
  };

  const addToRingHandler = () => {
    const ringBuilderRingData: RingBuilderRingData = {
      sku: ringData.sku,
      gallery: ringData.gallery,
      name: ringData.name,
      style: ringData.style,
      metal: metal,
      price: ringData.price,
    };

    onAddToRing(ringBuilderRingData);
    // if a diamond has not been selected, then direct to diamonds catalog page, else to review page
    if (!diamondData) {
      history.push({ pathname: '/diamonds' });
    } else {
      history.push({ pathname: '/review' });
    }
  };

  let ringProduct = (
    <React.Fragment>
      <Backdrop />
      <Spinner />
    </React.Fragment>
  );
  if (!loading) {
    ringProduct = (
      <div className={classes.RingProduct}>
        <ProgressBar />
        <div className={classes.RingProduct__grid}>
          <ProductImageGallery images={ringData.gallery} selectedMetal={metal} />
          <div className={classes.RingProduct__content}>
            <h2 className={classes.RingProduct__header}>{ringData.name}</h2>
            <p className={classes.RingProduct__name}>
              {ringData.style !== 'Solitaire' ? 'Diamond' : null} {ringData.style} Ring
            </p>
            <p className={classes.RingProduct__description}>{ringData.description}</p>
            <ProductMetalSelection
              selectedMetal={metal}
              metals={ringData.metals}
              metalChange={metalChangeHandler}
            />
            <p className={classes.RingProduct__price}>{formatCurrency(ringData.price)}</p>
            <button className={classes.RingProduct__btn_shop} onClick={addToRingHandler}>
              Add To Ring
            </button>
          </div>
        </div>
      </div>
    );
  }

  return ringProduct;
};

export default RingProduct;
