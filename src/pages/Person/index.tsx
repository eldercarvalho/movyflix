import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

import { differenceInYears, parseISO } from 'date-fns/esm';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ExternalIds, fetchPersonDetails } from '../../store/slices/movies';

import Button from '../../components/shared/Button';
import { Image } from '../../components/shared/Image';
import Loading from '../../components/shared/Loading';

import { Content } from '../../styles/Content';

import {
  CenterContainer,
  Images,
  PersonImage,
  PersonContent,
  Info,
  InfoSection,
  Socials,
  PersonInfoList,
} from './styles';

type ExternalIdsKey = keyof ExternalIds;
const allowedSocials = ['facebook_id', 'instagram_id', 'twitter_id'];
const mapSocialsUrls = {
  facebook_id: 'https://www.facebook.com',
  instagram_id: 'https://instagram.com',
  twitter_id: 'https://twitter.com',
};
const mapSocialIcons = {
  facebook_id: FiFacebook,
  instagram_id: FiInstagram,
  twitter_id: FiTwitter,
};

interface RouteParams {
  id: string;
}

const Person: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const personDetails = useAppSelector((state) => state.movies.personDetails);
  const isFetchingDetails = useAppSelector((state) => state.movies.isFetchingDetails);
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(fetchPersonDetails(parseInt(id)));
  }, [dispatch, id]);

  const getPersonAge = (birthday: string, deathday: string) => {
    if (!birthday) return '-';

    const laterDate = deathday ? parseISO(deathday) : new Date();

    return `${format(parseISO(birthday), 'dd/MM/yyyy')} (${differenceInYears(
      laterDate,
      parseISO(birthday),
    )} anos)`;
  };

  const renderSocials = () => {
    if (personDetails.external_ids) {
      return Object.keys(personDetails.external_ids)
        .filter(
          (key) =>
            allowedSocials.includes(key) &&
            !!personDetails.external_ids[key as keyof typeof mapSocialsUrls],
        )
        .map((key) => {
          const SocialIcon = mapSocialIcons[key as keyof typeof mapSocialIcons];

          return (
            <a
              href={`${mapSocialsUrls[key as keyof typeof mapSocialsUrls]}/${
                personDetails.external_ids[key as ExternalIdsKey]
              }`}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon size={22} />
            </a>
          );
        });
    }
    return null;
  };

  return (
    <Content headerOffset>
      {isFetchingDetails ? (
        <Loading screenCenter size={100} />
      ) : (
        <CenterContainer>
          <Button textOnly onClick={() => history.goBack()}>
            <FiArrowLeft size={20} /> Voltar
          </Button>

          <PersonContent>
            <Images>
              <PersonImage>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`}
                  alt={personDetails.name}
                />
              </PersonImage>
            </Images>

            <Info>
              <h2>{personDetails.name}</h2>

              <PersonInfoList>
                <li>
                  <strong>Nascimento: </strong>{' '}
                  {getPersonAge(personDetails.birthday, personDetails.deathday)}
                </li>
                {!!personDetails.deathday && (
                  <li>
                    <strong>Falecimento: </strong>{' '}
                    {format(parseISO(personDetails.deathday), 'dd/MM/yyyy')}
                  </li>
                )}
                <li>
                  <strong>Naturalidade: </strong> {personDetails.place_of_birth || '-'}
                </li>
              </PersonInfoList>

              <Socials>{renderSocials()}</Socials>

              <InfoSection>
                <h3>Biografia</h3>
                <p>{personDetails.biography || 'Sem biografia.'}</p>
              </InfoSection>
            </Info>
          </PersonContent>
        </CenterContainer>
      )}
    </Content>
  );
};

export default Person;
