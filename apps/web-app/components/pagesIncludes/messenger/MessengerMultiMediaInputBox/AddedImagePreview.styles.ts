import styled from "styled-components";


export const Styles = styled.form`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .50);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .added-image-preview {
    height: 100%;
    width: 100%;
    background-color: var( --secondary-background-color,#B3B3B3);
    border-radius: 5px;
    .image-preview-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 32px;
   
      .close-btn{
        color: var(--primary-text-color,#fff);
      }
    }

    img {
      width: 100%;
      height: auto;
    }
    
    .image-preview-footer{
      display: grid;
      grid-template-columns: 1fr 35px;
    }
  }


  @media only screen and (min-width: 768px) {
    .added-image-preview {
      width: 400px;
      height: auto;
    }
  }
`