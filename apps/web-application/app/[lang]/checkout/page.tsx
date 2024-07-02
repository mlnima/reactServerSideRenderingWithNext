import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../../get-dictionary";
import './page.styles.scss';
import {i18n} from '@i18nConfig'
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";

interface IProps {
    params: {
        lang: string
    }
}

const checkoutPage = async ({params: {lang}}:IProps) => {

    const locale = i18n.locales.includes(lang)  ?  lang :  process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['checkoutPagePageSettings']});

    const widgetsData = await fetchWidgets({
        widgets: [
            'checkoutPageLeftSidebar',
            'checkoutPageRightSidebar',
            'checkoutPage'
        ],
        locale
    });
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