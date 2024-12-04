import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { fetchWidgets } from '@lib/fetch-requests/fetchWidgets';
import MainWidgetArea from '@components/widgets/widgetAreas/MainWidgetArea';
import { getDictionary } from '../../get-dictionary';
import './page.styles.scss';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

const homePage = async (props: IPageProps) => {
    const params = await props.params;
    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({ requireSettings: ['homePageSettings'] });

    const widgetsData = await fetchWidgets({
        widgets: ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
        locale,
        revalidate: 86400,
    });

    const sidebar = settingsData?.settings?.homePageSettings?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main homePage'}>
                <MainWidgetArea
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData?.widgets?.home}
                    position={'home'}
                />
            </main>

            <SidebarWidgetAreaRenderer
                leftSideWidgets={widgetsData.widgets?.['homePageLeftSidebar']}
                rightSideWidgets={widgetsData.widgets?.['homePageRightSidebar']}
                dictionary={dictionary}
                locale={locale}
                sidebar={sidebar || 'no'}
                position={'postPage'}
            />
        </div>
    );
};

export default homePage;
