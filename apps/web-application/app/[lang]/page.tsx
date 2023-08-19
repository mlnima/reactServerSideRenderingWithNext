import {fetchSettings, fetchWidgets} from "fetch-requests";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"
import {getDictionary} from "../../get-dictionary";
import './page.styles.scss';
import {i18n} from '../../i18n-config'

interface IProps {
    params: {
        lang: string
    }
}

const Page = async ({params: {lang}}:IProps) => {

    const locale = i18n.locales.includes(lang)  ?  lang :  process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings(['homePageSettings']);
    const widgetsData = await fetchWidgets(['homePageLeftSidebar', 'homePageRightSidebar', 'home'], lang);
    const sidebar = settingsData?.settings?.homePageSettings?.sidebar;

    return (
        <main id={'content'} className={`page-${sidebar || 'no'}-sidebar inner-content`}>
            <MainWidgetArea dictionary={dictionary}
                            widgets={widgetsData?.widgets?.home}
                            locale={lang} 
                            position={'home'}/>
        </main>
    )
}

export default Page;