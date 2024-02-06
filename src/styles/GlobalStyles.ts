import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Barlow', sans-serif;
    margin: 0;
    color: white;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

`;

export default GlobalStyles;