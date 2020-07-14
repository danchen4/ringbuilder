import React from 'react';
import styled from 'styled-components';

interface PageContent {}

const StyledPageContent = styled.div<PageContent>`
  margin: 3rem 0 5rem 0;
  padding: 0 2rem;
  @media ${({ theme }) => theme.bp.tabPort} {
    margin: 3rem 0;
    padding: 0 0.8rem;
  }
`;

export const PageContent: React.FC<PageContent> = ({ children }) => {
  return <StyledPageContent>{children}</StyledPageContent>;
};
