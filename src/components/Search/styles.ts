import styled, { css } from 'styled-components';

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
