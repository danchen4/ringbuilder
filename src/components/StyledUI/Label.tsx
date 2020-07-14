import React from 'react';
import styled from 'styled-components';

interface Label {
  fontSize?: number;
}

const StyledProductName = styled.span<Label>`
  font-size: ${({ fontSize }) => (fontSize || 1.6) + 'rem'};
  color: ${({ theme }) => theme.colors.greyDark3};
  margin-right: 1rem;
  font-weight: 500;
`;

export const Label: React.FC<Label> = ({ fontSize, children }) => {
  return <StyledProductName fontSize={fontSize}>{children}</StyledProductName>;
};
