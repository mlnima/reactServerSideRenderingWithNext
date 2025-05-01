//WidgetModel

import styled from "styled-components";

export const WidgetModelStyledDiv = styled.div`
  z-index: 3;
  background-color: var(--secondary-background-color,#181818);
  display: flex;
  flex-direction: column;
  color: var(--primary-text-color,#fff);
  position: initial;
  top: 100px;
  width: 100%;
  resize: both;
  overflow: hidden;
  padding: 8px;
  box-sizing: border-box;
  .open-section {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: auto;

    .section-title {

    }

    .section-action {

    }
  }

  .widgetSection, .selectFieldForWidget, .TextInputFieldForWidget {
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      width: 40%;

      margin: 0;
    }


  }
  
  .objectEditingModeEditor {
    min-height: 1024px;
  }

  .widgetModel {
    overflow-y: auto;
  }

  .widgetInfo {
    margin: auto;
   
  }

  .customStylesTextarea {
    width: 95%;
  }


  .monaco-editor-section {
    .editor-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 10px auto;

      p {
        width: 40%;
        margin: 0;
      }
    }

  }

  textarea {
    min-height: 250px;
  }

  .media-widget {
    display: flex;
    justify-content: center;
  }

  .control-buttons {
    margin-top: 20px ;
    display: flex;
    justify-content: space-evenly;
    

    button {
      padding: 5px 5%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .primarySelect{
    max-width: 200px;
  }
`