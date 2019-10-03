import 'styled-components';

export interface Theme {
  color: string;
  backgroundColor: string;
  colors: {
    primary: string;
    lightGrey: string;
    white: string;
    black: string;
    lightBlack: string;
    smokyBlack: string;
    smokyWhite: string;
    spaceGray: string;
    grey: string;

    success: string;
    warning: string;
    error: string;

    boxBackground: string;
    boxBorder: string;

    unused: string;
    electricity: string;
  };

  borderRadius: string;

  z: {
    bigger: number;
    high: number;
    superHigh: bumber;
  };

  fontSize: {
    h1: string;
    big: string;
    bigger: string;
    smaller: string;
    small: string;
  };
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
