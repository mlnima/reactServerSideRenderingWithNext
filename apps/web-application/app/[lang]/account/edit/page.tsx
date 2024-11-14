// import { i18n } from '@i18nConfig';
// import { getDictionary } from '../../../../get-dictionary';
import React from 'react';
import './page.styles.scss';
import {PageParams, PageSearchParams} from "@repo/typescript-types";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
    // page: string | string[];
}

const editAccountPage = async (props: IProps) => {
    // const params = await props.params;
    // const locale = i18n.locales.includes(params?.lang)
    //     ? params?.lang
    //     : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    // const dictionary = await getDictionary(locale);

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main editAccountPage'}>
                <div className={'underDevelopmentMessage'}>
                    <h1>Edit Account</h1>
                    <p>This page is under development and will be available soon</p>
                </div>
            </main>
        </div>
    );
};

export default editAccountPage;
