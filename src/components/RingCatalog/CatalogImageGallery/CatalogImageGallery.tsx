import React, { useState, useEffect } from 'react';
// CSS
import classes from './CatalogImageGallery.module.scss';
import cn from 'classnames';
// Components
import CatalogMetalSelection from '../../RingCatalog/CatalogMetalSelection/CatalogMetalSelection';
// Misc.
import { METAL } from '../../../constants/rings';

interface CatalogImageGalleryProps {
  /** An array of url paths of images */
  images: string[];
  /** An array of avaiable metals for each ring */
  metals: string[];
}

const CatalogImageGallery = ({ images, metals }: CatalogImageGalleryProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [metal, setMetal] = useState(METAL.WHITE);
  const [CatalogImageGallery, setCatalogImageGallery] = useState<string[]>([]);

  const changeImageHandler = (index: number) => {
    setImageIndex(index);
  };

  const metalChangeHandler = (metal: string) => {
    setMetal(metal);
  };

  useEffect(() => {
    if (metal === METAL.WHITE) {
      setCatalogImageGallery(images.slice(0, 3));
    }
    if (metal === METAL.YELLOW) {
      setCatalogImageGallery(images.slice(3, 6));
    }
    if (metal === METAL.ROSE) {
      setCatalogImageGallery(images.slice(6, 9));
    }
  }, [metal, images]);

  return (
    <div className={classes.CatalogImageGallery}>
      <img
        className={classes.CatalogImageGallery__mainImage}
        src={CatalogImageGallery[imageIndex]}
        alt="ring"
      />
      <div className={classes.CatalogImageGallery__gallery}>
        {CatalogImageGallery.map((image: string, index: number) => {
          return (
            <img
              key={index}
              className={
                imageIndex === index
                  ? cn(
                      classes.CatalogImageGallery__image,
                      classes.CatalogImageGallery__image_selected
                    )
                  : cn(
                      classes.CatalogImageGallery__image,
                      classes.CatalogImageGallery__image_unselected
                    )
              }
              src={image}
              alt="ring"
              onClick={() => changeImageHandler(index)}
            />
          );
        })}
      </div>
      <CatalogMetalSelection
        selectedMetal={metal}
        metals={metals}
        metalChange={metalChangeHandler}
      />
    </div>
  );
};

export default CatalogImageGallery;
