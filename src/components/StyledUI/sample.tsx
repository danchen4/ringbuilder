import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ButtonPrimary = styled.button<StyledButton>`
  width: ${({ width }) => width || '100%'};
  padding: 1rem 2rem;
  color: red;
  outline: none;
  border: 2px solid black;
  background-color: #808080;
  animation: 2s ${fadeIn} ease-in;
  ${({ primary }) =>
    primary &&
    css<StyledButton>`
      color: white;
      background-color: ${({ bgColor }) => bgColor};
    `}
  &:hover {
    color: white;
    background-color: purple;
  }

  .someClass {
    color: blue;
  }
`;

// adding attributes
const StyledLink = styled.a.attrs((props) => ({
  target: '_blank',
}))`
  color: violet;
  font-size: 1.5rem;
  text-decoration: none;
`;

const OutterWrapper = styled.div`
  width: 100%;
  margin: 2rem;
  background-color: blueviolet;

  &:hover ${ButtonPrimary} {
    color: yellow;
  }
`;

const ButtonSecondary = styled(ButtonPrimary)`
  color: yellow;
  background-color: blue;
  border: 1px solid grey;
`;

const StyledRouterLink = styled(Link)`
  color: red;
  text-decoration: none;
  font-size: 2rem;
`;

const PaginationWrapper = styled.div<StyledButton>`
  display: flex;
  width: 100%;
  flex-direction: ${({ flexColumn }) => (flexColumn ? 'column' : 'row')};
  justify-content: ${({ page }) => {
    if (page === 'first') return 'flex-end';
    else if (page === 'middle') return 'space-between';
    else return 'flex-start';
  }};
`;

interface StyledButton {
  primary?: boolean;
  bgColor?: string;
  width?: string;
  page?: string;
  flexColumn?: boolean;
}

export const StyledButton: React.FC<StyledButton> = ({
  primary = false,
  bgColor = 'white',
  width,
  page,
  children,
}) => {
  return (
    <>
      <PaginationWrapper page="first" flexColumn>
        <OutterWrapper>
          <ButtonPrimary primary={primary} bgColor={bgColor} width={width}>
            <p className="someClass">Poops</p>
            {children}
          </ButtonPrimary>
        </OutterWrapper>
        <ButtonSecondary>{children}</ButtonSecondary>
        <StyledLink href="https://www.google.com">One Link</StyledLink>
        <StyledLink href="https://www.google.com">Second Link</StyledLink>
      </PaginationWrapper>
    </>
  );
};
