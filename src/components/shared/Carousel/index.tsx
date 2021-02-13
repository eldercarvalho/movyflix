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
  Pagination,
} from './styles';

import generateRandomKey from '../../../utils/generateRandomKey';

import { CarouselContext } from './CarouselContext';

interface CarouselItemStyles {
  width: string;
}

interface CarouselItemProps {
  style?: CarouselItemStyles;
  isActive?: boolean;
  identifier?: string;
  className?: string;
}

interface CarouselBreakpoint {
  breakpoint: number;
  items: number;
}

interface CarouselProps {
  items?: number;
  perPage?: boolean;
  speed?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  navs?: number;
  prevNav?: string | ComponentType | HTMLElement;
  nextNav?: string | ComponentType | HTMLElement;
  dots?: boolean;
  dotNumber?: boolean;
  reponsive?: CarouselBreakpoint[];
  className?: string;
}

interface CarouselComposition {
  Item: FC<CarouselItemProps>;
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

const Carousel: FC<CarouselProps> & CarouselComposition = ({
  children,
  items = 1,
  perPage = false,
  speed = 400,
  autoplay = false,
  autoplayInterval = 6000,
  navs = true,
  prevNav: PrevNav = prevArrowSvg,
  nextNav: NextNav = nextArrowSvg,
  dots = true,
  dotNumber = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackDistance, setTrackDistance] = useState(0);
  const [trackStyles, setTrackStyles] = useState({});
  const [itemWidth, setItemWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [step, setStep] = useState(items);
  const [isSliding, setIsSliding] = useState(false);
  const isLoopRef = useRef<boolean>(true);
  const playIntervalRef = useRef(0);
  const pagesMapper = useRef<Record<string, string[]>>({});
  const itemsTotal = Children.count(children);
  const isStart = useMemo(() => step === 0, [step]);
  const isEnd = useMemo(() => {
    return step === Children.count(children) + items;
  }, [children, step, items]);

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
    const newTrackDistance = step * itemWidth * -1;
    setTrackDistance(newTrackDistance);
    moveTrack();
  }, [step, itemWidth, moveTrack, isLoopRef]);

  const move = useCallback(
    (direction: string, toStep = 0) => {
      if (isSliding) return;
      if (isLoopRef.current) isLoopRef.current = false;

      if (direction === 'prev')
        setStep((oldStep) => (perPage ? oldStep - items : oldStep - 1));
      if (direction === 'next')
        setStep((oldStep) => (perPage ? oldStep + items : oldStep + 1));
      if (direction === 'goto') setStep(toStep);
    },
    [isSliding, items, perPage],
  );

  const resetAutoplayInterval = useCallback(() => {
    if (autoplay) {
      clearInterval(playIntervalRef.current);

      playIntervalRef.current = window.setInterval(() => {
        move('next');
      }, autoplayInterval);
    }
  }, [autoplay, autoplayInterval, move]);

