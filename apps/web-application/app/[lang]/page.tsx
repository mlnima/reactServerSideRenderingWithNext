import {fetchSettings, fetchWidgets} from "fetch-requests";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../get-dictionary";
import './page.styles.scss';
import {i18n} from '../../i18n-config'
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";

interface IProps {
    params: {
        lang: string
    }
}

const homePage = async ({params: {lang}}:IProps) => {

    const locale = i18n.locales.includes(lang)  ?  lang :  process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings(['homePageSettings']);
    const widgetsData = await fetchWidgets(['homePageLeftSidebar', 'homePageRightSidebar', 'home'], lang);
    const sidebar = settingsData?.settings?.homePageSettings?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar inner-content`}>

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