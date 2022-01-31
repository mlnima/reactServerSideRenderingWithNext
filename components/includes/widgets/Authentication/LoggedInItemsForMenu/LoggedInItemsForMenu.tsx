import {FC} from 'react';
import Link from "next/link";
import {useTranslation} from 'next-i18next';
import {useDispatch, useSelector} from "react-redux";
import {userLogOut} from "../../../../../store/actions/userActions";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";
import {StoreTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";

const LoggedInItemsForMenu: FC = () => {
    const {t} = useTranslation('common');
    const identity = useSelector((store: StoreTypes) => store?.settings?.identity)
    const dispatch = useDispatch()

    return (
        <>
            {identity.membership ?
                <>
                    <Link href={`/profile`}>
                        <a rel='next' className='logged-item btn btn-transparent-light'>
                            <span className={'my-profile icon'}/>
                            {t(`Profile`)}
                        </a>
                    </Link>
                    {identity.allowUserToPost ?
                        <Link href={`/profile/posts/newpost`}>
                            <a rel='next' className='logged-item btn btn-transparent-light add-new-Post'>
                                <span className={'add-new-Post icon'}/>
                                {t(`Create New Post`)}
                            </a>
                        </Link>
                        : null
                    }

                    <Link href={`/messenger`}>
                        <a rel='next' className='logged-item btn btn-transparent-light'>
                            <span className={'messages icon'}/>
                            {t(`Messages`)}
                        </a>
                    </Link>
                </>
                : null
            }
            <span className='logged-item btn btn-transparent-light' onClick={() => {
                dispatch(userLogOut())
                dispatch(setLoginRegisterFormStatus(false))
            }}>
                <span className={'sign-out icon'}/>
                {t(`Logout`)}
            </span>
        </>
    )

};
export default LoggedInItemsForMenu;
