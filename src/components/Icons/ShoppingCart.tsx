import React, { useState } from 'react';

interface ShoppingCartProps {
  /** Hex  or color name for fill color of SVG. */
  fillColor?: string;
  defaultColor?: string;
  width?: string;
  height?: string;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  fillColor = '#000',
  defaultColor = '#000',
  width = '3rem',
  height = '3rem',
}) => {
  const [toggleFillColor, setToggleFillColor] = useState(false);

  return (
    <div
      onMouseEnter={() => setToggleFillColor(true)}
      onMouseLeave={() => setToggleFillColor(false)}
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        aria-labelledby="title"
        width={width}
        height={height}
      >
        <path
          fill={toggleFillColor ? fillColor : defaultColor}
          d="M30.2,80.3h39.5c0.2,0,0.4-0.1,0.6-0.2c0.1-0.2,0.2-0.4,0.2-0.6l-2.4-42.9c0-0.4-0.4-0.7-0.8-0.7h-8.3v-7  c0-5-4.1-9.1-9.1-9.1s-9.1,4.1-9.1,9.1v7h-8.3c-0.4,0-0.8,0.3-0.8,0.7l-2.4,42.9c0,0.2,0.1,0.4,0.2,0.6C29.8,80.2,30,80.3,30.2,80.3  z M42.5,28.8c0-4.1,3.4-7.5,7.5-7.5s7.5,3.4,7.5,7.5v7h-15V28.8z M33.4,37.4h7.5v4.9c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-4.9h15  v4.9c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-4.9h7.5l2.4,41.3H31.1L33.4,37.4z"
        />
      </svg>
    </div>
  );
};
