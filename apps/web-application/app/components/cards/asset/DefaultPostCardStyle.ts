import styled from "styled-components";

const DefaultPostCardStyle = styled.article`
  margin: 0 auto;
  width: 100%;

  .card-under-media-info {
    color: var(--secondary-text-color, #b3b3b3);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: small;
    padding: 0 4px;
    box-sizing: border-box;

    .card-views {
      margin-right: 10px;

      .card-views-count {
        margin-right: 5px;
      }
    }

    .card-under-title-info-data {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media only screen and (min-width: 768px) {
    .card-under-media-info {
      padding: 0;

      .card-views {
        margin-right: 0;
      }
    }
  }

`

export default DefaultPostCardStyle;