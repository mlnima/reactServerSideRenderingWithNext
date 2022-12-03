import styled from "styled-components";

const PostPageStyle = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  grid-area: primary;

  
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

  .rating-buttons{
    justify-content: flex-start;
  }
  .download-button{
    justify-self: flex-end;
  }
  
  ${(props: { postPageStyle: string }) => props?.postPageStyle || ''}
`

export default PostPageStyle