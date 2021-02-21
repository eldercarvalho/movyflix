import styled, { css } from 'styled-components';

import devices from '../utils/media';

interface ContentProps {
  headerOffset?: boolean;
}

export const Content = styled.div<ContentProps>`
  padding: 0 6rem;
  min-height: 100vh;

  ${({ headerOffset }) =>
    headerOffset &&
    css`
      padding-top: 10rem;
    `}

  @media ${devices.laptopM} {
    padding: 0 4rem;

    ${({ headerOffset }) =>
      headerOffset &&
      css`
        padding-top: 8rem;
      `}
  }

  @media ${devices.tablet} {
    padding: 0 1.6rem;

    ${({ headerOffset }) =>
      headerOffset &&
      css`
        padding-top: 7rem;
      `}
  }

  @media ${devices.mobileL} {
    ${({ headerOffset }) =>
      headerOffset &&
      css`
        padding-top: 7rem;
      `}
  }
`;
