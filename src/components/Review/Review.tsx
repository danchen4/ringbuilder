import React, { useCallback, useState, useEffect } from 'react';
// Router
import { useHistory } from 'react-router-dom';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, ringBuilderCheckData, clearRingBuilder } from '../../store/actions';
import { CartItem } from '../../types';
// CSS
import classes from './Review.module.scss';
// Components
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { ProductImageGallery } from '../RingProduct/ProductImageGallery/ProductImageGallery';
import { MySelect } from '../UI/Select/Select';
import { ProductName } from '../StyledUI/ProductName';
import { ProductContent } from '../StyledUI/ProductContent';
import { CustomButton } from '../StyledUI/CustomButton';
import { Price } from '../StyledUI/Price';
import { PageContent } from '../StyledUI/PageContent';
import { MyGrid } from '../StyledUI/MyGrid';
// Misc.
import { formatCurrency, ringImageSelector } from '../../helper';
import { RING_SIZES } from '../../constants';
import { Spacer } from '../StyledUI/Spacer';

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
    dispatch(clearRingBuilder());
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
    onAddToCart(cartItem);
    history.push({ pathname: '/cart' });
  };

  const selectRingSizeHandler = (e: any) => {
    const target = e.target;
    setRingSize(target.value);
  };

  let review = <p>Add Ring and Diamond</p>;
  if (ringData && diamondData) {
    review = (
      <div className={classes.Review}>
        <ProgressBar />
        <PageContent>
          <MyGrid>
            <ProductImageGallery images={ringData.gallery} selectedMetal={ringData.metal} />
            <ProductContent>
              <ProductName>
                {ringData.name} {ringData.metal} {ringData.style}{' '}
                {ringData.style !== 'Solitaire' ? 'Diamond' : null} Ring with {diamondData.carats}{' '}
                Carat {diamondData.shape} Diamond
              </ProductName>
              <Spacer mTop={1} mBot={2}>
                <MySelect
                  header="Ring Size"
                  values={RING_SIZES}
                  name="ringSize"
                  selected={selectRingSizeHandler}
                />
              </Spacer>
              <Price>{formatCurrency(ringData.price + diamondData.price)}</Price>
              <CustomButton primary width="50%" clicked={addToCartHandler}>
                Add to Cart
              </CustomButton>
            </ProductContent>
          </MyGrid>
        </PageContent>
      </div>
    );
  }
  return review;
};

export default Review;
