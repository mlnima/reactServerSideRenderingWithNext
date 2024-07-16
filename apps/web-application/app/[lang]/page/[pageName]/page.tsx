import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea";
import {i18n} from "@i18nConfig";
import {getDictionary} from "../../../../get-dictionary";
import {fetchPage} from "@lib/fetch-requests/fetchPage";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import pageMetaGenerator from "./components/pageMetaGenerator/pageMetaGenerator";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";

interface IProps {
    params: {
        lang: string
        pageName: string,
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}


const page = async ({params}: IProps) => {
    const pageName = params?.pageName
    const locale = i18n.locales.includes(params.lang) ? params.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const pageData = await fetchPage({pageName});

    const widgetsData = await fetchWidgets({
        widgets: [
            `${pageName}LeftSidebar`,
            `${pageName}RightSidebar`,
            pageName
        ],
        locale
    });

    const sidebar = pageData?.pageData?.sidebar;

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main page'}>
                <MainWidgetArea dictionary={dictionary}
                                widgets={widgetsData?.widgets?.[pageName]}
                                locale={locale}
                                position={'home'}/>
            </main>
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

export const generateMetadata = pageMetaGenerator;
export const dynamic = 'force-dynamic';