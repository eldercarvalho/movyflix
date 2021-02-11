import styled, { css, keyframes } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  margin-left: auto;

  .search-field {
    opacity: 0;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: 0.3s;

    ${({ isActive }) =>
      isActive &&
      css`
        width: 250px;
        opacity: 1;
      `}
  }

  button {
    position: relative;
    z-index: 1;
  }
`;

const LoadingAnimation = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const SearchLoading = styled(BiLoaderAlt)`
  animation: ${LoadingAnimation} 1s linear forwards;
`;
