import React from 'react';
// Router
import { useHistory } from 'react-router-dom';
// CSS
import classes from './Home.module.scss';
// Misc.
import dyoImage from '../../images/design_your_own.jpg';
import { Button } from '../UI/Button/Button';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const history = useHistory();

  return (
    <div className={classes.Home}>
      <div className={classes.Home__block}>
        <div className={classes.Home__block_left}>
          <h2 className={classes.Home__header}>Design Your Own Ring</h2>
          <div className={classes.Home__description}>
            Design the perfect engagement ring exactly the way you want it. Start with a ring
            setting and then add the ideal center stone. Or vice versa - start with a center stone
            and then find the perfect setting to compliment it.
          </div>
          <div className={classes.Home__buttons}>
            <div>
              <button
                className={classes.Home__btn_shop}
                onClick={() => history.push({ pathname: '/rings' })}
              >
                Start With A Ring
              </button>
            </div>
            <div>
              <button
                className={classes.Home__btn_shop}
                onClick={() => history.push({ pathname: '/diamonds' })}
              >
                Start With A Diamond
              </button>
            </div>
          </div>
        </div>
        <div className={classes.Home__block_right}>
          <img className={classes.Home__img} src={dyoImage} alt="Design Your Own Ring" />
        </div>
      </div>
    </div>
  );
};

export default Home;
