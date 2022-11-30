
import { css } from 'styled-components';

const scrollBar = css`
  ::-webkit-scrollbar {
    background: var(--main-background-color, #000);
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary-background-color, #181818);
  }

  ::-webkit-scrollbar-track-piece {
    background: var(--main-background-color, #000);
  }

  ::-webkit-scrollbar-button {
    background: var(--secondary-background-color, #181818);
  }

  ::-webkit-scrollbar-button:single-button:vertical:decrement {
    color: wheat;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--secondary-background-color, #181818);
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: rgb(128, 128, 128);
  }

  ::-webkit-scrollbar-corner {
    background: red;
  }
`

export default scrollBar