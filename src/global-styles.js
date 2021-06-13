import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, ::before, ::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
        color: #333;
        font-size: 15px;
    }
`;
