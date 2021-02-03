import {
  FC,
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ComponentType,
  ReactElement,
} from 'react';

import {
  Container,
  Track,
  PrevNavButton,
  NextNavButton,
  ItemContainer,
  Dots,
  Dot,
} from './styles';

interface ICarouselItemStyles {
  width: string;
}

interface ICarouselItemProps {
  style?: ICarouselItemStyles;
}

interface ICarouselBreakpoint {
  breakpoint: number;
  items: number;
}

interface ICarouselProps {
  items?: number;
  speed?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  navs?: number;
  prevNav?: string | ComponentType | HTMLElement;
  nextNav?: string | ComponentType | HTMLElement;
  dots?: boolean;
  reponsive?: ICarouselBreakpoint[];
}

interface ICarouselComposition {
  Item: FC<ICarouselItemProps>;
}

function generateRandomKey(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const prevArrowSvg = (
  <svg viewBox="0 0 22 30">
    <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z" />
  </svg>
);

const nextArrowSvg = (
  <svg viewBox="0 0 22 30">
    <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
  </svg>
);

const Carousel: FC<ICarouselProps> & ICarouselComposition = ({
  children,
  items = 1,
  speed = 400,
  autoplay = false,
  autoplayInterval = 6000,
  navs = true,
  prevNav: PrevNav = prevArrowSvg,
  nextNav: NextNav = nextArrowSvg,
  dots = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackDistance, setTrackDistance] = useState(0);
  const [trackStyles, setTrackStyles] = useState({});
  const [itemWidth, setItemWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [page, setPage] = useState(items);
  const [isSliding, setIsSliding] = useState(false);
  const isLoopRef = useRef<boolean>(true);
  const playIntervalRef = useRef(0);

  const isStart = useMemo(() => page === 0, [page]);

  const isEnd = useMemo(() => {
    return page === Children.count(children) + items;
  }, [children, page, items]);

  const isMovePermitted = useMemo(() => true, []);

  const moveTrack = useCallback(() => {
    setIsSliding(true);

    setTrackStyles({
      width: `${trackWidth}px`,
      transform: `translateX(${trackDistance}px)`,
      transition: !isLoopRef.current ? `transform ${speed}ms` : 'none',
    });

    if (isLoopRef.current) {
      setIsSliding(false);
    }
  }, [trackWidth, trackDistance, isLoopRef, speed]);

  useEffect(() => {
    const newTrackDistance = page * itemWidth * -1;
    setTrackDistance(newTrackDistance);
    moveTrack();
  }, [page, itemWidth, moveTrack, isLoopRef]);

  const move = useCallback(
    (direction: string, toPage = 0) => {
      if (isSliding) return;
      if (isLoopRef.current) isLoopRef.current = false;

      if (direction === 'prev') setPage((oldPage) => oldPage - 1);
      if (direction === 'next') setPage((oldPage) => oldPage + 1);
      if (direction === 'goto') setPage(toPage);
    },
    [isSliding],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetAutoplayInterval = () => {
    if (autoplay) {
      clearInterval(playIntervalRef.current);

      playIntervalRef.current = window.setInterval(() => {
        move('next');
      }, autoplayInterval);
    }
  };

  const handleNavCLick = (direction: string, toPage = 0) => {
    resetAutoplayInterval();
    move(direction, toPage);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(playIntervalRef.current);
    } else {
      playIntervalRef.current = window.setInterval(() => {
        move('next');
      }, autoplayInterval);
    }
  };

  useEffect(() => {
    const itemsCount = Children.count(children) + items * 2;
    const tmpItemWidth = containerRef.current
      ? containerRef?.current.offsetWidth / items
      : 0;
    const tmpTrackWidth = tmpItemWidth * itemsCount;

    setItemWidth(tmpItemWidth);
    setTrackWidth(tmpTrackWidth);

    if (autoplay) {
      playIntervalRef.current = window.setInterval(() => {
        move('next');
      }, autoplayInterval);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(playIntervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTransitionEnd = useCallback(() => {
    setIsSliding(false);

    if (isEnd && !isLoopRef.current) {
      isLoopRef.current = true;
      setPage(items);
    }

    if (isStart && !isLoopRef.current) {
      isLoopRef.current = true;
      setPage(Children.count(children));
    }
  }, [children, isEnd, isLoopRef, isStart, items]);

  const renderItems = useCallback(() => {
    const nodes = Children.toArray(children);

    const childrenNodes: ReactElement[] = [];
    const firstCloneNodes: ReactElement[] = [];
    const lastCloneNodes: ReactElement[] = [];

    nodes.forEach((child, index) => {
      childrenNodes.push(
        cloneElement(child as ReactElement, {
          style: { width: `${itemWidth}px` },
        }),
      );

      if (index < items) {
        lastCloneNodes.push(
          cloneElement(child as ReactElement, {
            style: { width: `${itemWidth}px` },
            key: generateRandomKey(8),
          }),
        );
      }

      if (index > Children.count(children) - 1 - items) {
        firstCloneNodes.push(
          cloneElement(child as ReactElement, {
            style: { width: `${itemWidth}px` },
            key: generateRandomKey(8),
          }),
        );
      }
    });

    return [...firstCloneNodes, ...childrenNodes, ...lastCloneNodes];
  }, [children, itemWidth, items]);

  const renderDots = () => {
    const pagesCount = Math.ceil(Children.count(children) / items);
    const dotsArr = [...Array(pagesCount).keys()];

    return dotsArr.map((dot) => (
      <Dot
        key={dot}
        isActive={page / items === dot + 1}
        onClick={() => handleNavCLick('goto', (dot + 1) * items)}
      >
        {dot}
      </Dot>
    ));
  };

  return (
    <Container ref={containerRef}>
      <Track ref={trackRef} style={trackStyles} onTransitionEnd={handleTransitionEnd}>
        {renderItems()}
      </Track>
      {dots && <Dots>{renderDots()}</Dots>}
      {navs && (
        <>
          <PrevNavButton onClick={() => handleNavCLick('prev')}>
            {typeof PrevNav === 'function' ? <PrevNav /> : PrevNav}
          </PrevNavButton>
          <NextNavButton onClick={() => handleNavCLick('next')}>
            {typeof NextNav === 'function' ? <NextNav /> : NextNav}
          </NextNavButton>
        </>
      )}
    </Container>
  );
};

Carousel.Item = ({ children, style }) => {
  return <ItemContainer style={style}>{children}</ItemContainer>;
};

export default Carousel;
