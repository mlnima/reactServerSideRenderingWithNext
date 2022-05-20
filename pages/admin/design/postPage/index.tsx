import {wrapper} from "@store_toolkit/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import StyleSection from '@components/adminIncludes/design/StyleSection/StyleSection'
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const postPage = () => {
    return (
        <StyleSection name='postPageStyle' title='Post Page Design :'/>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

postPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default postPage;
