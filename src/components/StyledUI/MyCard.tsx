import React from 'react';
import styled from 'styled-components';

interface MyCardProps {
  maxWidth?: number;
}

const StyledMyCard = styled.div<MyCardProps>`
  max-width: ${({ maxWidth }) => (maxWidth || 60) + 'rem'};
  padding: 3rem;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.greyLight2};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadow.shadowXxs};
  @media ${({ theme }) => theme.bp.tabPort} {
    margin: 0 1rem;
    padding: 1rem;
  }
`;

export const MyCard: React.FC<MyCardProps> = ({ maxWidth, children }) => {
  return <StyledMyCard maxWidth={maxWidth}>{children}</StyledMyCard>;
};
