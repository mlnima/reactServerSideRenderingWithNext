import styled from "styled-components";

const PostPageStyle = styled.div`
//entry-content
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  grid-area: primary;
  
  //.promotion-thumbnail-link {
  //  display: flex;
  //  flex-direction: column;
  //  align-items: center;
  //  justify-content: center;
  //
  //  .main-thumbnail {
  //    margin: auto;
  //    max-width: 320px;
  //  }
  //
  //  .redirect-link {
  //    color: var(--main-text-color);
  //    padding: 10px 20px;
  //    border: var(--main-text-color) 1px solid;
  //  }
  //}
  
  //article{
  //  entry-header{
  //    
  //  }
  //}

  .rating-buttons,.show-hide-comments,.download-button{

    display: flex;
    justify-content: center;
    align-items: center;

    .rating-item,.show-hide-comments-button,.download-link{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: transparent;
      color: var(--secondary-text-color, #ccc);
      outline: none;
      border: none;
      margin-left:  10px;
      min-width: 50px;
      p{
        padding: 0 5px;
        margin-top: 5px;
        font-size: small;
      }
    }
  }
  .download-button{
    justify-self: flex-end;
  }
  
  ${(props: { postPageStyle: string }) => props?.postPageStyle || ''}
`

export default PostPageStyle