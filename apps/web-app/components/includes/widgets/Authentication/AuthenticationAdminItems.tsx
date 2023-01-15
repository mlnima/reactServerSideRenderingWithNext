import Link from "next/link";
import clearCaches from "api-requests/src/dashboard/clearCaches";
import {useRouter} from "next/router";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const AuthenticationAdminItems = ({}) => {
    const router = useRouter()
    return (
        <>
            <Link href={'/dashboard'} className={'logged-item'}>
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
        </>
    )
};
export default AuthenticationAdminItems;