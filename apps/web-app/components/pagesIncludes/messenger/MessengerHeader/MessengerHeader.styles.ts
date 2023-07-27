import styled from "styled-components";


export const Styles = styled.div`
  background-color: var(--secondary-background-color,#181818);
  height: 50px;
  display: flex;
  align-items: center;
  .messenger-header-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
 
    .button-group{
      display: flex;

      button {
        margin: 0 5px;
      }

      &:first-child button {
        margin-left: 0;
      }

      &:last-child button {
        margin-right: 0;
      }
    }
    
    .left,.right{
      .btn{
        color: var(--primary-text-color,#fff);
      }
    }
    
  }

  @media only screen and (min-width: 768px) {

  }
`
