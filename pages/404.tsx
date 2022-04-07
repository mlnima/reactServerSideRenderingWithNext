import React, {FC} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import Soft404 from "@components/includes/Soft404/Soft404";

const Custom404: FC = () => {
    return <Soft404/>
};

export const getStaticProps = wrapper.getServerSideProps(store =>
    async (context) => {
        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common'])),
            }
        }
    }
)

export default Custom404;



