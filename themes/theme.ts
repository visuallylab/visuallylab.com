import { Theme } from '@/typings/styled';

const theme: Theme = {
  color: '#4a4a4a',
  backgroundColor: '#ffffff',
  colors: {
    primary: '#3562ad',
    grey: '#cccccc',
    lightGrey: '#fbfbfb',
    black: '#000000',
    white: '#ffffff',
    lightBlack: '#4a4a4a',
    smokyBlack: '#070707',
    smokyWhite: '#F4F7F7',
    spaceGray: '#46494c',
    boxBackground: 'rgba(70, 73, 76, .2)',
    boxBorder: 'rgba(70, 73, 76, .5)',
    success: '#52c41a',
    warning: '#fa8c16',
    error: '#f5222d',
    unused: '#9d9da0',
    electricity: '#59e2c2',
  },

  borderRadius: '6px',

  fontSize: {
    h1: '2.25rem',
    big: '1.5rem',
    bigger: '1.2rem',
    smaller: '.875rem',
    small: '.75rem',
  },

  z: {
    bigger: 10,
    high: 100,
    superHigh: 1000,
  },
};

export default theme;
