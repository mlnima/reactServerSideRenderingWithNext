import {useContext} from 'react';
import {getFirstLoadData, getPageData} from "../../_variables/ajaxVariables";
// import styled from "styled-components";
// import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
import Error from "../_error";
import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {AppContext} from "../../context/AppContext";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
// let StyledDiv = styled.div`${props => props.stylesData ?? ''}`

const page = ({responseCode,pageInfo,widgets,design,identity}) => {
    const contextData = useContext(AppContext);
    return (
        responseCode !==200 ? <Error responseCode={responseCode} />:
                < MainWidgetArea
                    position={pageInfo.pageName}
                    rendering={true}
                    widgets={(widgets || []).filter(widget => widget.data?.position === pageInfo.pageName)}
                    className='page main'
                    stylesData={pageInfo.pageStyle || ''}
                    currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                    postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
                />
    )
};

export const getServerSideProps = async (context) => {

    const firstLoadData = await getFirstLoadData(context.req,[context.query.pageName, context.query.pageName + 'LeftSidebar',context.query.pageName + 'RightSidebar'],context.query.pageName)
    let responseCode = 200
    const pageData = await getPageData({pageName: context.query.pageName})

    if (!pageData.data.pageData){
        return {
            notFound: true
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets:firstLoadData.widgets,
            ...firstLoadData.settings,
            pageInfo:pageData.data ? pageData.data.pageData : {},
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            responseCode
        }}
}

export default page;

