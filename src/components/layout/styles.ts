import styled, { css } from 'styled-components';

interface LayoutContainerProps {
  bgImage: string | null;
}

export const LayoutContainer = styled.div<LayoutContainerProps>`
  position: relative;

  ${({ bgImage }) =>
    bgImage &&
    css`
      background: url(${bgImage}) center no-repeat;
      background-size: cover;

      ::before {
        content: '';
        position: absolute;
        backdrop-filter: blur(8px);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
      }
    `}
`;

export const MainContainer = styled.main`
  position: relative;
  z-index: 1;
`;
