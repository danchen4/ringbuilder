import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classes from './Review.module.scss'

import { addToCart } from '../../store/actions'
import { ringDataToArray } from '../../helper';


interface ReviewProps {

}

export const Review: React.FC<ReviewProps> = ({ }) => {
  const dispatch = useDispatch();
  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);

  // const onAddToCart = (ringSku: string, diamondCert: number) => {
  //   dispatch(addToCart(ringSku, diamondCert))
  // }

  //   onAddToCart({
  //     sku: ringData.sku,
  //     image: ringData.gallery[0],
  //     name: ringData.name,
  //     style: ringData.style,
  //     metal: metal,
  //     price: ringData.price,
  //   });

  console.log(ringData);
  console.log(diamondData);

  return (
    <div>
    <h1>Review Page</h1>
      <p>{ringData ? ringData.sku : null}</p>
      <p>{diamondData? diamondData.certNumber : null}</p>
    </div>
  );
}

export default Review