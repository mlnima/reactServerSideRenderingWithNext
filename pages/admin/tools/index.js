import Link from 'next/link'
import styled from "styled-components";
let StyledDiv = styled.div`
    .quickAccess {
    .quickAccessBtn {
      @include greenActionBtn;
    }
  }

  .terminalControl {
    display: flex;
    justify-content: space-between;

    width: 95%;

    input {
      background-color: black;
      color: white;
      width: 95%;
    }

    button {
      background-color: black;
      color: yellow;
      border: none;
    }
  }

  #terminalLog {
    width: 95%;
    min-height: 50vh;
    background-color: black;
    color: #916d07;
    margin-top: 40px;
    overflow: scroll;
  }
`


const tools = () => {

    return (

            <StyledDiv className='adminTools'>
                <Link href='/admin/tools/terminal'><a>Terminal</a></Link>
            </StyledDiv>

    );
};
export default tools;
