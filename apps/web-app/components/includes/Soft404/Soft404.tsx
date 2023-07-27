import React, {useEffect, useMemo} from "react";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import Head from 'next/head'
import PostsPage from "../PostsPage/PostsPage";
import {useRouter} from "next/router";
import getPostsAction from "@store_toolkit/clientReducers/postsReducers/getPostsAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";

const Soft404StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-background-color,#000);

  h1 {
    color: var(--primary-text-color,#fff);
  }

  .back-to-homepage {
    color: var(--primary-active-color, #f90);
    text-decoration: none;
  }
`


const Soft404 = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {locale} = useRouter()

    useEffect(() => {
        dispatch(getPostsAction({
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
                {/*<HeadSetter title={title} description={description}/>*/}
                <title>{title}</title>
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
