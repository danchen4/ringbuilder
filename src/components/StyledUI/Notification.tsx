import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

interface NotificationProps {
  cartItems: number;
}

const StyledNotification = styled.div`
  position: absolute;
  top: 0;
  right: 1.1rem;
  width: 1.75rem;
  height: 1.75rem;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: white;
  border-radius: 10rem;
  animation: 1s ${fadeIn} ease-in;
`;

export const Notification: React.FC<NotificationProps> = ({ cartItems }) => {
  return <StyledNotification>{cartItems}</StyledNotification>;
};
