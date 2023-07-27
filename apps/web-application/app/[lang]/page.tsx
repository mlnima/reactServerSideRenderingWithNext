import {FC} from "react"
import {fetchSettings, fetchWidgets} from "fetch-requests";
import MainWidgetArea from "@components/widgets/widgetAreas/MainWidgetArea"

interface IProps {
    params: {
        lang: string
    }
}

//@ts-ignore
const Page: FC<IProps> = async ({params: {lang}, ...props}) => {
    console.log(' Home Page=> ', lang)
    console.log(' Home props=> ', props)
    // const initialSettingsData = await fetchSettings(['initialSettings'])
    const settingsData = await fetchSettings(['homePageSettings'])
    const widgetsData = await fetchWidgets(['homePageLeftSidebar', 'homePageRightSidebar', 'home'], lang)

    return (
        <main className={'app'}>
            <MainWidgetArea widgets={widgetsData?.widgets?.home} locale={lang} position={'home'}/>
        </main>
    )
}


export default Page;