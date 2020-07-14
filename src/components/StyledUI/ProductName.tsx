import React from 'react';
import styled from 'styled-components';

interface ProductName {
  fontSize?: number;
}

const StyledProductName = styled.h2<ProductName>`
  font-size: ${({ fontSize }) => (fontSize || 2) + 'rem'};
  color: ${({ theme }) => theme.colors.greyDark3};
`;

export const ProductName: React.FC<ProductName> = ({ fontSize, children }) => {
  return <StyledProductName fontSize={fontSize}>{children}</StyledProductName>;
};
