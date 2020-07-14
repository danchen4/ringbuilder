import React from 'react';
// Router
import { useHistory } from 'react-router-dom';
// CSS
import classes from './Home.module.scss';
// Components
import { PageContent } from '../StyledUI/PageContent';
import { CustomButton } from '../StyledUI/CustomButton';
import { Description } from '../StyledUI/Description';
import { Spacer } from '../StyledUI/Spacer';
// Misc.
import dyoImage from '../../images/design_your_own.jpg';

export const Home: React.FC = () => {
  const history = useHistory();

  return (
    <div className={classes.Home}>
      <PageContent>
        <div className={classes.Home__block}>
          <div className={classes.Home__block_left}>
            <h2 className={classes.Home__header}>Design Your Own Ring</h2>
            <Spacer mBot={3}>
              <Description fontSize={1.6}>
                Design the perfect engagement ring exactly the way you want it. Start with a ring
                setting and then add the ideal center stone. Or vice versa - start with a center
                stone and then find the perfect setting to compliment it.
              </Description>
            </Spacer>
            <div className={classes.Home__buttons}>
              <div>
                <CustomButton
                  primary
                  width="90%"
                  fontSize={1.3}
                  clicked={() => history.push({ pathname: '/rings' })}
                >
                  Start With A Ring
                </CustomButton>
              </div>
              <div>
                <CustomButton
                  primary
                  width="90%"
                  fontSize={1.3}
                  clicked={() => history.push({ pathname: '/diamonds' })}
                >
                  Start With A Diamond
                </CustomButton>
              </div>
            </div>
          </div>
          <div className={classes.Home__block_right}>
            <img className={classes.Home__img} src={dyoImage} alt="Design Your Own Ring" />
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default Home;
