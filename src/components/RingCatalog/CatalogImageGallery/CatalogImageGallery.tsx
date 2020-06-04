import React, { useState, useEffect } from 'react';
import classes from './CatalogImageGallery.module.scss';
import cn from 'classnames';
import CatalogMetalSelection from '../../RingCatalog/CatalogMetalSelection/CatalogMetalSelection';
import { METAL } from '../../../constants/rings';

export enum ImageGalleryIndex {
  first,
  second,
  third,
}

interface ImageGalleryProps {
  /** An array of url paths to images */
  images: string[];
  /** An array of avaiable metals for each ring */
  metals: string[];
}

const ImageGallery = ({ images, metals }: ImageGalleryProps) => {
  const [imageIndex, setImageIndex] = useState<ImageGalleryIndex>(0);
  const [metal, setMetal] = useState(METAL.WHITE);
  const [imageGallery, setImageGallery] = useState<string[]>([]);

  const changeImageHandler = (index: number) => {
    setImageIndex(index);
  };

  const metalChangeHandler = (metal: string) => {
    setMetal(metal);
    console.log(metal);
  };

  useEffect(() => {
    if (metal === METAL.WHITE) {
      setImageGallery(images.slice(0, 3));
    }
    if (metal === METAL.YELLOW) {
      setImageGallery(images.slice(3, 6));
    }
    if (metal === METAL.ROSE) {
      setImageGallery(images.slice(6, 9));
    }
  }, [metal, images]);

  return (
    <React.Fragment>
      <img className={classes.mainImage} src={imageGallery[imageIndex]} alt="ring" />
      <div className={classes.gallery}>
        {imageGallery.map((image: string, index: number) => {
          return (
            <img
              key={index}
              className={
                imageIndex === index
                  ? cn(classes.galleryImage, classes.galleryImage__Selected)
                  : cn(classes.galleryImage, classes.galleryImage__Unselected)
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
    </React.Fragment>
  );
};

export default ImageGallery;
