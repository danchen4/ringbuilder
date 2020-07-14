import React from 'react';
import styled, { css } from 'styled-components';

interface CustomButton {
  fontSize?: number;
  primary?: boolean;
  text?: boolean;
  width?: string;
  clicked(): void;
}

interface StyledButton {
  fontSize?: number;
  primary?: boolean;
  text?: boolean;
  width?: string;
}

const StyledButton = styled.button<StyledButton>`
  font-size: ${({ fontSize }) => (fontSize || 1.6) + 'rem'};
  width: ${({ width }) => width || '100%'};
  cursor: pointer;
  padding: 1rem 2rem;
  outline: none;
  ${({ primary }) =>
    primary &&
    css<StyledButton>`
      color: ${({ theme }) => theme.colors.greyLight1};
      background-color: ${({ theme }) => theme.colors.primaryDark};
      border: 2px solid #000;
      box-shadow: ${({ theme }) => theme.shadow.shadowSm};

      @media ${({ theme }) => theme.bp.tabPort} {
        width: 100%;
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-0.2rem);
        box-shadow: ${({ theme }) => theme.shadow.shadowMd};
      }

      &:focus {
        transform: translateY(0);
        box-shadow: ${({ theme }) => theme.shadow.shadowSm};
      }
    `}
  ${({ text }) =>
    text &&
    css<StyledButton>`
      border: none;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.secondary};
      text-decoration: none;

      @media ${({ theme }) => theme.bp.tabPort} {
        width: 100%;
      }

      &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
        text-decoration: underline;
      }
    `}
`;

export const CustomButton: React.FC<CustomButton> = ({
  primary = false,
  text = false,
  fontSize,
  width,
  clicked,
  children,
}) => {
  return (
    <>
      <StyledButton
        primary={primary}
        text={text}
        width={width}
        fontSize={fontSize}
        onClick={clicked}
      >
        {children}
      </StyledButton>
    </>
  );
};
