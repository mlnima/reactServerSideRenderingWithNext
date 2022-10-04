import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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
        <HomePageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`} stylesData={homePageStyle}>
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

    return null

});




// export async function getStaticPaths() {
//     const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')
//     let paths = [];
//
//     locales.forEach(locale=>{
//         paths = [...paths,{locale}]
//     })
//
//     return {paths, fallback: false};
// }





// export const getStaticProps = wrapper.getStaticProps(store => async (context) => {
//
//     await _getServerSideStaticPageData(
//         context,
//         ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
//         {
//             setHeadData: true,
//             page: 'home'
//         },
//         store
//     )
//
//     return null
//
// });

// HomePage.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <AppLayout>
//             {page}
//         </AppLayout>
//     )
// }

export default HomePage;

