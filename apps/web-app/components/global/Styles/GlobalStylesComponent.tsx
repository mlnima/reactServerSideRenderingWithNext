import {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {FC} from "react";
import {Store} from "typescript-types";
import keyframes from './keyframes';
import buttons from './buttons';

interface GlobalStylesPropTypes {
  customColors:string,
  customStyles:string,
  sideBarWidth:number,
}

const GlobalStyles= createGlobalStyle`
  ${({customColors}:GlobalStylesPropTypes ) => customColors?.includes(':root') ? customColors :`:root {${customColors}}`}
  ${keyframes}
  ${buttons}
  body {
    background-color: var(--main-background-color, #000);
    //margin: 0;
    color: var(--main-text-color, '#ccc');
    font-family: Arial,serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 0.875rem;
    margin: 0;
    padding: 0;
  }

  #content{
    margin: 0 auto;
    width: 100%;
    max-width: 100vw;
    display: grid;
    grid-area: page;
    min-height: 40em;
    #primary{
      grid-area: primary;
      width: 100%;
    }
  }
  
  a {
    text-decoration: none;
    box-sizing: border-box;
    outline: none;
  }
  
  .post-element-info-logo {
    max-width: 25px;
    max-height: 25px;
    color: var(--post-element-text-color, #ccc);
  }

  .value-next-icon {
    color: var(--post-element-text-color, #ccc);
    margin: 0 5px;
  }

  .post-element-info-data {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 1px 3px;
    color: var(--post-element-text-color, #ccc);
  }
  
  .left-sidebar-layout {
    display: grid;
    grid-area: leftSidebar;
    grid-template-columns: 1fr;
    grid-template-areas:
          'topbar'
          'header'
          'navigation'
          'main'
          'leftSidebar'
          'footer';
  }
  //---pages grid----
  #page{
    grid-area: main;
  }
  
  .page-both-sidebar{
    grid-template-columns: 1fr;
    grid-template-areas: 'primary'
                         'left-sidebar'
                         'right-sidebar';
  }
  .page-no-sidebar{
    grid-template-columns: 1fr  ;
    grid-template-areas: 'primary' ;
  }
  .page-left-sidebar{
    grid-template-columns: 1fr;
    grid-template-areas: 'primary'
                         'left-sidebar';
  }
  .page-right-sidebar{
    grid-template-columns: 1fr;
    grid-template-areas: 'primary'
                         'right-sidebar';
  }
  

  .action-client-button-link {
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 0 5px 2.5px rgba(255, 255, 255, .2);
  }
  

  
  .form-group{
    margin-bottom: 1rem;
  }
  
  .form-control-input{
    width: 100%;
    display: block;
    padding: .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }  
  .form-control-input-validator{
    width: 80%;
  }

  .custom-select{
    display: inline-block;
    width: 50%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff ;
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }
  
  @media only screen and (min-width: 768px) {
    body {
      font-size: 0.875rem;
    }
    #page{
      margin: 0;
      //max-width: 97vw;
    }
    //---pages grid----
    .page-both-sidebar{
      grid-template-columns: ${({sideBarWidth}:GlobalStylesPropTypes )=> `${sideBarWidth}px 1fr ${sideBarWidth}px` }  ;
      grid-template-areas: 'left-sidebar primary right-sidebar' ;
    }
    .page-no-sidebar{
      grid-template-columns: 1fr  ;
      grid-template-areas: 'primary' ;
    }
    
    .page-left-sidebar{
      grid-template-columns: ${({sideBarWidth}:GlobalStylesPropTypes )=> `${sideBarWidth}px 1fr`} ;
      grid-template-areas: 'left-sidebar primary';
    }
    .page-right-sidebar{
      grid-template-columns: ${({sideBarWidth}:GlobalStylesPropTypes )=> ` 1fr ${sideBarWidth}px`} ;
      grid-template-areas: 'primary right-sidebar';
    }
    .without-sidebar-layout {
      grid-template-columns: 1fr;
    }
    

    .simple-button {
      background-color: transparent;
      color: var(--main-text-color);
      margin: 10px 0;
    }

  }
  

  

  @media only screen and (min-width: 1024px) {

    #content,#main-content{
      margin:auto;
      min-width: 991px;
      max-width: 1323px !important;

    }

  }

  ${({customStyles}:GlobalStylesPropTypes ) => customStyles ? customStyles : '' }
`

const GlobalStylesComponent : FC = () =>{
  const {customColors,customStyles,sideBarWidth} = useSelector(({settings}:Store)=>{
    return{
      customColors: settings?.design?.customColors,
      customStyles: settings?.design?.customStyles,
      sideBarWidth: settings?.design?.sideBarWidth,
    }
  })
  return (
      <GlobalStyles customColors={customColors || ''} customStyles={customStyles || ''} sideBarWidth={sideBarWidth || 320}/>
  )
}

export default GlobalStylesComponent;

