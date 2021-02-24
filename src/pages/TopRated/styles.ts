import { animated } from 'react-spring';
import styled from 'styled-components';
import { Container as MovieActionsContainer } from '../../components/layout/MovieActions/styles';
import devices from '../../utils/media';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const AnimatedLi = styled(animated.li)`
  position: relative;
  display: flex;
  align-items: center;
  transition: transform 0.3s;

  & + li {
    margin-top: 3rem;
  }

  :hover {
    transform: scale(1.1) !important;

    a {
      border-color: ${({ theme }) => theme.colors.accent};
    }

    ${MovieActionsContainer} {
      opacity: 1;
      left: 0;
    }
  }

  strong {
    font-size: 2.4rem;
    margin-right: 1.6rem;
    color: rgba(255, 255, 255, 0.8);
  }

  ${MovieActionsContainer} {
    position: relative;
    transition: all 0.3s;
    opacity: 0;
    left: 50px;
  }

  @media ${devices.tablet} {
    ${MovieActionsContainer} {
      left: auto;
      opacity: 1;
    }
  }

  @media ${devices.mobileL} {
    ${MovieActionsContainer} {
      left: 0;
      margin: 1rem 0 0;
    }

    strong {
      font-size: 1.8rem;
      margin-right: 1rem;
    }
  }
`;

export const Movie = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #111;
  padding: 1.6rem;
  border-radius: 3px;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s;
  cursor: pointer;

  img {
    flex-shrink: 0;
  }

  div {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 3rem;

    h2 {
      max-width: 400px;
      width: 100%;
      font-size: 2.2rem;
      color: rgba(255, 255, 255, 0.8);

      span {
        font-weight: 300;
      }
    }

    > span {
      display: flex;
      align-items: center;
      font-size: 2.6rem;
      margin-left: 5rem;
      color: ${({ theme }) => theme.colors.warning};
      font-weight: 500;

      svg {
        fill: ${({ theme }) => theme.colors.warning};
        margin-right: 1rem;
      }
    }
  }

  @media ${devices.tablet} {
    img {
      width: 100px;
    }

    div {
      h2 {
        font-size: 2rem;
      }
    }
  }

  @media ${devices.mobileL} {
    > div {
      margin-left: 1.6rem;
      flex-direction: column;
      justify-content: center;

      h2 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
      }

      span {
        font-size: 1.6rem;
        margin-left: 0;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;
