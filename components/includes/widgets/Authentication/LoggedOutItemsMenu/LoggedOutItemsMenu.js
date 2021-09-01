import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {withTranslation} from "next-i18next";


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
            <div className='logged-out-items'>

                <button onClick={()=>onLoginRegisterHandler('login')} className='logged-out-item ' aria-label='logged-out-items' >
                    {props.t(`common:Login`)}
                </button>
                <button onClick={()=>onLoginRegisterHandler('register')} className='logged-out-item ' aria-label='logged-out-items' >
                    {props.t(`common:Sign Up`)}
                </button>
            </div>
        )
    } else return null

};
export default withTranslation(['common'])(LoggedOutItemsMenu);
