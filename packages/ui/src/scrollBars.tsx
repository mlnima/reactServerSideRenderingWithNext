import { css } from 'styled-components';

const scrollBars = css`
  .custom-scroll {
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-thumb {
      width: 10px;
      border-radius: 2px;
      background-color: var(--secondary-background-color,#181818);
    }
    ::-webkit-scrollbar-track {
      width: 10px;
      height: 10px;
    }
  }
`

export default scrollBars
