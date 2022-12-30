import {FC, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {
    createSearchParams,
    useLocation,
    useNavigationType,
    useParams,
    useResolvedPath,
    useSearchParams
} from 'react-router-dom'
import {useAppDispatch} from "@store/hooks";
import paramsQueryGenerator from "@variables/paramsQueryGenerator";
import {getMetasAction, getPostsAction} from "@store/reducers/postsReducer";
import {getUsersAction} from "@store/reducers/usersReducer";
import {getCommentsAction} from "@store/reducers/commentsReducer";
import {getFormsAction} from "@store/reducers/formsReducer";
import {getPagesAction} from "@store/reducers/pagesReducer";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import TableControls from "@components/pages/Assets/TableControls/TableControls";
import paramsObjectGenerator from "@variables/paramsObjectGenerator";
import TableHeader from "@components/pages/Assets/TableHeader/TableHeader";
import TableBody from "@components/pages/Assets/TableBody/TableBody";

const Style = styled.div``;

interface PropTypes {
}

const Assets: FC<PropTypes> = ({}) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [search, setSearch] = useSearchParams();
    const dispatch = useAppDispatch()
    const location = useLocation();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search]);

    const assetPageData = useSelector(({posts, users, comments, forms, pages}: DashboardStore) => {
        return {
            posts: posts.posts,
            metas: posts.metas,
            users: users.users,
            comments: comments.comments,
            forms: forms.forms,
            pages: pages.pages
        }
    })

    const getData = () => {
        const paramsQueries = paramsQueryGenerator(search)
        if (query.assetsType === 'posts') {
            dispatch(getPostsAction(paramsQueries))
        } else if (query.assetsType === 'users') {
            dispatch(getUsersAction({}))
        } else if (query.assetsType === 'metas') {
            // const queries = _adminMetaPageQueryGenerator(query, query?.metaType)
            dispatch(getMetasAction(paramsQueries))
        } else if (query.assetsType === 'comments') {
            dispatch(getCommentsAction(paramsQueries))
        } else if (query.assetsType === 'forms') {
            dispatch(getFormsAction(paramsQueries))
        } else if (query.assetsType === 'pages') {
            dispatch(getPagesAction(paramsQueries))
        }
        // else if (assetType === 'orders') {
        //     // dispatch(adminGetOrders(dataConfig))
        // }
    }

    useEffect(() => {
        getData()
    }, [query]);

    // useEffect(() => {
    //     console.log(query)
    // }, [query]);

    return (
        <Style>
            <TableControls selectedItems={selectedItems} setSelectedItems={setSelectedItems}
                           assetPageData={assetPageData}/>
            <TableHeader selectedItems={selectedItems} setSelectedItems={setSelectedItems} assetPageData={assetPageData}/>
            <TableBody assetPageData={assetPageData} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>

        </Style>
    )
};
export default Assets;


// //@ts-ignore
//  const posts = useSelector(({posts}: DashboardStore) => posts.posts)
//  //@ts-ignore
//  const metas = useSelector(({posts}: DashboardStore) => posts.metas)
//  //@ts-ignore
//  const users = useSelector(({users}: DashboardStore) => users.users)
//  //@ts-ignore
//  const comments = useSelector(({comments}: DashboardStore) => comments.comments)
//  //@ts-ignore
//  const forms = useSelector(({forms}: DashboardStore) => forms.forms)
//  //@ts-ignore
//  const pages = useSelector(({pages}: DashboardStore) => pages.pages)
//  //@ts-ignore
//  const orders = useSelector(({orders}: DashboardStore) => orders.orders)