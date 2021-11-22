import React from 'react';
import {createGlobalStyle} from "styled-components";

const AdminPanelGlobalStyles = createGlobalStyle`
  :root {
    --admin-color-8: #282828;
    --admin-color-0: #fff;
    --admin-light-blue-color: #0085ba;
    --admin-text-color: #fff;
    --admin-darkcolor: #1b1b1b;
    --admin-darkcolor70: #33373c;
    --admin-darkcolor80: #282828;
    --admin-darkcolor90: #181818;

    --admin-main-text-color: #23282d;
    --admin-main-background-color: #f1f1f1;

    --admin-button-text-color: #fff;
    --admin-button-background-color: #999;

    --admin-input-background-color: #fff;
    --admin-input-text-color: #23282d;

    --admin-topbar-background-color: #000;
    --admin-topbar-text-color: #fff;

    --admin-sidebar-text-color: #fff;
    --admin-sidebar-background-color: #000;

  }

  body {
    background-color: #f1f1f1;
    margin: 0;
    font-family: Montserrat, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 12px;
  }

  a {
    text-decoration: none;
  }
`

export default AdminPanelGlobalStyles;
