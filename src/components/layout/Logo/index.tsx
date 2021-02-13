import { Link } from 'react-router-dom';

import { Container } from './styles';

const Logo: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        Movy<span>Flix</span>
      </Link>
    </Container>
  );
};

export default Logo;
