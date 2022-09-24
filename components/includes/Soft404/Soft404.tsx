import React, {useEffect} from "react";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import fetchPosts
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import PostsPage from "@components/includes/PostsPage/PostsPage";

const Soft404StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--main-background-color, #000);

  h1 {
    color: var(--main-text-color, #fff);
  }

  .back-to-homepage {
    color: var(--main-active-color, #f90);
    text-decoration: none;
  }
`


const Soft404 = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts({
            context: {
                query: {}
            },
            metaId: null,
            metaType: null,
            options: {
                page: '404',
                setHeadData: false
            }
        }))
    }, []);


    return (
        <>
            <Soft404StyledDiv>
                <h1>{t(`common:Nothing found`, {}, {fallback: 'Nothing found'})}</h1>
                <p>{t(`common:It seems we can’t find what you’re looking for. Perhaps searching can help.`,
                    {},
                    {fallback: 'It seems we can’t find what you’re looking for. Perhaps searching can help.'})}</p>
                <Link href="/">
                    <a className='back-to-homepage'>
                        <h2>{t(`common:Go To Homepage`,{},{fallback:'Go To Homepage'})}</h2>
                    </a>
                </Link>

            </Soft404StyledDiv>
            <PostsPage renderPagination={false}/>
        </>
    )
};

export default Soft404
