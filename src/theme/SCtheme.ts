const customMediaQuery = (maxWidth: string) => `(max-width: ${maxWidth})`;

const media = {
  custom: customMediaQuery,
  phone: customMediaQuery('37.5em'),
  tabPort: customMediaQuery('56.25em'),
  tabLand: customMediaQuery('75em'),
};

export const theme = {
  colors: {
    primary: '#fdd835',
    primaryLight: '#ffff6b',
    primaryDark: '#c6a700',
    secondary: '#78909c',
    secondaryLight: '#a7c0cd',
    secondaryDark: '#4b636e',
    tertiary: '#424242',
    tertiaryLight: '#6d6d6d',
    tertiaryDark: '#1b1b1b',
    greyLight1: '#f7f7f7',
    greyLight2: '#eeeeee',
    greyLight3: '#cccccc',
    greyDark1: '#777',
    greyDark2: '#999',
    greyDark3: '#333',
  },
  bp: {
    custom: media.custom,
    phone: media.phone,
    tabPort: media.tabPort,
    tabLand: media.tabLand,
  },
  shadow: {
    shadowXxs: '0 0.5rem 0.5rem rgba(0,0,0, 0.05)',
    shadowXs: '0 0.5rem 2rem rgba(0,0,0, 0.08)',
    shadowSm: '0 0.8rem 2.5rem rgba(0,0,0, 0.1)',
    shadowMd: '0 1.5rem 4rem rgba(0,0,0, 0.15)',
    shadowLg: '0 2rem 5rem rgba(0,0,0, 0.2)',
  },
};
