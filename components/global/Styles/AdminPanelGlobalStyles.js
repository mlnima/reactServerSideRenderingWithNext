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
              }

              //select, input {
              //  background-color: var(--admin-input-background-color);
              //  color: var(--admin-input-text-color);
              //  border: 1px solid #ccc;
              //  padding: 7px 3px;
              //  line-height: 100%;
              //}

              button,.link-as-button {
                background: var(--admin-button-background-color);
                color: var(--admin-button-text-color);
                cursor: pointer;
                display: inline-block;
                letter-spacing: 1px;
                text-align: center;

                &:hover {
                  background-color: #0085ba;
                  transition: .5s;
                }
              }

              input[type=text],input[type=number], button,select,.link-as-button {
                display: inline-block;
                font-size: 14px;
                border-radius: 0;
                -webkit-appearance: none;
                border: 1px solid #ccc;
                height: 30px;
                padding: 2px 5px;
                margin: 0;
                -moz-box-sizing: content-box;
                -webkit-box-sizing: content-box;

              }
              
              textarea{
               border: 1px solid #ccc;
              }

              input[type=text],input[type=number]  {
                font-size: 14px;
                width: 100%;
                outline: 0;
              }
              
              
              .asset-table-check-box{
              width: initial;
              height: initial;
              }

              select {
                //border: none;
                text-align: center;
                padding: 4px;
              }

              a {
                text-decoration: none;
              }


              .colorSettingSection {
                background-color: var(--admin-main-background-color);
                padding: 10px;
                max-width: 300px;


                p {
                  color: var(--admin-main-text-color);
                }
              }

              .previewColor {
                height: 30px;
                width: 30px;
                margin: 5px;

              }

              .style-section {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .style-section-editor {
                  min-height: 80vh;
                  width: 100%;
                  background-color: white;
                }
              }

            `}</style>
        </React.Fragment>
    );
};
export default AdminPanelGlobalStyles;
