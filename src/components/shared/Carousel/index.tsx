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
  isFirstActive?: boolean;
  isLastActive?: boolean;
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
  navs?: boolean;
  prevNav?: string | ComponentType | HTMLElement;
  nextNav?: string | ComponentType | HTMLElement;
  dots?: boolean;
  dotNumber?: boolean;
  responsive?: CarouselBreakpoint[];
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

const checkResponsiveItems = (
  responsiveProp: CarouselBreakpoint[],
  itemsProp: number,
): number => {
  let responsiveItems = itemsProp;

  if (responsiveProp.length) {
    responsiveItems =
      responsiveProp
        .filter((responsiveItem) => responsiveItem.breakpoint >= window.screen.width)
        .pop()?.items || itemsProp;
  }

  return responsiveItems;
};

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
  responsive = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackDistance, setTrackDistance] = useState(0);
  const [trackStyles, setTrackStyles] = useState({});
  const [itemWidth, setItemWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [step, setStep] = useState(() => checkResponsiveItems(responsive, items));
  const [isSliding, setIsSliding] = useState(false);
  const isLoopRef = useRef<boolean>(true);
  const playIntervalRef = useRef(0);
  const pagesMapper = useRef<Record<string, string[]>>({});
  const itemsTotal = Children.count(children);
  const innerItems = checkResponsiveItems(responsive, items);

  const isStart = useMemo(() => step === 0, [step]);
  const isEnd = useMemo(() => {
    return step === itemsTotal + innerItems;
  }, [innerItems, itemsTotal, step]);

  const moveTrack = useCallback(() => {
    setIsSliding(true);

    setTrackStyles({
      width: `${trackWidth}px`,
      transform: `translateX(${trackDistance}px)`,
      transition: !isLoopRef.current ? `transform ${speed}ms ease` : 'none',
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
      let updatedItems = checkResponsiveItems(responsive, items);

      if (direction === 'prev') {
        if (step - updatedItems < 0) {
          updatedItems = step;
        }

        setStep((oldStep) => (perPage ? oldStep - updatedItems : oldStep - 1));
      }
      if (direction === 'next') {
        if (itemsTotal + updatedItems - step < updatedItems) {
          updatedItems = itemsTotal % updatedItems;
        }

        setStep((oldStep) => (perPage ? oldStep + updatedItems : oldStep + 1));
      }
      if (direction === 'goto') setStep(toStep);
    },
    [isSliding, responsive, items, itemsTotal, step, perPage],
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
    if (itemsTotal < innerItems) {
      setStep(0);
    } else {
      setStep(innerItems);
    }
  }, [itemsTotal, innerItems]);

  const calculateWidths = useCallback(() => {
    const updatedItems = checkResponsiveItems(responsive, items);

    const itemsCount = itemsTotal + updatedItems * 2;
    const tmpItemWidth = containerRef.current
      ? containerRef?.current.offsetWidth / updatedItems
      : 0;
    const tmpTrackWidth = tmpItemWidth * itemsCount;

    setItemWidth(tmpItemWidth);
    setTrackWidth(tmpTrackWidth);
  }, [items, itemsTotal, responsive]);

  useEffect(() => {
    calculateWidths();

    if (autoplay) {
      playIntervalRef.current = window.setInterval(() => {
        move('next');
      }, autoplayInterval);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', calculateWidths);

    return () => {
      clearInterval(playIntervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', calculateWidths);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTransitionEnd = useCallback(() => {
    setIsSliding(false);
    const updatedItems = checkResponsiveItems(responsive, items);

    if (isEnd && !isLoopRef.current) {
      isLoopRef.current = true;
      setStep(updatedItems);
    }

    if (isStart && !isLoopRef.current) {
      isLoopRef.current = true;
      setStep(Children.count(children));
    }
  }, [responsive, items, isEnd, isStart, children]);

  const renderItems = useCallback(() => {
    const nodes = Children.toArray(children);
    const identifiers: string[] = [];
    const pagesCount = Math.ceil(Children.count(children) / innerItems);

    const tmpPagesMapper: Record<string, string[]> = {};
    let acum = 0;

    const childrenNodes: ReactElement[] = [];
    const firstCloneNodes: ReactElement[] = [];
    const lastCloneNodes: ReactElement[] = [];

    nodes.forEach((child, index) => {
      const identifier = generateRandomKey(8);

      if (index < innerItems) {
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

      if (index > Children.count(children) - 1 - innerItems) {
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
      tmpPagesMapper[`${i + 1}`] = identifiers.slice(acum, acum + innerItems);
      acum += innerItems;
    }
    pagesMapper.current = tmpPagesMapper;

    // console.log(pagesMapper.current);

    if (Children.count(children) < innerItems) {
      return childrenNodes;
    }

    const finalNodeItems = [...firstCloneNodes, ...childrenNodes, ...lastCloneNodes];

    return finalNodeItems.map((node, index) => {
      const isActive = !!(index >= step && index < step + innerItems);
      const isFirstActive = index === step;
      const isLastActive = index === step - 1 + innerItems;

      return cloneElement(node, { isActive, isFirstActive, isLastActive });
    });
  }, [children, innerItems, itemWidth, step]);

  const renderDots = () => {
    const updatedItems = checkResponsiveItems(responsive, items);
    const currentPage = Math.floor(step / updatedItems);
    const pagesCount = Math.ceil(Children.count(children) / updatedItems);
    const dotsArrIndex = [...Array(pagesCount).keys()];

    if (pagesCount === 1) return null;

    const dotsArr = dotsArrIndex.map((dot) => {
      const dotPage = dot + 1;
      const isActive = currentPage === dotPage;
      const activeClassName = isActive ? 'carousel__dot --active' : 'carousel__dot';
      const nextStep = dotPage * updatedItems;

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

const Item: React.FC<CarouselItemProps> = ({
  children,
  style,
  isActive,
  isLastActive,
  isFirstActive,
}) => {
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
    <ItemContainer
      style={style}
      className={`carousel__item ${isActive ? '--active' : ''}  ${
        isFirstActive ? '--first-active' : ''
      } ${isLastActive ? '--last-active' : ''}`}
    >
      {children}
    </ItemContainer>
  );
};

Carousel.Item = Item;

export default Carousel;
