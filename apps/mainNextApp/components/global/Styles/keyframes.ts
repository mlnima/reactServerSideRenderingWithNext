import { css } from 'styled-components';

const keyframes = css`
  @keyframes navigationMobileSlide {
    from {
      left: -100%;
    }
    to {
      left: 0;
    }
  }

  @keyframes userMenuSlide {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }

  @keyframes searchbarFall {
    from {
      top: -40px;
    }
    to {
      top: 0;
    }
  }
`
export default keyframes;