import { FiBookmark, FiHeart, FiList } from 'react-icons/fi';

import Button from '../../shared/Button';

import { Container } from './styles';

const MovieActions: React.FC = () => {
  return (
    <Container>
      <Button iconOnly rounded>
        <FiList size={22} />
      </Button>

      <Button iconOnly rounded>
        <FiHeart size={22} />
      </Button>

      <Button iconOnly rounded>
        <FiBookmark size={22} />
      </Button>
    </Container>
  );
};

export default MovieActions;
