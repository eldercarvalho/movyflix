type Sizes = {
  mobileS: number;
  mobileM: number;
  mobileL: number;
  tablet: number;
  laptop: number;
  laptopM: number;
  laptopL: number;
  desktop: number;
};

type DevicesUnion =
  | 'mobileS'
  | 'mobileM'
  | 'mobileL'
  | 'tablet'
  | 'laptop'
  | 'laptopM'
  | 'laptopL'
  | 'desktop';

export const mediaSizes: Sizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopM: 1366,
  laptopL: 1440,
  desktop: 2560,
};

const devices = Object.keys(mediaSizes).reduce((acc, cur) => {
  acc[cur as DevicesUnion] = `only screen and (max-width: ${
    mediaSizes[cur as keyof Sizes]
  }px)`;
  return acc;
}, {} as Record<DevicesUnion, string>);

export default devices;
