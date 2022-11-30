import {FC, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {postFieldRequestForCards} from "data-structures";
import _clientGetPostsQueryGenerator from "@_variables/_clientVariables/clientVariables/_clientGetPostsQueryGenerator";
import Axios from "@_variables/Axios";
import {useDispatch} from "react-redux";
import {setPostsData} from "@store_toolkit/clientReducers/postsReducer";
import PostsPage from "@components/includes/PostsPage/PostsPage";

const PostsCardsRenderer = dynamic(() => import('@components/includes/cards/CardsRenderer/PostsCardsRenderer'));
const SvgRenderer = dynamic(() => import('@components/global/commonComponents/SvgRenderer/SvgRenderer'));

const Style = styled.div`
  width: 100%;
`;

interface PropTypes {
    userId: string
}

const Posts: FC<PropTypes> = ({userId}) => {
    const router = useRouter();
    const dispatch = useDispatch()

    // const [postsData, setPostsData] = useState({
    //     posts: [],
    //     totalCount: 0
    // })

    // const [requestQueries, setRequestQueries] = useState({
    //     size: parseInt(router.query.size as string) || 30,
    //     pageNo: parseInt(router.query.page as string) || 1,
    //     // postType: router.query.type || 'all',
    //     fields: postFieldRequestForCards,
    //     // keyword: router.query.keyword || '',
    //     author: userId,
    //     status: 'all'
    // })


    const requestQueries = useMemo(() => {
        return {
            size: parseInt(router.query.size as string) || 30,
            page: parseInt(router.query.page as string) || 1,
            // postType: router.query.type || 'all',
            fields: postFieldRequestForCards,
            // keyword: router.query.keyword || '',
            author: userId,
            status: 'all'
        }
    }, [router.query,userId])


    useEffect(() => {
        if (userId){
            //@ts-ignore
            const gettingPostsQueries = _clientGetPostsQueryGenerator(requestQueries, null)
            Axios.get(`/api/v1/posts/clientGetPosts${gettingPostsQueries}`).then(response => {
                dispatch(setPostsData(
                    {
                        posts: response.data?.posts || [],
                        totalCount: response.data?.totalCount || 0
                    }
                ))
            }).catch(error => {
                console.log(error)
            })
        }

    }, [requestQueries,userId]);

    return (
        <Style>
            <PostsPage renderPagination={true}/>
        </Style>
    )
};

export default Posts