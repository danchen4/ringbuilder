import React from 'react';
import styled from 'styled-components';

interface Spacer {
  mBot?: number;
  mTop?: number;
}

const StyledProductName = styled.div<Spacer>`
  margin-top: ${({ mTop }) => (mTop || 0) + 'rem'};
  margin-bottom: ${({ mBot }) => (mBot || 1) + 'rem'};
`;

export const Spacer: React.FC<Spacer> = ({ mBot, mTop, children }) => {
  return (
    <StyledProductName mBot={mBot} mTop={mTop}>
      {children}
    </StyledProductName>
  );
};
