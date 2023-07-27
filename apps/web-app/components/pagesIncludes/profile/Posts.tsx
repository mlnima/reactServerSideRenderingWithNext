import {FC, useEffect, useMemo} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {postFieldRequestForCards} from "data-structures";
import {useDispatch} from "react-redux";
import {setPostsData} from "@store_toolkit/clientReducers/postsReducers/postsReducer";
import PostsPage from "@components/includes/PostsPage/PostsPage";
import {clientAPIRequestGetPost} from "api-requests";

const Style = styled.div`
  width: 100%;
`;

interface PropTypes {
    userId: string
}

const Posts: FC<PropTypes> = ({userId}) => {
    const router = useRouter();
    const dispatch = useDispatch()

    const requestQueries = useMemo(() => {
        return {
            size: parseInt(router.query.size as string) || 30,
            page: parseInt(router.query.page as string) || 1,
            fields: postFieldRequestForCards,
            author: userId,
            status: 'all'
        }
    }, [router.query,userId])


    useEffect(() => {
        if (userId){
        //@ts-ignore
            clientAPIRequestGetPost(requestQueries).then(response => {
                dispatch(setPostsData(
                    {
                        posts: response.data?.posts || [],
                        totalCount: response.data?.totalCount || 0
                    }
                ))
            }).catch(error => {
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