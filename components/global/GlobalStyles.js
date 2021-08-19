import React from 'react';

const GlobalStyles = ({colors}) => {

    return (
        <React.Fragment>
            <style jsx global>{`
              :root {
                ${colors}
              }

              body {
                background-color: var(--background-color);
                margin: 0;
                //font-family: SourceSansPro, Arial, sans-serif;
                font-family: Montserrat, Verdana, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }

              .topbar {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
                align-items: center;
                grid-area: topbar;
                min-height: 48px;
                background-color: var(--topbar-background-color);
              }

              .header {
                display: flex;
                justify-content: center;
                flex-direction: column;
                flex-wrap: wrap;
                align-items: center;
                grid-area: header;
                background-color: var(--header-background-color);
              }

              .navigation {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: center;
                grid-area: navigation;
                min-height: 48px;
                background-color: var(--navigation-background-color);
              }

              .main {
                grid-area: main;
                min-height: 100vh;
              }

              .footer {
                display: flex;
                justify-content: space-evenly;
                background-color: var(--footer-background-color);
                flex-wrap: wrap;
                align-items: center;
                grid-area: footer;
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
                .header {
                  display: flex;
                  flex-direction: row;

                  justify-content: space-evenly;
                  align-items: center;

                }

                .topbar, .navigation {
                  height: 48px;
                }

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
                  left: -200px;
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



            `}</style>
        </React.Fragment>
    );
};
export default GlobalStyles;

