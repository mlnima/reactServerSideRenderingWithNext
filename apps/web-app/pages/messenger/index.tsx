import {wrapper} from "@store_toolkit/store";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import Pages from "@components/pagesIncludes/messenger/page/Page";

const messengerPage = () => {
    return <Pages/>
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'messengerPagePageLeftSidebar',
            'messengerPageRightSidebar',
            'messengerPage',
        ],
        {
            setHeadData: true,
            page: 'messenger'
        },
        store
    )

    return {
        props: {}
    }
})

export default messengerPage;