  const handleNavCLick = (direction: string, toStep = 0) => {
    resetAutoplayInterval();
    move(direction, toStep);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(playIntervalRef.current);
    } else {
      resetAutoplayInterval();
    }
  };

  useEffect(() => {
    if (itemsTotal < items) {
      setStep(0);
    } else {
      setStep(items);
    }
  }, [itemsTotal, items]);

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
      setStep(items);
    }

    if (isStart && !isLoopRef.current) {
      isLoopRef.current = true;
      setStep(Children.count(children));
    }
  }, [children, isEnd, isLoopRef, isStart, items]);

  const renderItems = useCallback(() => {
    const nodes = Children.toArray(children);
    const identifiers: string[] = [];
    const pagesCount = Math.ceil(Children.count(children) / items);
    const tmpPagesMapper: Record<string, string[]> = {};
    let acum = 0;

    const childrenNodes: ReactElement[] = [];
    const firstCloneNodes: ReactElement[] = [];
    const lastCloneNodes: ReactElement[] = [];

    nodes.forEach((child, index) => {
      const identifier = generateRandomKey(8);

      if (index < items) {
        lastCloneNodes.push(
          cloneElement(child as ReactElement, {
            style: { width: `${itemWidth}px` },
            key: generateRandomKey(8),
            identifier: generateRandomKey(8),
          }),
        );
      }

      identifiers.push(identifier);

      childrenNodes.push(
        cloneElement(child as ReactElement, {
          style: { width: `${itemWidth}px` },
          identifier,
        }),
      );

      if (index > Children.count(children) - 1 - items) {
        firstCloneNodes.push(
          cloneElement(child as ReactElement, {
            style: { width: `${itemWidth}px` },
            key: generateRandomKey(8),
            identifier: generateRandomKey(8),
          }),
        );
      }
    });

    for (let i = 0; i < pagesCount; i++) {
      tmpPagesMapper[`${i + 1}`] = identifiers.slice(acum, acum + items);
      acum += items;
    }
    pagesMapper.current = tmpPagesMapper;

    // console.log(pagesMapper.current);

    if (Children.count(children) < items) {
      return childrenNodes;
    }

    return [...firstCloneNodes, ...childrenNodes, ...lastCloneNodes];
  }, [children, itemWidth, items, pagesMapper]);

  const renderDots = () => {
    const currentPage = Math.floor(step / items);
    const pagesCount = Math.ceil(Children.count(children) / items);
    const dotsArrIndex = [...Array(pagesCount).keys()];

    const dotsArr = dotsArrIndex.map((dot) => {
      const dotPage = dot + 1;
      const isActive = currentPage === dotPage;
      const activeClassName = isActive ? '--active' : '';
      const nextStep = dotPage * items;

      return (
        <Dot
          key={dot}
          isActive={isActive}
          showNumber={dotNumber}
          className={activeClassName}
          onClick={() => handleNavCLick('goto', nextStep)}
        >
          {dotPage}
        </Dot>
      );
    });

    if (isEnd) {
      dotsArr[0] = (
        <Dot
          key={generateRandomKey(8)}
          isActive
          className="--active"
          showNumber={dotNumber}
        >
          1
        </Dot>
      );
    }

    if (isStart) {
      dotsArr[dotsArr.length - 1] = (
        <Dot
          key={generateRandomKey(8)}
          isActive
          className="--active"
          showNumber={dotNumber}
        >
          {dotsArr.length}
        </Dot>
      );
    }

    return dotsArr;
  };

  const memoizedContextValue = useMemo(
    () => ({
      currentPage: Math.floor(step / items),
      pagesMapper: pagesMapper.current,
    }),
    [items, step, pagesMapper],
  );

  return (
    <CarouselContext.Provider value={memoizedContextValue}>
      <Container ref={containerRef} className={className}>
        <Track ref={trackRef} style={trackStyles} onTransitionEnd={handleTransitionEnd}>
          {renderItems()}
        </Track>
        <Pagination className="carousel__pagination">
          {navs && (
            <PrevNavButton
              className="carousel__nav carousel__nav-prev"
              onClick={() => handleNavCLick('prev')}
            >
              {typeof PrevNav === 'function' ? <PrevNav /> : PrevNav}
            </PrevNavButton>
          )}
          {dots && <Dots className="carousel__dots">{renderDots()}</Dots>}
          {navs && (
            <NextNavButton
              className="carousel__nav carousel__nav-next"
              onClick={() => handleNavCLick('next')}
            >
              {typeof NextNav === 'function' ? <NextNav /> : NextNav}
            </NextNavButton>
          )}
        </Pagination>
      </Container>
    </CarouselContext.Provider>
  );
};

// const useCarousel = (): CarouselContextData => {
//   const context = useContext(CarouselContext);

//   if (!context) {
//     throw new Error('This component must be used within a <Carousel> component.');
//   }

//   return context;
// };

const Item: React.FC<CarouselItemProps> = ({ children, style }) => {
  // const { currentPage, pagesMapper } = useCarousel();
  // const isActive = useMemo(() => {
  // console.log(identifier, pagesMapper);
  //   return (
  //     identifier &&
  //     pagesMapper[currentPage] &&
  //     pagesMapper[currentPage].includes(identifier)
  //   );
  // }, [currentPage, identifier, pagesMapper]);

  return (
    <ItemContainer style={style} className="carousel__item">
      {children}
    </ItemContainer>
  );
};

Carousel.Item = Item;

export default Carousel;
