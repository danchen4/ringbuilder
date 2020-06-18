import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addDiamond } from '../../store/actions'

import classes from './DiamondProduct.module.scss';

import { diamondDataToProductObj } from '../../helper';
import { RingBuilderDiamondData } from '../../store/reducers/ringbuilder';
import ProgressBar from '../ProgressBar/ProgressBar';


interface DiamondProductProps {

}

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
}

export const DiamondProduct: React.FC<DiamondProductProps> = ({ }) => {
  const [diamondData, setDiamondData] = useState<any>();
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  
  const dispatch = useDispatch();
  const onAddToRing = (diamondData: RingBuilderDiamondData) => {
    dispatch(addDiamond(diamondData))
  }

  let { certNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const queryParams = `?orderBy="$key"&equalTo="${certNumber}"`
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
    }
    onAddToRing(ringBuilderDiamondData)
    // if a diamond has not been selected, then direct to ring catalog page, else review page
    if (!ringData) {
      history.push({ pathname: '/rings' });
    } else { history.push({ pathname: '/review' }) }
  };

  console.log('diamondData', diamondData);  

  return (
    <div className={classes.DiamondProduct}>
      <ProgressBar />
      <div className={classes.grid}>
      <div>Image</div>
      <div className={classes.description}>
        <h3>Diamond Details</h3>
        {diamondData ? Object.values(diamondData).map((detail:any) => {
          return (<div key={detail.label} className={classes.data}><span className={classes.label}>{detail.label}: </span>{detail.value}</div>)
        }) : null}
      </div>
      <button className={classes.addToCart} onClick={addToRingHandler}>
          Add To Ring
      </button>
      </div>
    </div>
  );
}

export default DiamondProduct