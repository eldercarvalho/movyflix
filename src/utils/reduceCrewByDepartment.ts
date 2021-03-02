import { CastPerson } from '../store/slices/movies/types';

export const reduceCrewByDepartment = (crew: CastPerson[]) => {
  const filteredDepartments = ['Director', 'Story', 'Screenplay', 'Characters', 'Writer'];

  const reducedCrew = crew
    .filter((person) => filteredDepartments.includes(person.job))
    .reduce((acum, cur) => {
      if (acum.some((person) => person.id === cur.id)) {
        const personIndex = acum.findIndex((person) => person.id === cur.id);
        acum[personIndex].job += `, ${cur.job}`;
        return acum;
      }

      acum.push(cur);

      return acum;
    }, [] as CastPerson[]);

  return reducedCrew;
};
