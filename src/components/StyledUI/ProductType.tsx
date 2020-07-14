import React from 'react';
import styled, { css } from 'styled-components';

interface ProductType {
  fontSize?: number;
  secondary?: boolean;
}

const StyledProductType = styled.p<ProductType>`
  font-size: ${({ fontSize }) => (fontSize || 1.8) + 'rem'};
  color: ${({ theme }) => theme.colors.greyDark1};
  ${({ secondary }) =>
    secondary &&
    css<ProductType>`
      color: ${({ theme }) => theme.colors.greyLight3};
    `}
`;

export const ProductType: React.FC<ProductType> = ({ fontSize, secondary, children }) => {
  return (
    <StyledProductType fontSize={fontSize} secondary={secondary}>
      {children}
    </StyledProductType>
  );
};
