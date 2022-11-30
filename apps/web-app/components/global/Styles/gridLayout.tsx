//grid-layout
import { css } from 'styled-components';


interface GlobalStylesPropTypes {
    customColors: string,
    customStyles: string,
    sideBarWidth: number,
}


const gridLayout = css`


  .page-both-sidebar {
    grid-template-columns: 1fr;
    grid-template-areas: 'primary'
                         'left-sidebar'
                         'right-sidebar';
  }

  .page-no-sidebar {
    grid-template-columns: 1fr;
    grid-template-areas: 'primary';
  }

  .page-left-sidebar {
    grid-template-columns: 1fr;
    grid-template-areas: 'primary'
                         'left-sidebar';
  }

  .page-right-sidebar {
    grid-template-columns: 1fr;
    grid-template-areas: 'primary'
                         'right-sidebar';
  }


  #page {

    #content {
      margin: 0 auto;
      width: 100%;
      max-width: 100vw;
      display: grid;
      grid-area: page;
      min-height: 40em;

      #primary {
        grid-area: primary;
        width: 100%;
      }
    }
  }
  
  @media only screen and (min-width: 1024px) {
    body {
      font-size: 0.875rem;
    }

    #page {
      width: 100%;
      padding: 8px;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      #content {
      
        width: 100%;
        display: grid;
        grid-area: page;
        min-height: 40em;
        min-width: 991px;
        max-width: 1323px !important;

        #primary {
          //margin: 8px auto;
          grid-area: primary;
          width: 100%;
          #main{
            width: 100%;
          }
        }
      }

      .page-both-sidebar {
        grid-template-columns: ${({sideBarWidth}: GlobalStylesPropTypes) => `${sideBarWidth}px 1fr ${sideBarWidth}px`};
        grid-template-areas: 'left-sidebar primary right-sidebar';
      }

      .page-no-sidebar {
        grid-template-columns: 1fr;
        grid-template-areas: 'primary';
      }

      .page-left-sidebar {
        grid-template-columns: ${({sideBarWidth}: GlobalStylesPropTypes) => `${sideBarWidth}px 1fr`};
        grid-template-areas: 'left-sidebar primary';
      }

      .page-right-sidebar {
        grid-template-columns: ${({sideBarWidth}: GlobalStylesPropTypes) => ` 1fr ${sideBarWidth}px`};
        grid-template-areas: 'primary right-sidebar';
      }

      .without-sidebar-layout {
        grid-template-columns: 1fr;
      }
    }
  }
`

export default gridLayout