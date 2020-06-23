import React, {useEffect} from 'react'
import cn from 'classnames';
// CSS
import classes from './ProgressBar.module.scss'
// Router
import { Link, useLocation, useHistory } from 'react-router-dom'
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { ringBuilderCheckData, removeRing, removeDiamond } from '../../store/actions';

// Misc.
import { formatCurrency, ringImageSelector } from '../../helper'
import ovalIcon from '../../images/Oval.svg';
import roundIcon from '../../images/Round.svg';
import ringIcon from '../../images/solitaire.svg';

interface ProgressBarProps {}

export const ProgressBar: React.FC<ProgressBarProps> = ({ }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // console.log('progressBar', { ringData, diamondData });


  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);

  useEffect(() => {
    dispatch(ringBuilderCheckData())
  }, [dispatch])

  const removeRingHandler = () => {
    dispatch(removeRing());
  }

  const removeDiamondHandler = () => {
    dispatch(removeDiamond());
  }

  // Ring progress bar if ring has NOT been selected
  let ringProgress = (
    <React.Fragment>
    <div className={classes.content}>
        <div className={classes.header_empty}>Choose A Ring</div>
    </div>
    <div className={classes.image}>
      <img className={classes.image__ring} src={ringIcon} alt="ring" />
      </div>
    </React.Fragment>
  );
  // Ring progress bar if ring has been selected
  if (ringData) {
    ringProgress = (
      <React.Fragment>
      <div className={classes.content}>
        <h4>{ringData.name}</h4>
          <div className={classes.description}>{ringData.style !== 'Solitaire' ? 'Diamond' : null} {ringData.style} Ring - {formatCurrency(ringData.price)}</div>
        <div className={classes.links}>
          <Link to={`/rings/${ringData.sku}`}>View</Link>
          <Link to="/rings" onClick={removeRingHandler}>Change</Link>
        </div>
      </div>
      <div className={classes.image}>
          <img className={classes.image__ring} src={ringData.gallery[ringImageSelector(ringData.metal)]} alt="ring" />
      </div>
      </React.Fragment>
    )
  }

  // diamond progress bar if diamond has NOT been selected
  let diamondProgress = (
    <React.Fragment>
      <div className={classes.content}>
        <div className={classes.header_empty}>Choose A Diamond</div>
      </div>
      <div className={classes.image}>
        <img className={classes.image__diamond} src={roundIcon} alt="diamond" />
      </div>
    </React.Fragment>
  );
  // diamond progress bar if diamond has been selected
  if (diamondData) {
    diamondProgress = (
      <React.Fragment>
        <div className={classes.content}>
          <h4>Diamond</h4>
          <div className={classes.description}>{diamondData.carats} Carat {diamondData.shape} - {formatCurrency(diamondData.price)}</div>
          <div className={classes.links}>
            <Link to={`/diamonds/${diamondData.certNumber}`}>View</Link>
            <Link to="/diamonds" onClick={removeDiamondHandler}>Change</Link>
          </div>
        </div>
        <div className={classes.image}>
          <img className={classes.image__diamond} src={diamondData.shape === 'Round'? roundIcon: ovalIcon} alt="diamond" />
        </div>
      </React.Fragment>
    )
  }

  // diamond progress bar if diamond has NOT been selected
  let reviewProgress = (
    <React.Fragment>
      <div className={classes.content_last}>
        <h4>Review Ring</h4>
      </div>
    </React.Fragment>
  );
  // diamond progress bar if diamond has been selected
  if (ringData && diamondData) {
    reviewProgress = (
      <React.Fragment>
        <div className={classes.content_last}>
          <h4>Review Ring</h4>
          <div className={classes.links}>
            <Link to="/review">Complete Ring</Link>
          </div>
        </div>
      </React.Fragment>
    )
  }


  return (
    <div className={classes.ProgressBar}>
      <div className={classes.bar}>
        <div className={classes.block}>
          <div>Design Your Ring</div>
        </div>
        <div className={
          cn({
            [classes.block]: true,
            [classes.block_highlight]: pathname.includes('rings')
          })}>
          <div className={classes.step}>1.</div>
          {ringProgress}
        </div>
        <div className={
          cn({
            [classes.block]: true,
            [classes.block_highlight]: pathname.includes('diamonds')
          })}>
          <div className={classes.step}>2.</div>
          {diamondProgress}
        </div>
        <div className={
          cn({
            [classes.block]: true,
            [classes.block_highlight]: pathname.includes('review')
          })}>
          <div className={classes.step}>3.</div>
          <div className={classes.content_last}>
            {reviewProgress}
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default ProgressBar