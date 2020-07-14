import React from 'react';
import styled from 'styled-components';

interface ProductContent {}

const StyledProductContent = styled.div<ProductContent>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    margin-bottom: 2rem;
  }
`;

export const ProductContent: React.FC<ProductContent> = ({ children }) => {
  return <StyledProductContent>{children}</StyledProductContent>;
};
