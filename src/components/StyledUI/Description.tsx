import React from 'react';
import styled from 'styled-components';

interface DescriptionProps {
  fontSize?: number;
}

const StyledDescription = styled.p<DescriptionProps>`
  font-size: ${({ fontSize }) => (fontSize || 1.4) + 'rem'};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.greyDark1};
`;

export const Description: React.FC<DescriptionProps> = ({ fontSize, children }) => {
  return <StyledDescription fontSize={fontSize}>{children}</StyledDescription>;
};
