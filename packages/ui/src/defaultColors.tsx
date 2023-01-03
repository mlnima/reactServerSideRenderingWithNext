import { css } from 'styled-components';

const defaultColors = css`
  :root{
    --main-text-color: #fff;
    --secondary-text-color: #ccc;
    --tertiary-text-color: #c7c7c7;

    --main-background-color: #000;
    --secondary-background-color: #181818;
    --dim-background-color:rgba(0,0,0,.6);
    --main-active-color :#f90;
    --main-secondary-color :#6c757d;
    --primary-gradiant:linear-gradient(180deg,#fff,hsla(0,0%,100%,.6));
    //buttons
    --primary-button-link-background-color: #f90;
    --primary-button-link-text-color: #000;

    --secondary-button-link-background-color: #6c757d;
    --secondary-button-link-text-color: #fff;

    --success-button-link-background-color: #28a745;
    --success-button-link-text-color: #fff;

    --danger-button-link-background-color: #dc3545;
    --danger-button-link-text-color: #fff;

    --warning-button-link-background-color: #f90;
    --warning-button-link-text-color: #212529;

    --info-button-link-background-color: #117a8b;
    --info-button-link-text-color: #fff;

    --dark-button-link-background-color:#1b1b1b;
    --dark-button-link-border-color: #1b1b1b;
    --dark-button-link-text-color: #fff;

    --light-button-link-background-color:#f8f9fa;
    --light-button-link-border-color: #f8f9fa;
    --light-button-link-text-color: #212529;
  }
`

export default defaultColors