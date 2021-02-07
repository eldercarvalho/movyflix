import styled, { css } from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
`;

export const Track = styled.div`
  display: flex;
`;

interface ItemContainerProps {
  className?: string;
}

export const ItemContainer = styled.div<ItemContainerProps>`
  flex-shrink: 0;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  transition: 0.3s;

  :hover {
    opacity: 0.5;
  }

  svg {
    width: 50px;
    height: 30px;
  }
`;

export const PrevNavButton = styled(NavButton)`
  left: 0;
`;

export const NextNavButton = styled(NavButton)`
  right: 0;
`;

export const Dots = styled.div`
  text-align: center;
  margin: 0 2.2rem;
`;

interface DotProps {
  isActive: boolean;
  showNumber: boolean;
}

export const Dot = styled.button<DotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  background: transparent;
  font-size: 0;
  color: #fff;

  & + button {
    margin-left: 1rem;
  }

  ${({ showNumber }) =>
    showNumber &&
    css`
      font-size: 1.2rem;
      width: 20px;
      height: 20px;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.colors.accent};
    `}
`;
