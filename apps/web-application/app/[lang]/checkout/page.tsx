import {fetchSettings, fetchWidgets} from "fetch-requests";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../../get-dictionary";
import './page.styles.scss';
import {i18n} from '../../../i18n-config'
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";

interface IProps {
    params: {
        lang: string
    }
}

const checkoutPage = async ({params: {lang}}:IProps) => {

    const locale = i18n.locales.includes(lang)  ?  lang :  process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['checkoutPagePageSettings']});
    const widgetsData = await fetchWidgets(
        [
            'checkoutPageLeftSidebar',
            'checkoutPageRightSidebar',
            'checkoutPage'
        ], lang);
    const sidebar = settingsData?.settings?.checkoutPageSettings?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main checkoutPage'}>
                <MainWidgetArea dictionary={dictionary}
                                widgets={widgetsData?.widgets?.checkoutPage}
                                locale={locale}
                                position={'checkoutPage'}/>

            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['checkoutPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['checkoutPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default checkoutPage;

export const dynamic = 'force-dynamic';