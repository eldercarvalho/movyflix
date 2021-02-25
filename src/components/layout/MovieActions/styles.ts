import styled from 'styled-components';

import devices from '../../../utils/media';

export const Container = styled.div`
  span {
    display: inline-block;

    & + span {
      margin-left: 1.6rem;
    }
  }

  @media ${devices.mobileL} {
    position: relative;
    text-align: center;
  }
`;

export const ModalContent = styled.div`
  h2 {
    margin-bottom: 2rem;
    font-weight: 600;
  }

  p {
    font-size: 1.6rem;

    & + p {
      margin-top: 1.6rem;
    }
  }
`;
