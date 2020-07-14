import React, { useEffect, ReactNode } from 'react';
// Router
import { useParams, useHistory } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addDiamond } from '../../store/actions';
import { fetchDiamondProduct } from '../../store/actions';
// CSS
import classes from './DiamondProduct.module.scss';
// Components
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { PageContent } from '../StyledUI/PageContent';
import { ProductContent } from '../StyledUI/ProductContent';
import { ProductName } from '../StyledUI/ProductName';
import { Price } from '../StyledUI/Price';
import { CustomButton } from '../StyledUI/CustomButton';
import { Label } from '../StyledUI/Label';
import { Attribute } from '../StyledUI/Attribute';
import { Spacer } from '../StyledUI/Spacer';
// Misc
import { formatCurrency } from '../../helper';
import { RoundDiamond } from '../Icons/RoundDiamond';
import { OvalDiamond } from '../Icons/OvalDiamond';
import { MyGrid } from '../StyledUI/MyGrid';
import { Backdrop } from '../UI/BackDrop/Backdrop';
import { Spinner } from '../UI/Spinner/Spinner';

interface DiamondProductProps {}

export const DiamondProduct: React.FC<DiamondProductProps> = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { certNumber } = useParams();
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  const diamondData = useSelector((state: any) => state.diamondProduct.diamondProductData);
  const loading = useSelector((state: any) => state.diamondProduct.loading);

  // Load diamond from firebase based on certNumber in teh Router params
  useEffect(() => {
    dispatch(fetchDiamondProduct(certNumber));
  }, [dispatch, certNumber]);

  const addToRingHandler = () => {
    const ringBuilderDiamondData = {
      certNumber: diamondData.certNumber.value,
      lab: diamondData.lab.value,
      carats: diamondData.carats.value,
      shape: diamondData.shape.value,
      clarity: diamondData.clarity.value,
      color: diamondData.color.value,
      price: diamondData.price.value,
    };
    dispatch(addDiamond(ringBuilderDiamondData));
    // if a diamond has not been selected, then direct to ring catalog page, else review page
    if (!ringData) {
      history.push({ pathname: '/rings' });
    } else {
      history.push({ pathname: '/review' });
    }
  };

  let diamondImage: ReactNode | null = null;
  if (diamondData) {
    diamondImage =
      diamondData.shape.value === 'Round' ? (
        <RoundDiamond width="100%" height="100%" />
      ) : (
        <OvalDiamond width="100%" height="100%" />
      );
  }

  let diamondProduct = (
    <React.Fragment>
      <Backdrop />
      <Spinner />
    </React.Fragment>
  );
  if (!loading) {
    diamondProduct = (
      <div className={classes.DiamondProduct}>
        <ProgressBar />
        <PageContent>
          <MyGrid>
            <div className={classes.DiamondProduct__image}>{diamondImage}</div>
            <ProductContent>
              <ProductName>
                {diamondData.carats.value} Carat {diamondData.shape.value} Diamond{' '}
              </ProductName>
              <MyGrid mobileColumns="1fr 1fr">
                {diamondData
                  ? Object.values(diamondData).map((detail: any) => {
                      return (
                        <div key={detail.label}>
                          {detail.label === 'Price' ? null : (
                            <Spacer mBot={0.5}>
                              <Label>{detail.label}:</Label>
                              <Attribute>{detail.value}</Attribute>
                            </Spacer>
                          )}
                        </div>
                      );
                    })
                  : null}
              </MyGrid>
              <Price>{formatCurrency(diamondData.price.value)}</Price>
              <CustomButton primary width="80%" clicked={addToRingHandler}>
                Add To Ring
              </CustomButton>
            </ProductContent>
          </MyGrid>
        </PageContent>
      </div>
    );
  }

  return diamondProduct;
};

export default DiamondProduct;
