import Link from "next/link";
import clearCaches from "api-requests/src/dashboard/clearCaches";
import {useRouter} from "next/router";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {setAdminMode} from "@store_toolkit/clientReducers/globalStateReducer";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const AuthenticationAdminItems = ({}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const adminMode = useSelector(({globalState}:Store)=>globalState.adminMode)
    return (
        <>
            <Link href={'/dashboard'} target={'_blank'} className={'logged-item'}>
                <div className={'icon-wrapper'}>
                    <SvgRenderer svgUrl={'/asset/images/icons/user-shield-solid.svg'}
                                 size={25}
                                 customClassName={'admin-tools-item-logo'}/>
                </div>

                Dashboard
            </Link>
            <span className={'logged-item'} onClick={() => clearCaches().then(() => router.reload())}>
                   <div className={'icon-wrapper'}>
                               <SvgRenderer svgUrl={'/asset/images/icons/eraser-solid.svg'}
                                            size={25}
                                            customClassName={'admin-tools-item-logo'}/>
                  </div>

                Clear Cache
            </span>
            <span className={'logged-item'} onClick={() => dispatch(setAdminMode(!adminMode))}>
                   <div className={'icon-wrapper'}>
                               <SvgRenderer svgUrl={adminMode ?'/asset/images/icons/check-solid.svg' :'/asset/images/icons/shield-solid.svg'}
                                            size={25}
                                            customClassName={'admin-tools-item-logo'}/>
                  </div>

                Admin Mode
            </span>
        </>
    )
};
export default AuthenticationAdminItems;