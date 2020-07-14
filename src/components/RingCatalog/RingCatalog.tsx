import React, { useState, useEffect, useRef } from 'react';
// Router
import { useRouteMatch, useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchRingCatalog } from '../../store/actions';
import { RingData } from '../../types';
// CSS
import classes from './RingCatalog.module.scss';
// Misc.
import { formatCurrency, filterArrayObject } from '../../helper';
import { RING_PRICE_SORT_LABEL } from '../../constants/rings';
// Components
import { RingCatalogFilter } from './RingCatalogFilter/RingCatalogFilter';
import { CatalogImageGallery } from './CatalogImageGallery/CatalogImageGallery';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Card } from '../UI/Card/Card';
import { Price } from '../StyledUI/Price';
import { Spacer } from '../StyledUI/Spacer';
import { ProductType } from '../StyledUI/ProductType';
import { ProductName } from '../StyledUI/ProductName';
import { PageContent } from '../StyledUI/PageContent';
import { CustomButton } from '../StyledUI/CustomButton';
import { Spinner } from '../UI/Spinner/Spinner';

const RingCatalog: React.FC = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ringStyleFilter, setRingStyleFilter] = useState('All');
  const [ringShapeFilter, setRingShapeFilter] = useState('All');
  const fullCatalog = useSelector((state: any) => state.ringCatalog.ringCatalogData);
  const loading = useSelector((state: any) => state.ringCatalog.loading);
  const diamondData = useSelector((state: any) => state.ringBuilder.diamondData);
  let diamondShapes = useRef<string[]>(['All', 'Round', 'Oval']); // ref to store mutable variable to limit selection of rings based on diamond shape selected

  // Retrieve ring catalog from firebase on mount
  useEffect(() => {
    dispatch(fetchRingCatalog());
  }, [dispatch]);

  // Set ring catalog to local state after loaded from firebase
  useEffect(() => {
    setCatalog(fullCatalog);
  }, [fullCatalog]);

  useEffect(() => {
    // Only allow selection of rings based on shape of center diamond selected.  For e.g., if a Round diamond is selected, only allow selection of rings with Round center stone
    if (diamondData) {
      setRingShapeFilter(diamondData.shape);
      diamondShapes.current = [diamondData.shape];
    }
  }, [diamondData]);

  // Anytime a filter is changed, update the local state
  useEffect(() => {
    const filters = {
      style(style: string) {
        return style === ringStyleFilter || ringStyleFilter === 'All';
      },
      center(center: string) {
        return center === ringShapeFilter || ringShapeFilter === 'All';
      },
    };
    // filter the array based on selection
    const filteredCatalog = filterArrayObject(fullCatalog, filters);
    setCatalog(filteredCatalog);
  }, [ringStyleFilter, ringShapeFilter, fullCatalog]);

  const filterStyleHandler = (e: any) => {
    let target = e.target;
    setRingStyleFilter(target.value);
  };

  const filterShapeHandler = (e: any) => {
    let target = e.target;
    setRingShapeFilter(target.value);
  };

  const selectSortHandler = (e: any) => {
    const target = e.target;
    const catalogCopy = [...catalog];
    const sortedCatalog = catalogCopy.sort((a, b) => {
      if (target.value === RING_PRICE_SORT_LABEL.HIGHTOLOW) {
        return b.price - a.price;
      }
      return a.price - b.price;
    });
    setCatalog(sortedCatalog);
  };

  return (
    <div className={classes.RingCatalog}>
      <ProgressBar />
      <PageContent>
        <RingCatalogFilter
          filterStyle={filterStyleHandler}
          filterShape={filterShapeHandler}
          selectSort={selectSortHandler}
          ringStyleSelected={ringStyleFilter}
          ringShapeSelected={ringShapeFilter}
          diamondShapes={diamondShapes.current}
        />
        {loading ? (
          <Spinner />
        ) : (
          catalog.map((product: RingData) => {
            return (
              <Card key={product.sku}>
                <CatalogImageGallery images={product.gallery} metals={product.metals} />
                <Spacer mBot={0.5} mTop={0.5}>
                  <ProductName>{product.name}</ProductName>
                </Spacer>
                <ProductType fontSize={1.4} secondary>
                  {product.style} {product.style !== 'Solitaire' ? 'Diamond' : null} Ring
                </ProductType>
                <Spacer mBot={0.5} mTop={0.5}>
                  <Price fontSize={1.6}>{formatCurrency(product.price)}</Price>
                </Spacer>
                <CustomButton
                  text
                  clicked={() =>
                    history.push({
                      pathname: `${url}/${product.sku}`,
                    })
                  }
                >
                  Shop Now
                </CustomButton>
              </Card>
            );
          })
        )}
      </PageContent>
    </div>
  );
};

export default RingCatalog;
