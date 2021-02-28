import { useCallback, useEffect, useState } from 'react';
import { FiBookmark, FiHeart, FiList } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToList, Store } from '../../../store';

import Button from '../../shared/Button';
import Select from '../../shared/Select';
import Tooltip from '../../shared/Tooltip';
import Modal from '../../shared/Modalv2';

import { Container, ModalContent } from './styles';

interface MovieActionsProps {
  movieId: number;
}

const MovieActions: React.FC<MovieActionsProps> = ({ movieId }) => {
  const dispatch = useDispatch();
  const [isAddToListModalShowing, setIsAddToListModalShowing] = useState(false);
  const isUserLoggedIn = useSelector((store: Store) => store.auth.isUserLoggedIn);
  const isFetching = useSelector((store: Store) => store.profile.isFetching);
  const addMovieToListSuccess = useSelector((store: Store) => store.profile.success);
  const userLists = useSelector((store: Store) =>
    store.profile.lists.map((list) => ({
      id: list.id,
      text: `${list.name} (${list.item_count})`,
    })),
  );

  const addTolistText = isUserLoggedIn
    ? 'Adicionar à lista'
    : 'Faça login para adicionar à uma lista';

  const addToFavoriesText = isUserLoggedIn
    ? 'Marcar como favorito'
    : 'Faça login para adicionar aos favoritos';

  const addToWatchListText = isUserLoggedIn
    ? 'Adicionar à sua lista de interesses'
    : 'Faça login para adicionar à lista de interesses';

  const handleSelectOnChange = useCallback((listId: number) => {
    dispatch(addMovieToList(movieId, listId));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (addMovieToListSuccess) {
      setIsAddToListModalShowing(false);
    }
  }, [addMovieToListSuccess]); // eslint-disable-line

  return (
    <Container>
      <Tooltip text={addTolistText}>
        <Button
          iconOnly
          rounded
          onClick={isUserLoggedIn ? () => setIsAddToListModalShowing(true) : undefined}
        >
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

      <Modal show={isAddToListModalShowing} close={false}>
        <ModalContent>
          <h2>Adicionar à uma lista</h2>

          <Select
            options={userLists}
            isLoading={isFetching}
            onChange={handleSelectOnChange}
          />

          <Button textOnly light reduced className="mt-1">
            Criar lista
          </Button>

          <Button
            full
            textOnly
            light
            small
            onClick={() => setIsAddToListModalShowing(false)}
            className="mt-1"
          >
            Cancelar
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MovieActions;
