import { createContext, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ImageConfiguration, Store } from '../store';

type SizeKeys =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'h185'
  | 'w300'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'original';

type ImageSizes = Record<ImageSizesKey, Record<string, string>>;
type ImageSizesKey = keyof Omit<ImageConfiguration, 'secure_base_url'>;

interface SupportContextData {
  imageSizes: ImageSizes;
  resolveUrl(path: string, size: string): string;
}

export const SupportContext = createContext<SupportContextData>({} as SupportContextData);

export const SupportProvider: React.FC = ({ children }) => {
  const { secure_base_url, ...imagesTypes } = useSelector(
    (store: Store) => store.movies.configuration.images,
  );

  const sizes = Object.keys(imagesTypes).reduce((acum, cur) => {
    const currentType = imagesTypes[cur as ImageSizesKey];

    if (currentType && Array.isArray(currentType)) {
      acum[cur as ImageSizesKey] = currentType.reduce((acum2, cur2) => {
        acum2[cur2] = cur2;
        // console.log(cur2);
        return acum2;
      }, {} as Record<string, string>);
    }
    // console.log('-----------------------------');

    return acum;
  }, {} as ImageSizes);

  const resolveUrl = useCallback(
    (path: string, size: string) => {
      return `${secure_base_url}${size}/${path}`;
    },
    [secure_base_url],
  );

  return (
    <SupportContext.Provider value={{ resolveUrl, imageSizes: sizes }}>
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = (): SupportContextData => {
  const context = useContext(SupportContext);

  if (!context) {
    console.error('useSupport must be used inside SupportProvider');
  }

  return context;
};
