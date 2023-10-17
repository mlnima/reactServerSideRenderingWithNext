import {fetchSettings, fetchWidgets} from "fetch-requests";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../get-dictionary";
import './page.styles.scss';
import {i18n} from '@i18nConfig'
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";

interface IProps {
    params: {
        lang: string
    },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const homePage = async ({params: {lang},searchParams}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['homePageSettings']});

    const widgetsData = await fetchWidgets({
        widgets: [
            'homePageLeftSidebar',
            'homePageRightSidebar',
            'home'
        ],
        locale
    });

    const sidebar = settingsData?.settings?.homePageSettings?.sidebar;



    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main homePage'}>
                <MainWidgetArea dictionary={dictionary}
                                widgets={widgetsData?.widgets?.home}
                                locale={locale}
                                position={'home'}/>
            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['homePageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['homePageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default homePage;
