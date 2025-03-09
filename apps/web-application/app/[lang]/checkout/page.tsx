import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../../get-dictionary";
import './page.scss';
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import getSettings from '@lib/actions/database/operations/settings/getSettings';


const checkoutPage = async (props: IPageProps) => {
    const params = await props.params;

    const {
        lang
    } = params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const { checkoutPageSettings } = await getSettings(['checkoutPageSettings']);

    const widgets = await getWidgets([
            'checkoutPageLeftSidebar',
            'checkoutPageRightSidebar',
            'checkoutPage'
        ],
        locale
    );

    const sidebar = checkoutPageSettings?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main checkoutPage'}>
                <MainWidgetArea dictionary={dictionary}
                                widgets={widgets?.checkoutPage}
                                locale={locale}
                                position={'checkoutPage'}/>

            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgets?.['checkoutPageLeftSidebar']}
                                       rightSideWidgets={widgets?.['checkoutPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default checkoutPage;

