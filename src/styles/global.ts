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
    background: url('/img/bg-body.png') center bottom no-repeat, #000000;
    font-size: 1.6rem;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;

    &.no-scroll {
      overflow: hidden;
      padding-right: 15px;
    }
  }

  body, input, button {
    font-family: 'Montserrat', sans-serif;
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

  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: 1rem; }
  .mt-2 { margin-top: 2rem; }
  .mt-3 { margin-top: 3rem; }
`;
