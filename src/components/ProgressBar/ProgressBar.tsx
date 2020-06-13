import React from 'react'
import classes from './ProgressBar.module.scss'
import {Link, useLocation, useHistory} from 'react-router-dom'

interface ProgressBarProps {

}

export const ProgressBar: React.FC<ProgressBarProps> = ({ }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.ProgressBar}>
      <div className={classes.bar}>
        <div className={classes.block}>
          <div>Design Your Ring</div>
          <span className={classes.arrow}></span>
        </div>
        <div className={classes.block}>
          <div className={classes.step}>1.</div>
          <div className={classes.content}>
            <h4>Ring</h4>
            <div className={classes.description}>Description</div>
            <div className={classes.links}>
              <Link to="/">View</Link>
              <Link to="/">Change</Link>
            </div>
          </div>
          <div className={classes.image}>image</div>
          <span className={classes.arrow}></span>
        </div>
        <div className={classes.block}>
          <div className={classes.step}>2.</div>
          <div className={classes.content}>
            <h4>Diamond</h4>
            <div className={classes.description}>Description</div>
            <div className={classes.links}>
              <Link to="/">View</Link>
              <Link to="/">Change</Link>
            </div>
            
          </div>
          <div className={classes.image}>image</div>
          <span className={classes.arrow}></span>
        </div>
        <div className={classes.block}>
          <div className={classes.step}>3.</div>
          <div className={classes.content_last}>
            <h4>Review Ring</h4>
            <div className={classes.description}>Complete Ring</div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default ProgressBar