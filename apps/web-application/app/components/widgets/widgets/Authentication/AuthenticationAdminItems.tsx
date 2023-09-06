import Link from "next/link";
import {commonAPIRequestClearCaches} from "api-requests";
import {useAppDispatch} from "@store/hooks";
import {setAdminMode} from "@store/reducers/globalStateReducer";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faEraser} from "@fortawesome/free-solid-svg-icons/faEraser";
import {faShield} from "@fortawesome/free-solid-svg-icons/faShield";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {useRouter} from "next/navigation";

const AuthenticationAdminItems = ({}) => {
    const {refresh} = useRouter()
    const dispatch = useAppDispatch()
    const adminMode = useSelector(({globalState}: Store) => globalState.adminMode)

    const onSetAdminModeHandler = () => {
        dispatch(setAdminMode(!adminMode))
        localStorage.setItem('adminMode', localStorage?.adminMode === 'true' ? 'false' : 'true')
    }

    const onReloadHandler = () => {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    const onClearCacheHandler = ()=>{
        commonAPIRequestClearCaches().then(() => {
            refresh()
            onReloadHandler()
        })
    }

    return (
        <>
            <Link href={'/dashboard'} target={'_blank'} className={'logged-item'}>
                <div className={'icon-wrapper'}>
                    <FontAwesomeIcon icon={faUserShield} style={{width: 25, height: 25}}/>
                </div>

                Dashboard
            </Link>
            <span className={'logged-item'} onClick={onClearCacheHandler}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                  </div>
                Clear Cache
            </span>
            <span className={'logged-item'} onClick={() => onSetAdminModeHandler()}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={adminMode ? faCheck : faShield} style={{width: 25, height: 25}}/>
                  </div>
                Admin Mode
            </span>
        </>
    )
};
export default AuthenticationAdminItems;