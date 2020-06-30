import React, { useEffect } from 'react';
import cn from 'classnames';
// CSS
import classes from './ProgressBar.module.scss';
// Router
import { Link, useLocation } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { ringBuilderCheckData, removeRing, removeDiamond } from '../../store/actions';

// Misc.
import { formatCurrency, ringImageSelector } from '../../helper';
import ovalIcon from '../../images/Oval.svg';
import roundIcon from '../../images/Round.svg';
import ringIcon from '../../images/solitaire.svg';
import { RoundDiamond } from '../UI/SVG/RoundDiamond';
import { OvalDiamond } from '../UI/SVG/OvalDiamond';

interface ProgressBarProps {}

export const ProgressBar: React.FC<ProgressBarProps> = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const ringData = useSelector((state: any) => state.ringBuilder.ringData);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);

  useEffect(() => {
    dispatch(ringBuilderCheckData());
  }, [dispatch]);

  const removeRingHandler = () => {
    dispatch(removeRing());
  };

  const removeDiamondHandler = () => {
    dispatch(removeDiamond());
  };

  // Ring progress bar if ring has NOT been selected
  let ringProgress = (
    <React.Fragment>
      <div className={classes.ProgressBar__content}>
        <h4 className={classes.ProgressBar__header_empty}>Choose Ring</h4>
      </div>
      <div className={classes.ProgressBar__image}>
        <img className={classes.ProgressBar__image_ring} src={ringIcon} alt="ring" />
      </div>
    </React.Fragment>
  );
  // Ring progress bar if ring has been selected
  if (ringData) {
    ringProgress = (
      <React.Fragment>
        <div className={classes.ProgressBar__content}>
          <h4 className={classes.ProgressBar__header}>Ring</h4>
          <div className={classes.ProgressBar__description}>
            {ringData.name} {ringData.style !== 'Solitaire' ? 'Diamond' : null} Ring -
            {formatCurrency(ringData.price)}
          </div>
          <div className={classes.ProgressBar__links}>
            <Link to={`/rings/${ringData.sku}`}>View</Link>
            <Link to="/rings" onClick={removeRingHandler}>
              Change
            </Link>
          </div>
        </div>
        <div className={classes.ProgressBar__image}>
          <img
            className={classes.ProgressBar__image_ring}
            src={ringData.gallery[ringImageSelector(ringData.metal)]}
            alt="ring"
          />
        </div>
      </React.Fragment>
    );
  }

  // diamond progress bar if diamond has NOT been selected
  let diamondProgress = (
    <React.Fragment>
      <div className={classes.ProgressBar__content}>
        <h4 className={classes.ProgressBar__header_empty}>Choose Diamond</h4>
      </div>
      <div className={classes.ProgressBar__image}>
        <RoundDiamond />
      </div>
    </React.Fragment>
  );
  // diamond progress bar if diamond has been selected
  if (diamondData) {
    diamondProgress = (
      <React.Fragment>
        <div className={classes.ProgressBar__content}>
          <h4 className={classes.ProgressBar__header}>Diamond</h4>
          <div className={classes.ProgressBar__description}>
            {diamondData.carats} Carat {diamondData.shape} - {formatCurrency(diamondData.price)}
          </div>
          <div className={classes.ProgressBar__links}>
            <Link to={`/diamonds/${diamondData.certNumber}`}>View</Link>
            <Link to="/diamonds" onClick={removeDiamondHandler}>
              Change
            </Link>
          </div>
        </div>
        <div className={classes.ProgressBar__image}>
          {diamondData.shape === 'Round' ? <RoundDiamond /> : <OvalDiamond />}
        </div>
      </React.Fragment>
    );
  }

  // diamond progress bar if diamond has NOT been selected
  let reviewProgress = (
    <React.Fragment>
      <div className={classes.ProgressBar__content_last}>
        <h4 className={classes.ProgressBar__header_empty}>Review</h4>
      </div>
    </React.Fragment>
  );
  // diamond progress bar if diamond has been selected
  if (ringData && diamondData) {
    reviewProgress = (
      <React.Fragment>
        <div className={classes.ProgressBar__content_last}>
          <h4 className={classes.ProgressBar__header}>Review</h4>
          <div className={classes.ProgressBar__links}>
            <Link to="/review">Complete</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.ProgressBar}>
      <div className={classes.ProgressBar__bar}>
        <div className={cn(classes.ProgressBar__block, classes.ProgressBar__block_first)}>
          <h4 className={classes.ProgressBar__header}>Design Your Ring</h4>
        </div>
        <div
          className={cn({
            [classes.ProgressBar__block]: true,
            [classes.ProgressBar__block_highlight]: pathname.includes('rings'),
          })}
        >
          <div className={classes.ProgressBar__step}>1.</div>
          {ringProgress}
        </div>
        <div
          className={cn({
            [classes.ProgressBar__block]: true,
            [classes.ProgressBar__block_highlight]: pathname.includes('diamonds'),
          })}
        >
          <div className={classes.ProgressBar__step}>2.</div>
          {diamondProgress}
        </div>
        <div
          className={cn({
            [classes.ProgressBar__block]: true,
            [classes.ProgressBar__block_highlight]: pathname.includes('review'),
          })}
        >
          <div className={classes.ProgressBar__step}>3.</div>
          {reviewProgress}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
