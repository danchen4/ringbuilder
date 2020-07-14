import React from 'react';
import styled from 'styled-components';

interface MyImage {
  width?: number;
  src: string;
  alt: string;
}

interface StyledMyImage {
  width?: number;
}

const StyledMyImage = styled.img<StyledMyImage>`
  width: ${({ width }) => (width || 80) + '%'};
`;

export const MyImage: React.FC<MyImage> = ({ width, src, alt }) => {
  return <StyledMyImage width={width} src={src} alt={alt} />;
};
