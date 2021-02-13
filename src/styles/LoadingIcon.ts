import { BiLoaderAlt } from 'react-icons/bi';
import styled, { keyframes } from 'styled-components';

const LoadingAnimation = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const LoadingIcon = styled(BiLoaderAlt)`
  animation: ${LoadingAnimation} 1s linear forwards;
`;
