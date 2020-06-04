import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '../../store/actions';
import classes from './RingProduct.module.scss';

import { formatCurrency, ringDataToArray } from '../../helper';
import ProductImageGallery from './ProductImageGallery/ProductImageGallery';
import ProductMetalSelection from './ProductMetalSelection/ProductMetalSelection';
import { METAL } from '../../constants/rings';

interface RingProductProps {}

const RingProduct: React.FC<RingProductProps> = () => {
  const [ringData, setRingData] = useState<any>({ gallery: [], metals: [] });
  const [metal, setMetal] = useState(METAL.WHITE);

  const dispatch = useDispatch();
  let { sku } = useParams();
  const history = useHistory();
  console.log(history);

  const onAddToCart = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  // const onSubmitApplication = (token, personalData, incomeData) =>
  //   dispatch(actionUserApp.submitApplication(token, personalData, incomeData));

  useEffect(() => {
    async function fetch() {
      const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
      const response = await axios.get(url);
      const catalog = await response.data;

      const ringCatalog = ringDataToArray(catalog);
      const ring = ringCatalog.filter((ring) => ring.sku === sku);
      const rings2 = { ...ring[0] };

      setRingData(rings2);
    }
    fetch();
  }, []);

  console.log(ringData);

  const metalChangeHandler = (metal: string) => {
    setMetal(metal);
  };

  const addToCartHandler = () => {
    onAddToCart({
      sku: ringData.sku,
      image: ringData.gallery[0],
      name: ringData.name,
      style: ringData.style,
      metal: metal,
      price: ringData.price,
    });
    history.push({ pathname: '/cart' });
  };

  return (
    <div className={classes.RingProduct}>
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
        <button className={classes.addToCart} onClick={addToCartHandler}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default RingProduct;
