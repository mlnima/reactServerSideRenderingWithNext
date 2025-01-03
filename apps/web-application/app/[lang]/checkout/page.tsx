import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../../get-dictionary";
import './page.scss';
import {i18n} from '@i18nConfig'
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";


const checkoutPage = async (props: IPageProps) => {
    const params = await props.params;

    const {
        lang
    } = params;

    const locale = localDetector(params.lang);
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

