import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";

const HomePageStyle = styled.div`
  display: grid;
  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`

const HomePage = () => {

    const {sidebar, customStyles} = useSelector(({settings}: Store) => settings?.currentPageSettings)

    return (
        <HomePageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`} customStyles={customStyles}>
            <HeadSetter/>
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
            page: 'homePage'
        },
        store
    )
    return null
});

export default HomePage;

