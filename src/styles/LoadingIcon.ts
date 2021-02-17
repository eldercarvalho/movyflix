import { BiLoaderAlt } from 'react-icons/bi';
import styled, { css, keyframes } from 'styled-components';

const LoadingAnimation = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

interface LoadingIcon {
  screenCenter?: boolean;
}

export const LoadingIcon = styled(BiLoaderAlt)<LoadingIcon>`
  animation: ${LoadingAnimation} 1s linear forwards infinite;
  fill: ${({ theme }) => theme.colors.accent};

  ${({ screenCenter }) =>
    screenCenter &&
    css`
      position: absolute;
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;
      animation: ${LoadingAnimation} 1s linear forwards infinite;
    `}
`;
