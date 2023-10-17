import {fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {i18n} from "@i18nConfig";
import {getDictionary} from "../../../../get-dictionary";
import React from "react";
import './page.styles.scss';
import UserPageContent from "./components/UserPageContent/UserPageContent";

interface IProps {
    params: {
        lang: string
        username: string,
    },
    searchParams?: {
        [key: string]: string | string[] | undefined

    },
    page: string | string[]
}

// export const generateMetadata = actorMetaGenerator;

const userPage = async ({params, searchParams}: IProps) => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['userPageSettings']});

    const sidebar = settingsData?.settings?.userPageSettings?.sidebar;

    const widgetsData = await fetchWidgets({
            widgets: [
                'userPageTop',
                'userPageLeftSidebar',
                'userPageBottom',
                'userPageRightSidebar'
            ],
            locale
        });


    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main userPage'}>
                <UserPageContent dictionary={dictionary}
                                 username={params?.username}
                                 locale={locale}/>
            </main>
            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['userPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['userPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'userPage'}/>
        </div>
    )
}

export default userPage;

export const dynamic = 'force-dynamic';