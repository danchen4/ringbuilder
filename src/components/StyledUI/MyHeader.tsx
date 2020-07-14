import React from 'react';
import styled, { css } from 'styled-components';

interface HeaderType {
  fontSize?: number;
  primary?: boolean;
  secondary?: boolean;
}

const StyledHeaderType = styled.h2<HeaderType>`
  font-size: ${({ fontSize }) => (fontSize || 1.8) + 'rem'};
  ${({ primary }) =>
    primary &&
    css<HeaderType>`
      color: ${({ theme }) => theme.colors.greyDark1};
    `}
  ${({ secondary }) =>
    secondary &&
    css<HeaderType>`
      color: ${({ theme }) => theme.colors.greyLight3};
    `}
`;

export const MyHeader: React.FC<HeaderType> = ({ fontSize, primary, secondary, children }) => {
  return (
    <StyledHeaderType fontSize={fontSize} secondary={secondary} primary={primary}>
      {children}
    </StyledHeaderType>
  );
};
