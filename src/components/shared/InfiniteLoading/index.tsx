import { useEffect, memo } from 'react';
import Loading from '../Loading';

import { Container } from './styles';

interface InfiniteLoadingProps {
  page: number;
  totalPages: number;
  isLoading: boolean;
  offetTrigger?: number;
  onReachEnd(page: number): void;
}

const InfiniteLoading = memo(
  ({
    page,
    totalPages,
    isLoading,
    offetTrigger = 0,
    onReachEnd,
  }: InfiniteLoadingProps) => {
    console.log(isLoading);

    useEffect(() => {
      const handleWindowScroll = () => {
        const isScrollTrigger =
          Math.ceil(window.scrollY) + window.innerHeight >=
          document.body.scrollHeight - offetTrigger;

        if (isScrollTrigger && page < totalPages && totalPages > 1 && !isLoading) {
          page++;
          onReachEnd(page);
        }
      };

      window.addEventListener('scroll', handleWindowScroll);

      return () => {
        window.removeEventListener('scroll', handleWindowScroll);
      };
    }, [onReachEnd, totalPages, offetTrigger]); // eslint-disable-line

    return isLoading ? (
      <Container>
        <Loading size={60} />
      </Container>
    ) : null;
  },
);

export default InfiniteLoading;
