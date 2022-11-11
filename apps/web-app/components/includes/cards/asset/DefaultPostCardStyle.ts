import styled from "styled-components";
const DefaultPostCardStyle = styled.article`
  background-color: var(--secondary-background-color, #181818);
  margin: 0 auto;
  width: 100%;
  
  .card-under-media-info{
    color: var(--secondary-text-color, #ccc);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: small;
    padding: 0 5px;
    box-sizing: border-box;
    .card-views{
      margin-right: 10px;

      .card-views-count{
        margin-right: 5px;
      }
    }

    .card-under-title-info-data {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

export default DefaultPostCardStyle;