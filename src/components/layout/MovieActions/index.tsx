import { FiBookmark, FiHeart, FiList, FiPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Store } from '../../../store';

import Button from '../../shared/Button';
import { useModal } from '../../shared/Modal';
import Tooltip from '../../shared/Tooltip';

import { Container, ModalContent } from './styles';

const MovieActions: React.FC = () => {
  const { isUserLoggedIn } = useSelector((store: Store) => store.auth);
  const { RenderModal: AddToListModal, show, hide } = useModal();

  const addTolistText = isUserLoggedIn
    ? 'Adicionar à uma lista'
    : 'Faça login para adicionar à uma lista';

  const addToFavoriesText = isUserLoggedIn
    ? 'Adicionar aos favoritos'
    : 'Faça login para adicionar aos favoritos';

  const addToWatchListText = isUserLoggedIn
    ? 'Adicionar aos favoritos'
    : 'Faça login para adicionar à lista de interesses';

  return (
    <Container>
      <Tooltip text={addTolistText}>
        <Button iconOnly rounded onClick={() => show()}>
          <FiList size={22} />
        </Button>
      </Tooltip>

      <Tooltip text={addToFavoriesText}>
        <Button iconOnly rounded>
          <FiHeart size={22} />
        </Button>
      </Tooltip>

      <Tooltip text={addToWatchListText}>
        <Button iconOnly rounded>
          <FiBookmark size={22} />
        </Button>
      </Tooltip>

      <AddToListModal width={450} showClose={false}>
        <ModalContent>
          <h2>Adicionar à uma lista</h2>

          <Button full>Criar lista</Button>

          <Button full textOnly light small onClick={() => hide()} className="mt-1">
            Cancelar
          </Button>
        </ModalContent>
      </AddToListModal>
    </Container>
  );
};

export default MovieActions;
