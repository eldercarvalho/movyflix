import styled, { css } from 'styled-components';
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
`;

interface GenresListItem {
  isActive: boolean;
}

export const GenresListItem = styled.button<GenresListItem>`
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
    color: ${({ theme }) => theme.colors.accent};
  }

  span {
    position: relative;
    display: block;

    ::before {
      content: '\\2022';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      opacity: 0;
      color: ${({ theme }) => theme.colors.accent};
      transition: left 0.3s;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.accent};
      text-indent: 1.6rem;

      span {
        ::before {
          opacity: 1;
          left: -1.6rem;
        }
      }
    `};
`;
