import React from 'react';
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import StyleSection from '../../../../components/adminIncludes/design/StyleSection/StyleSection'

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

export default postPage;
