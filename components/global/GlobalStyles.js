//import React from 'react';
import {createGlobalStyle} from "styled-components";

let GlobalStyles = createGlobalStyle`
  :root {
    ${props => props.colors}
  }

  body {
    background-color: var(--background-color);
    margin: 0;
    font-family: Montserrat, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
  }


  .post-element-info-logo {
    max-width: 25px;
    max-height: 25px;
    color: var(--post-element-text-color);
  }

  .value-next-icon {
    color: var(--post-element-text-color);
    margin: 0 5px;
  }

  .post-element-info-data {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 1px 3px;
    color: var(--post-element-text-color);
  }


  .leftSidebar {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
          'topbar'
          'header'
          'navigation'
          'main'
          'leftSidebar'
          'footer';
  }

  .rightSidebar {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
            'topbar'
            'header'
            'navigation'
            'main'
            'rightSidebar'
            'footer';
  }

  .bothSidebar {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
            'topbar'
            'header'
            'navigation'
            'main'
            'leftSidebar'
            'rightSidebar'
            'footer';
  }

  .withOutSidebar {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
            'topbar'
            'header'
            'navigation'
            'main'
            'footer';
  }

  @media only screen and (min-width: 768px) {


    .leftSidebar {
      grid-template-columns: 320px 1fr;
      grid-template-areas:  'topbar topbar'
                                        'header header' 
                                        'navigation navigation'
                                        'leftSidebar main'
                                        'footer footer'
    }

    .rightSidebar {
      grid-template-columns: 1fr 320px;
      grid-template-areas:  'topbar topbar'
                                        'header header'
                                        'navigation navigation'
                                        'main rightSidebar'
                                        'footer footer'
    }

    .bothSidebar {
      grid-template-columns: 320px 1fr 320px;
      grid-template-areas:  'topbar topbar topbar'
                                        'header header header'
                                        'navigation navigation navigation'
                                        'leftSidebar main rightSidebar'
                                        'footer footer footer'
    }

    .withOutSidebar {
      grid-template-columns: 1fr;
    }

    .simple-button {
      background-color: transparent;
      color: var(--main-text-color);
      margin: 10px 0;
    }

  }

  @keyframes navigationMobileSlide {
    from {
      left: -100%;
    }
    to {
      left: 0;
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

  ${props => props.globalStyleData}
`

export default GlobalStyles;

