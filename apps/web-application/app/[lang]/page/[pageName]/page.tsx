
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea";
import {getDictionary} from "../../../../get-dictionary";
import pageMetaGenerator from "./components/pageMetaGenerator/pageMetaGenerator";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";
import {getPage} from "@lib/database/operations/pages";
import {getWidgets} from "@lib/database/operations/widgets";



const page = async (props: IPageProps) => {
    const params = await props.params;
    const {lang ,pageName } = params
    const locale = localDetector(lang);
    const dictionary = await getDictionary(locale);
    const pageData = pageName ?  await getPage({pageName}) : {};

    const widgets = pageName ? await getWidgets([
            `${pageName}LeftSidebar`,
            `${pageName}RightSidebar`,
            pageName
        ],
        locale
    ): {};

    const sidebar = pageData?.pageData?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main page'}>
                <MainWidgetArea dictionary={dictionary}
                                widgets={pageName ? widgets?.[pageName] : []}
                                locale={locale}
                                position={'home'}/>
            </main>
            <SidebarWidgetAreaRenderer leftSideWidgets={widgets?.[`${pageName}LeftSidebar`]}
                                       rightSideWidgets={widgets?.[`${pageName}RightSidebar`]}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default page;

export const generateMetadata = pageMetaGenerator;
