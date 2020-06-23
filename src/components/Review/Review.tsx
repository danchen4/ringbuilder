import React, { useCallback, useState, useEffect } from 'react'
// Router
import { useHistory } from 'react-router-dom';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, ringBuilderCheckData } from '../../store/actions'
import { CartItem } from '../../store/reducers/cart';
// CSS
import classes from './Review.module.scss'
// Components
import { ProgressBar } from '../ProgressBar/ProgressBar';
import ProductImageGallery from '../RingProduct/ProductImageGallery/ProductImageGallery';
import Select from '../UI/Select/Select';

// Misc.
import { formatCurrency, ringImageSelector } from '../../helper';
import {RING_SIZES} from '../../constants'



interface ReviewProps {

}

export const Review: React.FC<ReviewProps> = ({ }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ringSize, setRingSize] = useState('4')
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);


  useEffect(() => {
    dispatch(ringBuilderCheckData())
  }, [dispatch])

  const onAddToCart = (cartItems: CartItem[]) => {
    dispatch(addToCart(cartItems))
  }

  console.log('ringData', ringData);
  console.log('diamondData', diamondData);

  const addToCartHandler = () => {
    const totalPrice = ringData.price + diamondData.price;
    const cartItem = [{
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
    }]
    console.log('cartItem',cartItem)
    onAddToCart(cartItem);
    history.push({ pathname: '/cart' });
  }

  const selectRingSizeHandler = (e: any) => {
    const target = e.target;
    setRingSize(target.value)
  }

  let review = <p>Add Ring and Diamond</p>
  if (ringData && diamondData) {
    review = (<div className={classes.Review}>
      <ProgressBar />
      <div className={classes.grid}>
         <ProductImageGallery images={ringData.gallery} selectedMetal={ringData.metal} />
        <div className={classes.description}>
          <h2>{ringData.name} {ringData.metal} {ringData.style !== 'Solitaire' ? 'Diamond' : null} {ringData.style} Ring with {diamondData.carats} Carat {diamondData.shape} Diamond</h2>
          <p>{ringData.description}</p>
          <Select
            header="Ring Size"
            values={RING_SIZES}
            name="ringSize"
            selected={selectRingSizeHandler}
          />          
          <p className={classes.price}>{formatCurrency(ringData.price + diamondData.price)}</p>
          <button className={classes.addToCart} onClick={addToCartHandler}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>)
  }
  return review;
}

export default Review