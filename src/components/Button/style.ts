import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IContainerProps {
  variant: 'primary' | 'secondary';
  isIconOnly?: boolean;
  isDark?: boolean;
  isFull?: boolean;
  isSmall?: boolean;
  isDisabled: boolean;
  isTextOnly?: boolean;
}

export const Container = styled.button<IContainerProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border: none;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  transition: all 0.3s;
  border: 1px solid transparent;
  border-radius: 3px;
  font-weight: 600;
  padding: 0 3rem;
  font-size: 1.6rem;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.accent)};
  }

  svg {
    margin-right: 1rem;
  }

  ${(props) =>
    props.isIconOnly &&
    css`
      width: 4rem;
      padding: 0;

      svg {
        margin-right: 0;
      }
    `}

  ${(props) =>
    props.isFull &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props) =>
    props.isSmall &&
    css`
      height: 3rem;
      font-size: 1.4rem;
    `}

  ${(props) =>
    props.isSmall &&
    props.isIconOnly &&
    css`
      width: 3rem;
    `}

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.isTextOnly &&
    css`
      background: transparent;

      &:hover {
        background: transparent;
      }
    `} /* @media (min-width: 1024px) {
    &:hover {
      background: #FFF;
    }
  } */
`;
