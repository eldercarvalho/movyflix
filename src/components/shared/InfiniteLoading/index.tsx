import { useEffect, memo } from 'react';
import Loading from '../Loading';

import { Container } from './styles';

interface InfiniteLoadingProps {
  page: number;
  totalPages: number;
  isLoading: boolean;
  offetTrigger?: number;
  onPaginate(page: number): void;
}

const InfiniteLoading = memo(
  ({
    page = 1,
    totalPages,
    isLoading,
    offetTrigger = 0,
    onPaginate,
  }: InfiniteLoadingProps) => {
    useEffect(() => {
      const handleWindowScroll = () => {
        const isScrollTrigger =
          Math.ceil(window.scrollY) + window.innerHeight >=
          document.body.scrollHeight - offetTrigger;

        if (isScrollTrigger && page < totalPages && totalPages > 1 && !isLoading) {
          page++;
          onPaginate(page);
        }
      };

      window.addEventListener('scroll', handleWindowScroll);

      return () => {
        window.removeEventListener('scroll', handleWindowScroll);
      };
    }, [onPaginate, totalPages, offetTrigger]); // eslint-disable-line

    return isLoading && page > 1 ? (
      <Container>
        <Loading size={60} />
      </Container>
    ) : null;
  },
);

export default InfiniteLoading;
