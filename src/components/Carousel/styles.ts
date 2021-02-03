import styled, { css } from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
`;

export const Track = styled.div`
  display: flex;
`;

const NavButton = styled.button`
  background: none;
  border: none;

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

export const ItemContainer = styled.div`
  flex-shrink: 0;
`;

export const Dots = styled.div`
  text-align: center;
  overflow-x: auto;
`;

interface IDotProps {
  isActive: boolean;
}

export const Dot = styled.button<IDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.colors.accent};
  font-size: 0;

  & + button {
    margin-left: 1rem;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: #fff;
    `}
`;
