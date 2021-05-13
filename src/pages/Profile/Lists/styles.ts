import styled from 'styled-components';

export const ListsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
    background: #111;
    border-radius: 3px;
    font-size: 2rem;
    font-weight: 500;
    transition: 0.3s;

    :hover {
      background: ${({ theme }) => theme.colors.accent};
    }
  }
`;
