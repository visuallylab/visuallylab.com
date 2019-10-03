import { createGlobalStyle } from 'styled-components';
import { media } from '@/utils/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background-color: ${p => p.theme.backgroundColor};
    color: ${p => p.theme.color};
    font-size: 14px; /* 1em = 14px */
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';

    ${media('largeDesktop')} {
      font-size: 16px;
    }
  }

  p {
    margin: 0;
  }

  ol, ul {
    list-style: none;
  }

  input, button {
    outline: none;
    border: none;

    &:focus {
      outline: none;
    }
  }
  
  a {
    color: inherit;
  }
`;
