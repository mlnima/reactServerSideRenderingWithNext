import {createGlobalStyle} from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {FC} from "react";

interface GlobalStylesPropTypes {
  customColors:string,
  customStyles:string,
  sideBarWidth:number,
}

const GlobalStyles= createGlobalStyle`
  ${({customColors}:GlobalStylesPropTypes ) => customColors?.includes(':root') ? customColors :`:root {${customColors}}`}
  
  body {
    background-color: var(--main-background-color, #000);
    margin: 0;
    color: var(--main-text-color, '#ccc');
    font-family: Arial,serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 15px;
  }

  #main-content{
    margin: 0 auto;
    max-width: 100vw;
    min-height: 100vh;
  }


  a {
    text-decoration: none;
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

  .sidebar {
    grid-area: sidebar;
  }

  .right-sidebar-layout {
    display: grid;
    grid-area: rightSidebar;
    grid-template-columns: 1fr;
    grid-template-areas:
            'topbar'
            'header'
            'navigation'
            'main'
            'rightSidebar'
            'footer';
  }

  .both-sidebar-layout {
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

  .without-sidebar-layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
            'topbar'
            'header'
            'navigation'
            'main'
            'footer';
  }

  .action-client-button-link {
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 0 5px 2.5px rgba(255, 255, 255, .2);
  }
  
  .btn{
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid var(--primary-button-link-text-color, #000);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
  }  
  .btn-primary{
    background-color: var(--primary-button-link-background-color, #f90);
    color: var(--primary-button-link-text-color, #000);
  }  
  .btn-secondary{
    background-color: var(--secondary-button-link-background-color, #6c757d);
    color: var(--secondary-button-text-color, #fff);
  } 
  .btn-success{
    background-color: var(--success-button-link-background-color,#28a745);
    color: var(--success-button-text-color, #fff);
  }
  .btn-danger{
    background-color: var(--danger-button-link-background-color, #dc3545);
    color: var(--danger-button-text-color, #fff);
  }
  .btn-warning{
    background-color: var(--warning-button-link-background-color, #f90);
    color: var(--warning-button-text-color, #212529);
  }
  .btn-info{
    background-color: var(--info-button-link-background-color, #117a8b);
    color: var(--info-button-text-color, #fff);
  }
  .btn-transparent-dark{
    background-color: transparent;
    color:  var(--transparent-dark-button-color, #343a40); 
    border-color:  transparent;
  }
  .btn-transparent-light{
    background-color: transparent;
    color: var(--transparent-light-button-color,  #fff); 
    border-color:  transparent;
  }
  .btn-dark{
    background-color: var( --dark-button-link-background-color, #343a40);
    border-color:  var(--dark-button-link-border-color, #343a40);
    color: var(--info-button-text-color, #fff);
  }
  .btn-navigation{
    background-color:var(--navigation-background-color, #18181b);
    color: var(--navigation-text-color, #ccc);
    border: none;
  }
  
  .form-group{
    margin-bottom: 1rem;
  }
  
  .form-control-input{
    width: 100%;
    display: block;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }  
  .form-control-input-validator{
    width: 85%;
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
      font-size: 14px;
    }
    .left-sidebar-layout {
      grid-template-columns: ${({sideBarWidth}:GlobalStylesPropTypes )=> `${sideBarWidth}px 1fr`} ;
      grid-template-areas:  'topbar topbar'
                                        'header header' 
                                        'navigation navigation'
                                        'leftSidebar main'
                                        'footer footer'
    }

    .right-sidebar-layout {
      grid-template-columns: ${({sideBarWidth}:GlobalStylesPropTypes )=> ` 1fr ${sideBarWidth}px`} ;
      grid-template-areas:  'topbar topbar'
                                        'header header'
                                        'navigation navigation'
                                        'main rightSidebar'
                                        'footer footer'
    }

    .both-sidebar-layout {

      grid-template-columns: ${({sideBarWidth}:GlobalStylesPropTypes )=> `${sideBarWidth}px 1fr ${sideBarWidth}px` }  ;
      grid-template-areas:  'topbar topbar topbar'
                                        'header header header'
                                        'navigation navigation navigation'
                                        'leftSidebar main rightSidebar'
                                        'footer footer footer'
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
  
  @media only screen and (min-width: 768px) {
    #main-content{
      margin: 0;
      max-width: 97vw;
    }
  }

  ${({customStyles}:GlobalStylesPropTypes ) => customStyles ? customStyles : '' }
`

const GlobalStylesComponent : FC = () =>{
  const {customColors,customStyles,sideBarWidth} = useSelector(({settings}:StoreTypes)=>{
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


