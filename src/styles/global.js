

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
    position: relative;
    overflow-x: hidden; /* evita scroll lateral com sombra */

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: 
        linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.8) 100%),
        url('/back3.jpg') center center / cover no-repeat;
      opacity: 0.92; /* controle da opacidade da imagem */
      z-index: -1;
      pointer-events: none;
    }
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;