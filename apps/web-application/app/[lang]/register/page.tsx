'use client';
import {useEffect} from "react";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {useRouter} from "next/navigation";

interface IProps {
    params: {
        lang: string
    }
}

// export const generateMetadata = async ()=>({
//     title: 'register',
// })

const registerPage = ({params: {lang}}: IProps) => {

    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector((store) => store?.user?.loggedIn)
    const router = useRouter()

    useEffect(() => {

        if (loggedIn) {
            router.push('/')
        } else {
            dispatch(loginRegisterForm('register'))
        }
    }, []);

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main registerPage'}>
                <h1>Register</h1>
            </main>
        </div>
    )
}

export default registerPage;

