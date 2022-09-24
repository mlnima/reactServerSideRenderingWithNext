// import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import Soft404 from "@components/includes/Soft404/Soft404";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import {useRouter} from "next/router";
import {useEffect} from "react";

const Custom404 = () => {
    const router = useRouter()
    useEffect(() => {
        console.log(router)
    }, []);
    return <Soft404/>
};

// export const getStaticProps = wrapper.getServerSideProps(store =>
//     async (context) => {
//         return {
//             props: {
//                 ...(await serverSideTranslations(context.locale as string, ['common'])),
//             }
//         }
//     }
// )

Custom404.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}


export default Custom404;



