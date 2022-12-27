import {FC, useEffect} from "react";
import styled from "styled-components";
import {useSearchParams} from 'react-router-dom'
import {useAppDispatch} from "@store/hooks";
import _adminGetPostsQueryGenerator from "@variables/getPostQueryGenerator";
import {fetchAdminPanelMetas, fetchAdminPanelPosts} from "@store/reducers/postsReducer";

// import {fetchAdminPanelUsers} from "@store/reducers/usersReducer";
// import _adminMetaPageQueryGenerator from "web-app/_variables/adminVariables/_adminMetaPageQueryGenerator";
// import {fetchAdminPanelGetComments} from "@store/reducers/commentsReducer";
// import {fetchAdminForms} from "@store/reducers/formsReducer";
// import {fetchAdminPanelPages} from "@store/reducers/pagesReducer";

const Style = styled.div``;

interface PropTypes {

}

const Assets: FC<PropTypes> = ({}) => {
    const [search, setSearch] = useSearchParams();
    const dispatch = useAppDispatch()
    console.log(process.env)
    const getData = () => {
        const assetType = search.get('assetsType')
        if (assetType === 'posts') {
            const gettingPostsQueries = _adminGetPostsQueryGenerator(search)
            dispatch(fetchAdminPanelPosts(gettingPostsQueries))
        }
        // else if (assetType === 'users') {
        //     dispatch(fetchAdminPanelUsers({}))
        // } else if (assetType === 'metas') {
        //     const queries = _adminMetaPageQueryGenerator(query, query?.metaType)
        //     dispatch(fetchAdminPanelMetas(queries))
        // } else if (assetType === 'comments') {
        //     dispatch(fetchAdminPanelGetComments(dataConfig))
        // } else if (assetType === 'forms') {
        //     dispatch(fetchAdminForms(dataConfig))
        // } else if (assetType === 'pages') {
        //     dispatch(fetchAdminPanelPages(dataConfig))
        // } else if (assetType === 'orders') {
        //     // dispatch(adminGetOrders(dataConfig))
        // }
    }

    useEffect(() => {
        getData()
    }, [search]);


    return (
        <Style>

        </Style>
    )
};
export default Assets;