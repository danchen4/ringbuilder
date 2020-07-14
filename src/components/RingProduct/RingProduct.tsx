import React, { useState, useEffect } from 'react';
// Router
import { useParams, useHistory } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchRingProduct, addRing } from '../../store/actions';
import { RingBuilderRingData } from '../../types';
// CSS
import classes from './RingProduct.module.scss';
// Components
import { ProductImageGallery } from './ProductImageGallery/ProductImageGallery';
import { ProductMetalSelection } from './ProductMetalSelection/ProductMetalSelection';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Spinner } from '../UI/Spinner/Spinner';
import { Backdrop } from '../UI/BackDrop/Backdrop';
import { Price } from '../StyledUI/Price';
import { Description } from '../StyledUI/Description';
import { ProductName } from '../StyledUI/ProductName';
import { ProductType } from '../StyledUI/ProductType';
import { PageContent } from '../StyledUI/PageContent';
import { CustomButton } from '../StyledUI/CustomButton';
import { MyGrid } from '../StyledUI/MyGrid';
import { ProductContent } from '../StyledUI/ProductContent';
// Helpers, constants
import { METAL } from '../../constants';
import { formatCurrency } from '../../helper';

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

  // Loading ring from database based on sku from Router params
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
      center: ringData.center,
    };

    dispatch(addRing(ringBuilderRingData));
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
        <PageContent>
          <MyGrid>
            <ProductImageGallery images={ringData.gallery} selectedMetal={metal} />
            <ProductContent>
              <ProductName>{ringData.name}</ProductName>
              <ProductType>
                {ringData.style !== 'Solitaire' ? 'Diamond' : null} {ringData.style} Ring
              </ProductType>
              <Description>{ringData.description}</Description>
              <ProductMetalSelection
                selectedMetal={metal}
                metals={ringData.metals}
                metalChange={metalChangeHandler}
              />
              <Price>{formatCurrency(ringData.price)}</Price>
              <CustomButton primary width="50%" clicked={addToRingHandler}>
                Add To Ring
              </CustomButton>
            </ProductContent>
          </MyGrid>
        </PageContent>
      </div>
    );
  }

  return ringProduct;
};

export default RingProduct;
