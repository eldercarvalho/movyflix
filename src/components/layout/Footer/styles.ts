import styled from 'styled-components';

export const Container = styled.footer`
  position: relative;
  padding: 5rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  h1 {
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 3rem;
    color: #aaa;
    /* font-weight: 500; */
  }

  > a {
    display: block;
    color: #aaa;
    width: 60px;
    font-size: 1rem;

    img {
      margin-top: 0.7rem;
      opacity: 0.8;
      filter: grayscale(100);
      transition: 0.3s;

      :hover {
        filter: grayscale(0);
        opacity: 1;
      }
    }
  }
`;
