import {getFirstLoadData, getPageData} from "../../_variables/ajaxVariables";
import Error from "../_error";
import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {useSelector} from "react-redux";
import {settingsPropTypes, WidgetsStateInterface} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "../../store/store";

const page = ({pageInfo}:ClientPagesTypes) => {
    const settings = useSelector((state: settingsPropTypes) => state.settings);
    return (
        < MainWidgetArea
            position={pageInfo.pageName}
            rendering={true}
            className='page main'
            stylesData={pageInfo.pageStyle || ''}
            currentPageSidebar={settings.identity?.homePageSidebar}
        />
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    if (!context.query.pageName)   return {notFound: true}
    const firstLoadData = await getFirstLoadData(context.req,[context.query.pageName, context.query.pageName + 'LeftSidebar',context.query.pageName + 'RightSidebar'],store)
    let responseCode = 200
    const pageData = await getPageData({pageName: context.query.pageName})
    if (!pageData.data.pageData)return { notFound: true}

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData,
            pageInfo:pageData.data ? pageData.data.pageData : {},
            query:context.query,
            responseCode
        }
    }
})

export default page;

