import { css } from 'styled-components';

const scrollBars = css`
  .custom-scroll {
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-thumb {
      width: 4px;
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
