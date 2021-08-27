import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const LoggedOutItemsMenuStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  .logged-out-item{
    background-color: transparent;
    border: none;
    margin: 0 10px;
    padding: 0;
    color: var(--navigation-text-color);
  }
`
const LoggedOutItemsMenu = props => {
    const contextData = useContext(AppContext);

    const onLoginRegisterHandler  = type =>{
        contextData.dispatchState({
            ...contextData.state,
            loginRegisterFormPopup:true,
            loginRegisterFormPopupType:type
        })
    }



    if (!contextData.userData.username || contextData.userData.username === 'guest' ) {
        return (
            <LoggedOutItemsMenuStyledDiv className='logged-out-items'>

                <button onClick={()=>onLoginRegisterHandler('login')} className='logged-out-item ' aria-label='logged-out-items' >
                    <FontAwesomeIcon  style={{width:'24px',height:'24px'}} icon={faUser} />
                </button>
                <button onClick={()=>onLoginRegisterHandler('register')} className='logged-out-item ' aria-label='logged-out-items' >
                    <FontAwesomeIcon style={{width:'24px',height:'24px'}} icon={faPen} />
                </button>
            </LoggedOutItemsMenuStyledDiv>
        )
    } else return null

};
export default LoggedOutItemsMenu;
