import styled from 'styled-components';
import devices from '../../utils/media';

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 200px calc(100% - 25rem);
  gap: 0 5rem;

  @media ${devices.mobileL} {
    grid-template-columns: 100%;
    gap: 0;
  }
`;

export const GenresList = styled.aside`
  border-right: 1px solid rgba(255, 255, 255, 0.8);

  button {
    display: block;
    width: 100%;
    padding: 1rem 0;
    background: transparent;
    border: none;
    font-size: 1.6rem;
    font-weight: 500;
    text-align: left;
    color: rgba(255, 255, 255, 0.8);
    transition: 0.3s;

    :hover {
      padding-left: 1.5rem;
    }
  }
`;
