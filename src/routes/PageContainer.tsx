import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Container = styled(animated.div)``;

const PageContainer: React.FC = ({ children }) => {
  const props = useSpring({
    top: 1,
    from: { top: 0 },
    config: { duration: 300 },
  });

  return <Container style={props}>{children}</Container>;
};

export default PageContainer;
