import styled, { keyframes } from 'styled-components';

const FlashAnimation = keyframes`
  from {
    top: -70%;
    left: -70%;
  }
  to {
    top: 70%;
    left: 155%;
  }
`;

export const ImageSkeleton = styled.div`
  position: relative;
  background: #222;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
  padding-top: 140%;
  height: 0;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(45deg);
    width: 70%;
    height: 130%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(51, 51, 51, 0.3),
      rgba(0, 0, 0, 0)
    );
    animation: ${FlashAnimation} 1s linear infinite;
  }
`;
