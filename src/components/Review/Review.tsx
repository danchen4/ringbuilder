import React, { useCallback, useState, useEffect } from 'react';
// Router
import { useHistory } from 'react-router-dom';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, ringBuilderCheckData } from '../../store/actions';
import { CartItem } from '../../store/reducers/cart';
// CSS
import classes from './Review.module.scss';
// Components
import { ProgressBar } from '../ProgressBar/ProgressBar';
import ProductImageGallery from '../RingProduct/ProductImageGallery/ProductImageGallery';
import { MySelect } from '../UI/Select/Select';
// Misc.
import { formatCurrency, ringImageSelector } from '../../helper';
import { RING_SIZES } from '../../constants';

interface ReviewProps {}

export const Review: React.FC<ReviewProps> = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ringSize, setRingSize] = useState('4');
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);

  useEffect(() => {
    dispatch(ringBuilderCheckData());
  }, [dispatch]);

  const onAddToCart = (cartItems: CartItem[]) => {
    dispatch(addToCart(cartItems));
  };

  const addToCartHandler = () => {
    const totalPrice = ringData.price + diamondData.price;
    const cartItem = [
      {
        sku: ringData.sku,
        image: ringData.gallery[ringImageSelector(ringData.metal)],
        name: ringData.name,
        style: ringData.style,
        metal: ringData.metal,
        size: ringSize,
        price: totalPrice,
        certNumber: diamondData.certNumber,
        carats: diamondData.carats,
        shape: diamondData.shape,
      },
    ];
    console.log('cartItem', cartItem);
    onAddToCart(cartItem);
    history.push({ pathname: '/cart' });
  };

  const selectRingSizeHandler = (e: any) => {
    const target = e.target;
    setRingSize(target.value);
  };

  console.log('ringData', ringData);

  let review = <p>Add Ring and Diamond</p>;
  if (ringData && diamondData) {
    review = (
      <div className={classes.Review}>
        <ProgressBar />
        <div className={classes.Review__grid}>
          <ProductImageGallery images={ringData.gallery} selectedMetal={ringData.metal} />
          <div className={classes.Review__content}>
            <h2 className={classes.Review__header}>
              {ringData.name} {ringData.metal} {ringData.style}{' '}
              {ringData.style !== 'Solitaire' ? 'Diamond' : null} Ring with {diamondData.carats}{' '}
              Carat {diamondData.shape} Diamond
            </h2>
            <div className={classes.Review__select}>
              <MySelect
                header="Ring Size"
                values={RING_SIZES}
                name="ringSize"
                selected={selectRingSizeHandler}
              />
            </div>
            <p className={classes.Review__price}>
              {formatCurrency(ringData.price + diamondData.price)}
            </p>
            <button className={classes.Review__btn_shop} onClick={addToCartHandler}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  return review;
};

export default Review;
