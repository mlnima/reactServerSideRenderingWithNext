import React from 'react';

const WidgetModelStyles = props => {
    return (
        <React.Fragment>
            <style global jsx>{`
              .widget-model-open {

                z-index: 3;
                background-color: var(--admin-color-8);
                display: flex;
                flex-direction: column;
                color: var(--admin-text-color);
                position: initial;
                top: 100px;
                width: 100%;
                resize: both;
                overflow: hidden;


                p {

                  width: 95%;
                  margin: auto;
                  font-size: .8rem;
                }

                .widgetInfo {
                  margin: auto;
                  width: 95%;

                }

                .customStylesTextarea {
                  width: 95%;
                  min-height: 250px;
                  margin: auto;


                }

                .widgetSection {
                  margin: auto;
                  width: 95%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  flex-wrap: wrap;

                  p {
                    width: 40%;
                    font-size: 12px;
                    margin: 0 10px;
                  }

                  input, select {
                    display: block;
                    width: 50%;
                    -ms-box-sizing: content-box;
                    -moz-box-sizing: content-box;
                    -webkit-box-sizing: content-box;
                    box-sizing: content-box;
                  }
                }

                textarea {
                  min-height: 250px;
                }

                button {
                  // @include AdminLightBtn;
                }

                .media-widget {
                  display: flex;
                  justify-content: center;
                }

                input, select, button {
                  margin: 5px;
                }

                input, select {
                  background-color: #181818;
                  color: white;
                }

                .control-buttons {
                  display: flex;
                  justify-content: space-evenly;

                  button {
                    padding: 5px 5%;
                  }
                }

              }

            `}</style>

        </React.Fragment>
    );
};
export default WidgetModelStyles;
