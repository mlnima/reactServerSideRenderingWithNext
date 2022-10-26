import React, {useEffect, useMemo} from "react";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import Head from 'next/head'
import fetchPosts
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import PostsPage from "@components/includes/PostsPage/PostsPage";
import {useRouter} from "next/router";


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
    const {locale, pathname} = useRouter()

    useEffect(() => {
        console.log(pathname)
    }, [pathname]);

    useEffect(() => {
        dispatch(fetchPosts({
            context: {
                query: {}
            },
            metaId: null,
            options: {
                page: '404',
                setHeadData: false
            }
        }))
    }, []);


    const title = useMemo(() => t(`common:Nothing found`, {}, {fallback: 'Nothing found'}), [locale])
    const description = useMemo(() => {
        return t(`common:Nothing found Description`,
            {},
            {fallback: 'It seems we can’t find what you’re looking for. Perhaps searching can help'})
    }, [locale])


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Head>

            <Soft404StyledDiv>
                <h1>{title}</h1>
                <p>{description}</p>
                <Link href="/" className='back-to-homepage'>
                        <h2>{t(`common:Go To Homepage`, {}, {fallback: 'Go To Homepage'})}</h2>
                </Link>

            </Soft404StyledDiv>
            <PostsPage renderPagination={false}/>
        </>
    )
};

export default Soft404
