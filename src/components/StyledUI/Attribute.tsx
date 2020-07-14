import React from 'react';
import styled from 'styled-components';

interface Attribute {
  fontSize?: number;
}

const StyledProductName = styled.span<Attribute>`
  font-size: ${({ fontSize }) => (fontSize || 1.6) + 'rem'};
  color: ${({ theme }) => theme.colors.greyDark1};
  font-weight: 500;
`;

export const Attribute: React.FC<Attribute> = ({ fontSize, children }) => {
  return <StyledProductName fontSize={fontSize}>{children}</StyledProductName>;
};
