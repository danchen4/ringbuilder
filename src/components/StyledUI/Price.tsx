import React from 'react';
import styled from 'styled-components';

interface PriceProps {
  fontSize?: number;
}

const StyledPrice = styled.p<PriceProps>`
  font-size: ${({ fontSize }) => (fontSize || 3) + 'rem'};
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const Price: React.FC<PriceProps> = ({ fontSize, children }) => {
  return <StyledPrice fontSize={fontSize}>{children}</StyledPrice>;
};
