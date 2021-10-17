import React from 'react';

const AdminPanelGlobalStyles = () => {

    return (
        <React.Fragment>
            <style jsx global>{`
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

                --admin-topbar-background-color: #24282d;
                --admin-topbar-text-color: #fff;

                --admin-sidebar-text-color: #fff;
                --admin-sidebar-background-color: #24282d;

              }

              body {
                background-color: var(--main-background-color,#000);
                margin: 0;
                font-family: Montserrat, Verdana, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                 font-size: 12px;
              }
              a {
                text-decoration: none;
              }
              
            `}</style>
        </React.Fragment>
    );
};
export default AdminPanelGlobalStyles;
