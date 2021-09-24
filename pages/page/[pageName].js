import {getFirstLoadData, getPageData} from "../../_variables/ajaxVariables";
import Error from "../_error";
import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const page = ({responseCode,pageInfo,widgets,design,identity}) => {

    return (
        responseCode !==200 ? <Error responseCode={responseCode} />:
                < MainWidgetArea
                    position={pageInfo.pageName}
                    rendering={true}
                    widgets={(widgets || []).filter(widget => widget.data?.position === pageInfo.pageName)}
                    className='page main'
                    stylesData={pageInfo.pageStyle || ''}
                    currentPageSidebar={identity?.homePageSidebar }
                    postElementSize={design?.postElementSize }
                    postElementStyle={design?.postElementStyle }
                    postElementImageLoader={design?.postElementImageLoader}
                    postElementImageLoaderType={design?.postElementImageLoaderType}
                />
    )
};

export const getServerSideProps = async (context) => {
    if (!context.query.pageName)   return {notFound: true}
    const firstLoadData = await getFirstLoadData(context.req,[context.query.pageName, context.query.pageName + 'LeftSidebar',context.query.pageName + 'RightSidebar'],context.query.pageName)
    let responseCode = 200
    const pageData = await getPageData({pageName: context.query.pageName})
    if (!pageData.data.pageData)return { notFound: true}

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData,
            pageInfo:pageData.data ? pageData.data.pageData : {},
            query:context.query,
            responseCode
        }}
}

export default page;

