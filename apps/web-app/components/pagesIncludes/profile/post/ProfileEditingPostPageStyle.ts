import styled from "styled-components";

export const ProfilePostPageStyle = styled.div`
  margin: 20px auto;
  box-sizing: border-box;
  max-width: 738px;
  box-sizing: border-box;

  #primary {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: 20px 0;
    gap: 8px;
    padding: 8px;
    box-sizing: border-box;
    background-color: var(--secondary-background-color, #181818);

    .info-box {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }

    .description-section, .title-section, .capacity {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 8px;

      .description {
        min-height: 90px;
      }

      input, .description {
        width: 80%;
      }
    }
  }

  .create-new-post-fields {

    .field-section {
      width: 100%;

      p {
        width: 20%;
      }
    }


    .meta-selector-section {
      display: grid;
      grid-template-columns: 20% 80%;
    }

    .admin-control-fields {
      border: var(--default-border);
      background-color: var(--secondary-background-color, #181818);
    }
  }

  @media only screen and (min-width: 768px) {
    .create-new-post-fields {
      margin: auto;
    }
  }
`