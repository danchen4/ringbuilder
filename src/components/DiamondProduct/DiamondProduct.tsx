import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Router
import { useParams, useHistory } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addDiamond } from '../../store/actions';
import { RingBuilderDiamondData } from '../../store/reducers/ringbuilder';
// CSS
import classes from './DiamondProduct.module.scss';
// Components
import ProgressBar from '../ProgressBar/ProgressBar';
// Misc
import { diamondDataToProductObj, formatCurrency } from '../../helper';
import ovalIcon from '../../images/Oval.svg';
import roundIcon from '../../images/Round.svg';

interface DiamondProductProps {}

const initialState = {
  lab: { label: '', value: '' },
  certNumber: { label: '', value: '' },
  shape: { label: '', value: '' },
  carats: { label: '', value: '' },
  color: { label: '', value: '' },
  clarity: { label: '', value: '' },
  cut: { label: '', value: '' },
  symmetry: { label: '', value: '' },
  polish: { label: '', value: '' },
  length: { label: '', value: '' },
  width: { label: '', value: '' },
  depth: { label: '', value: '' },
  tablePer: { label: '', value: '' },
  depthPer: { label: '', value: '' },
  price: { label: '', value: '' },
};

export const DiamondProduct: React.FC<DiamondProductProps> = ({}) => {
  const [diamondData, setDiamondData] = useState<any>(initialState);
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);

  const dispatch = useDispatch();
  const onAddToRing = (diamondData: RingBuilderDiamondData) => {
    dispatch(addDiamond(diamondData));
  };

  let { certNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const queryParams = `?orderBy="$key"&equalTo="${certNumber}"`;
      const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
      const response = await axios.get(url + queryParams);
      const data = await response.data;
      const diamondCatalog = diamondDataToProductObj(data);
      setDiamondData(diamondCatalog);
    })();
  }, [certNumber]);

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
    onAddToRing(ringBuilderDiamondData);
    // if a diamond has not been selected, then direct to ring catalog page, else review page
    if (!ringData) {
      history.push({ pathname: '/rings' });
    } else {
      history.push({ pathname: '/review' });
    }
  };

  console.log('diamondData', diamondData);

  let imageSource = '';
  if (diamondData) {
    imageSource = diamondData.shape.value === 'Round' ? roundIcon : ovalIcon;
  }

  return (
    <div className={classes.DiamondProduct}>
      <ProgressBar />
      <div className={classes.DiamondProduct__grid}>
        <img className={classes.DiamondProduct__image} src={imageSource} alt="diamond" />
        <div className={classes.DiamondProduct__description}>
          <h2 className={classes.DiamondProduct__header}>
            {diamondData.carats.value} Carat {diamondData.shape.value} Diamond{' '}
          </h2>
          <div className={classes.DiamondProduct__details}>
            {diamondData
              ? Object.values(diamondData).map((detail: any) => {
                  return (
                    <>
                      {detail.label === 'Price' ? null : (
                        <div key={detail.label} className={classes.DiamondProduct__data}>
                          <span className={classes.DiamondProduct__label}>{detail.label}: </span>
                          {detail.value}
                        </div>
                      )}
                    </>
                  );
                })
              : null}
          </div>
          <p className={classes.DiamondProduct__price}>{formatCurrency(diamondData.price.value)}</p>
          <button className={classes.DiamondProduct__btn_shop} onClick={addToRingHandler}>
            Add To Ring
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiamondProduct;
