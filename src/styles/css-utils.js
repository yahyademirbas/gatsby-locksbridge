/* eslint-disable import/prefer-default-export */
/* Variables and functions specifically for CSS-in-JS use */

/* Media queries */
const breakpoints = [480, 767, 900, 1220];
const names = [`xs`, `tablet`, `phoneLarge`, `desktop`];

export const mediaQueries = breakpoints.reduce((acc, bp, i) => {
  acc[names[i]] = `@media (min-width: ${bp}px)`;
  return acc;
}, {});

export const jsBreakpoints = breakpoints.reduce((acc, bp, i) => {
  acc[names[i]] = bp;
  return acc;
}, {});

/* Fonts */
export const fonts = {
  serif: `'Canela', serif`,
  sans: `'NB International Pro', sans-serif`,
  mono: `'NB International Pro Mono', monospace`,
};

export const weights = {
  thin: `100`,
  light: `300`,
  regular: `400`,
  medium: `500`,
  bold: `700`,
  black: `900`,
};

/* Colors - Use a RGB to HEX converter */
export const colors = {
  white: `#eef9fa`,
  whiteFaded: `#e7e5e4`,
  black: `#000`,
  gray: `#e0e0e0`,
  tagGray: `#282829`,
  lightgray: `#F8F8F9;`,
  darkgray: `#29292a`,
  darkgrayFaded: `rgba(41, 41, 42, 0.7)`,
  darkergrayFaded: `rgba(41, 41, 42, 0.9)`,
  reallydarkgray: `#282829`,
  yellow: `#e9b76d`,
  lightblue: `#e7eff6`,
  blue: `#63ace5`,
  lightgreen: `#cef5e2`,
  gatsbyPurple: '#663399',
  drupalBlue: '#29A8DF',
  drupal9Blue: '#009DE4',
  shopifyGreen: '#80AB42',
  bigCommerceBlue: '#0D52FF',
  lbRed: 'rgb(229, 33, 61)',
  lbColor: `rgba(16, 18, 22,0.2)`,
  lbPastelRed: '#98676b',
  lbWhite: '#f4ebe2',
  lbMain: '#3f3f3f',
  lbBrown: '#bcb0a7',
  lbGray: '#595959',
  lbBurgundy: '#9b5555',
  lbDarkBlue: '#616c6e',

};
