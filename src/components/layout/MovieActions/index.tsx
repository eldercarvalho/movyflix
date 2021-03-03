import { useCallback, useEffect, useState } from 'react';
import { FiBookmark, FiHeart, FiList } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { addMovieToFavorites, addMovieToList } from '../../../store/slices/profile';
import { MovieAccountState } from '../../../store/slices/movies';

import Button from '../../shared/Button';
import Select from '../../shared/Select';
import Tooltip from '../../shared/Tooltip';
import Modal from '../../shared/Modalv2';

import { Container, ModalContent } from './styles';

interface MovieActionsProps {
  movieId: number;
  isFavorite: boolean;
  isInWatchList: boolean;
  context: string;
}

const MovieActions: React.FC<MovieActionsProps> = ({
  movieId,
  isFavorite = false,
  isInWatchList = false,
  context,
}) => {
  const dispatch = useAppDispatch();
  const [isAddToListModalShowing, setIsAddToListModalShowing] = useState(false);
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
  const isFetching = useAppSelector((state) => state.profile.isFetching);
  const addMovieToListSuccess = useAppSelector((state) => state.profile.success);
  const userLists = useAppSelector((state) =>
    state.profile.lists.map((list) => ({
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
    dispatch(addMovieToList({ movieId, listId }));
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
        <Button
          iconOnly
          rounded
          onClick={
            isUserLoggedIn
              ? () =>
                  dispatch(
                    addMovieToFavorites({
                      movieId,
                      isFavorite: !isFavorite,
                      context,
                    }),
                  )
              : undefined
          }
        >
          {isFavorite ? <FiHeart size={22} fill="#FFF" /> : <FiHeart size={22} />}
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
