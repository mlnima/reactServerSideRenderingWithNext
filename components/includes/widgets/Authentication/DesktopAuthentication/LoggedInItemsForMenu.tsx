import React, {FC} from 'react';
import Link from "next/link";
import {useTranslation} from 'next-i18next';
import {useDispatch, useSelector} from "react-redux";
import {userLogOut} from "@store/clientActions/userActions";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const LoggedInItemsForMenu: FC = () => {
    const {t} = useTranslation('common');
    const identity = useSelector((store: StoreTypes) => store?.settings?.identity)
    const dispatch = useDispatch()

    return (
        <>
            {identity.membership ?
                <>
                    <Link href={`/messenger`}>
                        <a className={'logged-item logged-in btn btn-transparent-light'}>
                            <span className={'messages icon'}/>
                            <p className={'text-data'}>{t(`Messages`)}</p>
                        </a>
                    </Link>


                    {identity.allowUserToPost ?
                        <Link href={`/profile/posts/newPost?postType=article`}>
                            <a className={'logged-item logged-in btn btn-transparent-light add-new-Post'}>
                                <span className={'add-new-Post icon'}/>
                                <p className={'text-data'}>{t(`Create New Post`)}</p>
                            </a>
                        </Link>
                        : null
                    }

                    <Link href={`/profile`}>
                        <a className={'logged-item btn logged-in btn-transparent-light'} >
                            <span className={'my-profile icon'}/>
                            <p className={'text-data'}>{t(`Profile`)}</p>
                        </a>
                    </Link>


                </>
                : null
            }
            <span className='logged-item logged-in btn btn-transparent-light' onClick={() => {
                dispatch(userLogOut())
                dispatch(setLoginRegisterFormStatus(false))
            }}>
                <span className={'sign-out-button icon'}/>
                 <p className={'text-data'}>{t(`Logout`)}</p>
            </span>
        </>
    )

};
export default LoggedInItemsForMenu;
