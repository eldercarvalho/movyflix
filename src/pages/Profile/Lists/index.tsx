import React from 'react';
import { useAppSelector } from '../../../hooks';

import { CenteredContent } from '../../../styles/CenteredContent';
import { SectionTitle } from '../../../styles/SectionTitle';

import { ListsGrid } from './styles';

const Lists: React.FC = () => {
  const lists = useAppSelector((state) => state.profile.lists);

  return (
    <>
      <SectionTitle>Minhas Listas</SectionTitle>

      <CenteredContent>
        <ListsGrid>
          {lists.map((list) => (
            <a
              href={`/profile/lists/${list.id}`}
              style={{ backgroundImage: `url(${list.poster_path})` }}
            >
              {list.name}
            </a>
          ))}
        </ListsGrid>
      </CenteredContent>
    </>
  );
};

export default Lists;
