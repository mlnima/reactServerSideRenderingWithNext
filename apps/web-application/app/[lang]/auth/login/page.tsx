'use client';
import {useEffect} from "react";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import { useRouter } from 'next/navigation'

interface IProps {
    params: {
        lang: string
    }
}

// export const generateMetadata = async ()=>({
//     title: 'Login',
// })

const loginPage =  ({params: {lang}}:IProps) => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector((store) => store?.user?.loggedIn)
    const router = useRouter()

    useEffect(() => {

        if (loggedIn){
            router.push('/')
        }else {
            dispatch(loginRegisterForm('login'))
        }

    }, [loggedIn]);

    return <main id={'content'} className={`page-no-sidebar inner-content`}>
    </main>

}

export default loginPage;