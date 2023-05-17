import styled from "styled-components";

export const Styles = styled.div`
  width: 100%;
  height: 70px;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  cursor: pointer;
  
  .messenger-conversation-preview {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 70px 1fr;

    .profile-image {
      width: 100%;
      height: 100%;
      color: var(--main-text-color, #fff);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    .username-date {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info {
      //display: flex;
      height: 100%;
      grid-template-rows: 1fr 1fr;


      .seen-content {
        display: grid;
        grid-template-columns: 25px 1fr;
        align-items: center;

        .content {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;