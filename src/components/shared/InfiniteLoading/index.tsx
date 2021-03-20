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
      const mainFooter = document.querySelector<HTMLElement>('.main-footer');

      if (totalPages > 1) {
        mainFooter!.style.display = 'none';
      }

      const handleWindowScroll = () => {
        const isScrollTrigger =
          Math.ceil(window.scrollY) + window.innerHeight >=
          document.body.scrollHeight - offetTrigger;

        if (isScrollTrigger && page < totalPages && totalPages > 1 && !isLoading) {
          page++;
          onPaginate(page);
        }

        if (page === totalPages) {
          mainFooter!.style.display = 'flex';
        }
      };

      window.addEventListener('scroll', handleWindowScroll);

      return () => {
        window.removeEventListener('scroll', handleWindowScroll);
        mainFooter!.style.display = 'flex';
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
