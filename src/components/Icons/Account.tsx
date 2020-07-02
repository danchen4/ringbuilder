import React, { useState } from 'react';

interface AccountProps {
  /** Hex  or color name for fill color of SVG.  Default is #000 */
  fillColor?: string;
  defaultColor?: string;
  width?: string;
  height?: string;
}

export const Account: React.FC<AccountProps> = ({
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
        <g>
          <path
            fill={toggleFillColor ? fillColor : defaultColor}
            d="M62.1,55.2c-0.3,0.4-0.2,0.8,0.2,1.1l8.1,5.8c1.6,1,2.2,3,1.4,4.6L68,73.5c-0.6,1.3-1.9,2.2-3.4,2.2H35.3   c-1.4,0-2.8-0.8-3.4-2.2l-3.7-6.7C27.4,65.1,28,63,29.7,62l8-5.7c0.4-0.3,0.4-0.7,0.2-1.1c-0.3-0.4-0.7-0.4-1.1-0.2l-8,5.7   c-2.3,1.4-3.1,4.3-2,6.7l3.7,6.7c0.9,1.9,2.7,3.1,4.8,3.1h29.3c2.1,0,3.9-1.2,4.8-3l3.8-6.8c1.1-2.4,0.2-5.3-2-6.6l-8-5.7   C62.9,54.8,62.4,54.9,62.1,55.2z"
          />
          <path
            fill={toggleFillColor ? fillColor : defaultColor}
            d="M50,56.2c7.4,0,13.9-8.5,13.9-18.2c0-8.8-5.8-15.2-13.9-15.2c-8,0-13.9,6.4-13.9,15.2C36.1,47.7,42.6,56.2,50,56.2z    M50,24.4c7.1,0,12.3,5.7,12.3,13.6c0,8.7-5.9,16.6-12.3,16.6c-6.4,0-12.3-7.9-12.3-16.6C37.7,30.1,42.9,24.4,50,24.4z"
          />
        </g>
      </svg>
    </div>
  );
};
