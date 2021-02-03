import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
`;

export const Banners = styled.section`
  position: relative;
  /* height: 80vh; */
  overflow: hidden;

  img {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(77deg, rgba(0, 0, 0, 0.6) 0, rgba(0, 0, 0, 0) 85%);
    pointer-events: none;
    z-index: 1;
  }
`;
