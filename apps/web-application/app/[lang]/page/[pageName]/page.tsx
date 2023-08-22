import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea";
import {i18n} from "../../../../i18n-config";
import {getDictionary} from "../../../../get-dictionary";
import {fetchPage, fetchWidgets} from "fetch-requests";
import pageMetaGenerator from "./components/pageMetaGenerator/pageMetaGenerator";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";

interface IProps {
    params: {
        lang: string
        pageName: string,
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}


export const generateMetadata = pageMetaGenerator

const page = async ({params}: IProps) => {
    const pageName =  params?.pageName
    const locale = i18n.locales.includes(params.lang)  ?  params.lang :  process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    const pageData = await fetchPage({pageName});
    const widgetsData = await fetchWidgets([`${pageName}LeftSidebar`, `${pageName}RightSidebar`, pageName], locale);
    const sidebar = pageData?.pageData?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar inner-content`}>
            <MainWidgetArea dictionary={dictionary}
                            widgets={widgetsData?.widgets?.[pageName]}
                            locale={locale}
                            position={'home'}/>
            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.[`${pageName}LeftSidebar`]}
                                       rightSideWidgets={widgetsData.widgets?.[`${pageName}RightSidebar`]}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default page;
