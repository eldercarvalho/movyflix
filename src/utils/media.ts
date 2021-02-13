interface Size {
  [key: string]: number;
}

type DevicesUnion =
  | 'mobileS'
  | 'mobileM'
  | 'mobileL'
  | 'tablet'
  | 'laptop'
  | 'laptopM'
  | 'laptopL'
  | 'desktop';

export const size: Size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopM: 1366,
  laptopL: 1440,
  desktop: 2560,
};

const devices = Object.keys(size).reduce((acc, cur) => {
  acc[cur as DevicesUnion] = `only screen and (max-width: ${size[cur]}px)`;
  return acc;
}, {} as Record<DevicesUnion, string>);

export default devices;
