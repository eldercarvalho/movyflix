import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  margin: auto;
`;

export const Content = styled.div`
  padding: 0 6rem;
`;

export const Section = styled.section`
  margin-bottom: 6rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 4rem 2.2rem;
  margin-bottom: 4rem;

  a {
    display: block;

    img {
      border-radius: 3px;
    }
  }
`;
