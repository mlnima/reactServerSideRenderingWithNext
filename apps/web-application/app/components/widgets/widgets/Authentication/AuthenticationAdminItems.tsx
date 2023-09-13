import Link from "next/link";
import {commonAPIRequestClearCaches} from "api-requests";
import {useAppDispatch} from "@store/hooks";
import {setAdminMode, setAlert} from "@store/reducers/globalStateReducer";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faEraser} from "@fortawesome/free-solid-svg-icons/faEraser";
import {faShield} from "@fortawesome/free-solid-svg-icons/faShield";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {useParams, usePathname, useSearchParams, useSelectedLayoutSegment} from "next/navigation";
import clearCachesByServerAction
    from "@components/widgets/widgets/Authentication/adminServerActions/adminServerActions";
import socket from "web-socket-client";
import {faBolt} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";


type TClearCache = {
    mode?: 'all'|'only'|'settings'|'widgets'|'similar',
}

const AuthenticationAdminItems = ({}) => {

    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const params = useParams()
    const searchParams = useSearchParams()
    const segment = useSelectedLayoutSegment()
    const adminMode = useSelector(({globalState}: Store) => globalState.adminMode)

    const onClearCacheHandler = async ({mode}: TClearCache): Promise<void> => {
        try {
            await commonAPIRequestClearCaches()
            await clearCachesByServerAction({
                path:pathname,
                segment,
                mode,
                searchParams,
                params
            })

            dispatch(setAlert({
                message: 'Cache cleared',
                type: 'info'
            }))
        } catch (error) {
            dispatch(setAlert({
                message: 'Error While Clearing Cache',
                type: 'error'
            }))
        }
    }

    const onSetAdminModeHandler = () => {
        dispatch(setAdminMode(!adminMode))
        localStorage.setItem('adminMode', localStorage?.adminMode === 'true' ? 'false' : 'true')
    }

    return (
        <>
            <Link href={'/dashboard'} target={'_blank'} className={'logged-item'}>
                <div className={'icon-wrapper'}>
                    <FontAwesomeIcon icon={faUserShield} style={{width: 25, height: 25}}/>
                </div>
                Dashboard
            </Link>

            <span className={'logged-item'}
                  onClick={() => onClearCacheHandler({mode: 'only'})}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                  </div>
                Clear Only This Page Caches
            </span>

            <span className={'logged-item'}
                  onClick={() => onClearCacheHandler({mode: 'widgets'})}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                  </div>
                Clear Widgets Caches
            </span>

            <span className={'logged-item'}
                  onClick={() => onClearCacheHandler({mode: 'settings'})}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                  </div>
                Clear Settings Caches
            </span>

            <span className={'logged-item'}
                  onClick={() => onClearCacheHandler({mode: 'all'})}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                  </div>
                Clear Entire Website Caches
            </span>

            <span className={'logged-item'} onClick={() => onSetAdminModeHandler()}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={adminMode ? faCheck : faShield} style={{width: 25, height: 25}}/>
                  </div>
                Admin Mode
            </span>
            {pathname.includes('/chatroom/') &&
                <button className={'logged-item'} onClick={() => socket.emit('correctChatroomsMessages')}>
                    <div className={'icon-wrapper'}>
                        <FontAwesomeIcon icon={faBolt} style={{width: 25, height: 25}}/>
                    </div>
                    Correct Chatrooms Messages
                </button>

            }
        </>
    )
};
export default AuthenticationAdminItems;