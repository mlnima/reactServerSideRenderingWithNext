//import React from 'react';
import {createGlobalStyle} from "styled-components";

let GlobalStyles = createGlobalStyle`
  ${props => props.colors.includes(':root') ? props.colors :`:root {${props.colors}}`}
  body {
    background-color: var(--main-background-color, #000);
    margin: 0;
    color: var(--main-text-color, '#ccc');
    font-family: Montserrat, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
  }

  .main {
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
  
  .leftSidebar {
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

  .rightSidebar {
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
    background-color: var(--primary-button-link-background-color, #007bff);
    color: var(--primary-button-text-color, #fff);
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
  

  @media only screen and (min-width: 768px) {

    body {
      font-size: 14px;
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

