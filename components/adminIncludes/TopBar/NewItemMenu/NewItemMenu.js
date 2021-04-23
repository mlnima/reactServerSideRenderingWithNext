import Link from "next/link";
import styled from "styled-components";
let StyledDiv = styled.div`
  position: fixed;
  top: 40px;
  background-color: #33373c;
  width: 150px;
  padding: 10px;
  z-index: 17;

  a {
    color: white;

  }
`
const NewItemMenu = props => {

    if (props.active){
        return (
            <StyledDiv className='NewItemMenu'>
                <Link href='/admin/post?new=1'><a className='SideBarItem adminTopBarItem'>New Post</a></Link>
            </StyledDiv>
        );
    }else return null


};
export default NewItemMenu;