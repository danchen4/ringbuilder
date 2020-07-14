import React from 'react';
import styled from 'styled-components';

interface MyGrid {
  columns?: string;
  mobileColumns?: string;
  gap?: number;
}

const StyledGrid = styled.div<MyGrid>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ columns }) => columns || '1fr 1fr'};
  gap: ${({ gap }) => (gap || 1) + 'rem'};
  @media ${({ theme }) => theme.bp.tabPort} {
    grid-template-columns: ${({ mobileColumns }) => mobileColumns || '1fr'};
  }
`;

export const MyGrid: React.FC<MyGrid> = ({ columns, mobileColumns, gap, children }) => {
  return (
    <StyledGrid columns={columns} mobileColumns={mobileColumns} gap={gap}>
      {children}
    </StyledGrid>
  );
};
