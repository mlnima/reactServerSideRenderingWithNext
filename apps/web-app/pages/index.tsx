import {wrapper} from "@store_toolkit/store";
import styled from "styled-components";
import _getServerSideStaticPageData from "../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import MainWidgetArea from "@components/RootLayout/widgetsArea/MainWidgetArea";
import {useAppSelector} from "@store_toolkit/hooks";

interface IStyles{
    customStyles?: string
}

const Styles = styled.div<IStyles>`
  display: grid;
  ${({customStyles}) => customStyles || ''}
`


const HomePage = () => {
    const {sidebar, customStyles} = useAppSelector(({settings} ) => settings?.currentPageSettings)

    return (
        <Styles id={'content'} className={`page-${sidebar || 'no'}-sidebar`} customStyles={customStyles}>
            <HeadSetter/>
            <MainWidgetArea className='home-page' position='home'/>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'homePage'}/>
        </Styles>

    );
};


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
    return {
        props: {}
    }
});

export default HomePage;

