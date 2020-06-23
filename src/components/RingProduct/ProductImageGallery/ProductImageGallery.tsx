import React, { useState, useEffect } from 'react';
import classes from './ProductImageGallery.module.scss';
import cn from 'classnames';
// import MetalSelection from '../MetalSelection/MetalSelection';
import { METAL } from '../../../constants';

export enum ImageGalleryIndex {
  first,
  second,
  third,
}

interface ImageGalleryProps {
  /** An array of url paths to images */
  images: string[];
  /** The metal that is selected under product description*/
  selectedMetal?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, selectedMetal } ) => {
  const [imageIndex, setImageIndex] = useState<ImageGalleryIndex>(0);
  const [imageGallery, setImageGallery] = useState<string[]>([]);

  const changeImageHandler = (index: number) => {
    setImageIndex(index);
  };

  useEffect(() => {
    if (selectedMetal === METAL.WHITE) {
      setImageGallery(images.slice(0, 3));
    }
    if (selectedMetal === METAL.YELLOW) {
      setImageGallery(images.slice(3, 6));
    }
    if (selectedMetal === METAL.ROSE) {
      setImageGallery(images.slice(6, 9));
    }
  }, [selectedMetal, images]);

  return (
    <React.Fragment>
      <div className={classes.imageGallery}>
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
        <img className={classes.mainImage} src={imageGallery[imageIndex]} alt="ring" />
      </div>
    </React.Fragment>
  );
};

export default ImageGallery;
