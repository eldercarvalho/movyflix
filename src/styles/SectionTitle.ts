import styled from 'styled-components';

import devices from '../utils/media';

export const SectionTitle = styled.h2`
  position: relative;
  font-weight: 600;
  text-transform: uppercase;
  padding-bottom: 2rem;
  margin-bottom: 5rem;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    background: linear-gradient(to right, ${(props) => props.theme.colors.accent}, #000);
    width: 100%;
    height: 2px;
  }

  @media ${devices.mobileL} {
    font-size: 2rem;
  }
`;
