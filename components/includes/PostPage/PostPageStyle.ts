import styled from "styled-components";

const PostPageStyledMain = styled.main`

  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  grid-area: main;

  .rating-price-download {
    width: 100%;
    background-color: var(--post-page-info-background-color, #181818);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    
    .rating-buttons{
      .rating-item{
        svg{
          width: 24px;
          height: 24px;
        }
      }

    }
  }

  .promotion-thumbnail-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .main-thumbnail {
      margin: auto;
      max-width: 320px;
    }

    .redirect-link {
      color: var(--main-text-color);
      padding: 10px 20px;
      border: var(--main-text-color) 1px solid;
    }
  }

  @media only screen and (min-width: 768px) {

    .rating-price-download {
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  ${(props: { postPageStyle: string }) => props?.postPageStyle || ''}
`

export default PostPageStyledMain