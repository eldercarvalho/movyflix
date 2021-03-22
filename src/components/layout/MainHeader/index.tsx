import { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import {
  FiBookmark,
  FiFlag,
  FiHeart,
  FiList,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { searchMovies } from '../../../store/slices/movies';
import { signOut, requestToken } from '../../../store/slices/auth';

import { debounce } from '../../../utils/debounce';

import Button from '../../shared/Button';
import Logo from '../Logo';
import SignInForm from '../SignInForm';
import Search from '../Search';
import { useModal } from '../../shared/Modal';

import { Container, MenuWrapper, Menu, MenuButton, ModalContent } from './styles';
import Dropdown from '../../shared/Dropdown';

const MainHeader: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isDarken, setIsDarken] = useState(false);
  const history = useHistory();
  const match = useRouteMatch('/search');
  const { RenderModal, show, hide } = useModal();
  const {
    RenderModal: SigInModal,
    show: showSigInModal,
    hide: hideSigInModal,
  } = useModal();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);

  const handleSearch = (query: string) => {
    if (!match?.isExact) history.push('/search');

    if (query) window.history.replaceState({}, 'query', `?query=${query}`);
    if (!query) history.goBack();

    window.scrollTo(0, 0);

    const page = 1;
    dispatch(searchMovies({ query, page }));
  };

  const handleSignInClick = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('request_token');

    if (token) {
      showSigInModal();
      return;
    }

    show();
  }, [show, showSigInModal]);

  const handleSignOutClick = () => {
    dispatch(signOut());
  };

  const handleAuthenticationClick = useCallback(() => {
    dispatch(requestToken());
    hide();
  }, [dispatch, hide]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('request_token');

    if (token && urlParams.get('approved') && !isUserLoggedIn) {
      showSigInModal();
    }

    const handleWindowScroll = () => {
      if (window.scrollY > 50) {
        setIsDarken(true);
        return;
      }

      setIsDarken(false);
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isUserLoggedIn) {
      hideSigInModal();
    }
  }, [isUserLoggedIn, hideSigInModal]);

  return (
    <Container isDarken={isDarken}>
      <Logo />

      <Search onSearchChange={debounce(handleSearch, 500)} />

      <MenuWrapper isMenuOpened={isMenuOpened}>
        <Menu>
          <NavLink to="/" exact activeClassName="--active">
            Home
          </NavLink>
          <NavLink to="/top-rated" activeClassName="--active">
            Melhores Avaliados
          </NavLink>
          <NavLink to="/genres" activeClassName="--active">
            Gêneros
          </NavLink>
        </Menu>

        {/* <Dropdown>
          <Dropdown.Toggle iconOnly rounded>
            <FiUser size={22} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => history.push('/profile/lists')}>
              <FiList size={18} /> Listas
            </Dropdown.Item>
            <Dropdown.Item onClick={() => history.push('/profile/favorites')}>
              <FiHeart size={18} /> Favoritos
            </Dropdown.Item>
            <Dropdown.Item onClick={() => history.push('/profile/watchlist')}>
              <FiBookmark size={18} /> Lista de interesses
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSignOutClick}>
              <FiLogOut size={18} /> Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        {isUserLoggedIn ? (
          <Button textOnly iconOnly onClick={handleSignOutClick}>
            <FiLogOut size={22} />
          </Button>
        ) : (
          <Button onClick={handleSignInClick}>Sign in</Button>
        )}
      </MenuWrapper>

      <MenuButton
        iconOnly
        textOnly
        onClick={() => setIsMenuOpened((oldValue) => !oldValue)}
      >
        {isMenuOpened ? <FiX size={30} /> : <FiMenu size={30} />}
      </MenuButton>

      <RenderModal width={450} showClose={false}>
        <ModalContent>
          {/* <h2>Permission Required</h2>
          <p>
            You will need to grant permission to access your TMDb information. Click on
            the continue button to be redirected to the TMDb website.
          </p>
          <p>
            If you don't have a TMDb account, create one to enjoy all the features of
            MovyFlix.
          </p> */}

          <h2>Permissão Necessária</h2>
          <p>
            Você precisa conceder permissão para o MovyFlix acessar as informações da sua
            conta TMDb. Clique no botão de continuar para ser redirecionado para o site do
            TMDb.
          </p>
          <p>
            Se você não tem conta no TMDb, crie uma para aproveita todas as
            funcionalidades do MovyFlix.
          </p>

          <Button full className="mt-3" onClick={handleAuthenticationClick}>
            Continuar
          </Button>

          <Button textOnly full small light className="mt-1" onClick={() => hide()}>
            Cancelar
          </Button>
        </ModalContent>
      </RenderModal>

      <SigInModal width={350} showClose={false}>
        <ModalContent>
          <h2>Sign In</h2>
          <SignInForm />

          <Button
            textOnly
            light
            small
            full
            className="mt-1"
            onClick={() => hideSigInModal()}
          >
            Cancelar
          </Button>
        </ModalContent>
      </SigInModal>
    </Container>
  );
};

export default MainHeader;
