//WidgetModel

import styled from "styled-components";
export const WidgetModelStyledDiv = styled.div`
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

  .open-section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
    
    .section-title{
      
    }
    .section-action{
      
    }
  }

  .widgetSection, .selectFieldForWidget, .TextInputFieldForWidget {
    margin: 10px auto;
    width: 95%;
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
    width: 95%;
  }

  .customStylesTextarea {
    width: 95%;
  }



  .monaco-editor-section {
    .editor-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 95%;
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
    margin: 30px 0;
    display: flex;
    justify-content: space-evenly;

    button {
      padding: 5px 5%;
    }
  }
    `