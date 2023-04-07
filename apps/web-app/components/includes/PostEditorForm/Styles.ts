import styled from "styled-components";

export const PostEditorFormStyles = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-background-color, #181818);
  padding: 8px;
  box-sizing: border-box;
  .formSection {
    //padding: 8px;
    //box-sizing: border-box;
    width: 100%;
  }

  .imageUploader {
    //background-color: var(--main-background-color, #000);
  }

  .description {
    min-height: 90px;
  }

  .submitButton {
    width: 100%;
    max-width: 320px;
  }
`