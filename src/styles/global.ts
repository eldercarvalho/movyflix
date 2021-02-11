import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    /* background: url('/img/bg-body.png') center bottom no-repeat, #000000; */
    background: #000;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .spacer {
    flex: 1 !important;
  }

  .no-scroll {
    overflow: hidden;
  }

  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: 1rem; }
  .mt-2 { margin-top: 2rem; }
  .mt-3 { margin-top: 3rem; }
`;
