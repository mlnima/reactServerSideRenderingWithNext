import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
// import getCurrentPageData from "@_variables/_clientVariables/getCurrentPageData";

const HomePageStyle = styled.div`
  display: grid;
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const HomePage = () => {

    const {sidebar, homePageStyle} = useSelector(({settings}: Store) => {
        return {
            homePageStyle: settings?.design?.homePageStyle,
            sidebar: settings?.identity?.homePageSidebar,
        }
    })

    return (
        <HomePageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}
                       //@ts-ignore
                       stylesData={homePageStyle}>
            <MainWidgetArea className='home-page' position='home'/>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'homePage'}/>
        </HomePageStyle>

    );
};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    await _getServerSideStaticPageData(
        context,
        ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
        {
            setHeadData: true,
            page: 'home'
        },
        store
    )

    // const pageData = await getCurrentPageData({
    //     dynamicWidgets: ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
    //     locale: context.locale,
    //     requireSettings: ['identity', 'design', 'membershipSettings']
    // })
    //
    // return {
    //     props: {
    //         pageData
    //     }
    // }

    return null
});

export default HomePage;

