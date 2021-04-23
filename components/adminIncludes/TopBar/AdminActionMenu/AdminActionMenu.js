import styled from "styled-components";
let StyledDiv = styled.div`
  background-color: #33373c;
  position: fixed;
  top: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .AdminActionMenuItem {
    @include transparentLightTextBtn;
    padding:10px;
  }
`


const AdminActionMenu = props => {
    if (props.active) {
        return (
            <StyledDiv className='AdminActionMenu'>
                <button className='AdminActionMenuItem adminTopBarItem'> My Profile</button>
                <button className='AdminActionMenuItem adminTopBarItem'> Edit My Profile</button>
                <button className='AdminActionMenuItem adminTopBarItem'> Log Out</button>
            </StyledDiv>
        );
    } else return null
};
export default AdminActionMenu;