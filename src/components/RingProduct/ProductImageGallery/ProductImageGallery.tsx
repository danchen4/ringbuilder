import React, { useState, useEffect } from 'react';
//CSS
import classes from './ProductImageGallery.module.scss';
import cn from 'classnames';
// Misc
import { METAL } from '../../../constants';

interface ProductImageGalleryProps {
  /** An array of url paths to images */
  images: string[];
  /** The metal that is selected under product description*/
  selectedMetal?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, selectedMetal }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [ProductImageGallery, setProductImageGallery] = useState<string[]>([]);

  const changeImageHandler = (index: number) => {
    setImageIndex(index);
  };

  useEffect(() => {
    if (selectedMetal === METAL.WHITE) {
      setProductImageGallery(images.slice(0, 3));
    }
    if (selectedMetal === METAL.YELLOW) {
      setProductImageGallery(images.slice(3, 6));
    }
    if (selectedMetal === METAL.ROSE) {
      setProductImageGallery(images.slice(6, 9));
    }
  }, [selectedMetal, images]);

  return (
    <React.Fragment>
      <div className={classes.ProductImageGallery}>
        <div className={classes.ProductImageGallery__gallery}>
          {ProductImageGallery.map((image: string, index: number) => {
            return (
              <img
                key={index}
                className={
                  imageIndex === index
                    ? cn(
                        classes.ProductImageGallery__image,
                        classes.ProductImageGallery__image_selected
                      )
                    : cn(
                        classes.ProductImageGallery__image,
                        classes.ProductImageGallery__image_unselected
                      )
                }
                src={image}
                alt="ring"
                onClick={() => changeImageHandler(index)}
              />
            );
          })}
        </div>
        <img
          className={classes.ProductImageGallery__mainImage}
          src={ProductImageGallery[imageIndex]}
          alt="ring"
        />
      </div>
    </React.Fragment>
  );
};

export default ProductImageGallery;
