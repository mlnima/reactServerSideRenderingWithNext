import React, {useEffect, useState, useRef} from 'react';
import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import Meta from "../../../components/adminIncludes/PostComponents/Meta/Meta";
import Link from 'next/link'
import RatingOption from '../../../components/adminIncludes/PostComponents/RatingOption/RatingOption'
import {useRouter} from "next/router";
import PostInformation from "../../../components/adminIncludes/PostComponents/PostInformation/PostInformation";
import {languagesOptions} from "@_variables/variables";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {adminEditPost} from "../../../store_toolkit/adminReducers/adminPanelPostsReducer";
import {fetchAdminPanelPost,adminDefineNewPost,adminChangeActiveEditingLanguage} from "../../../store_toolkit/adminReducers/adminPanelPostsReducer";
import {useAdminDispatch} from "../../../store_toolkit/hooks";
import {Store} from "typescript-types";

const AdminPostPageStyledDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 10px;
  }
`

const Index = () => {
    const post = useSelector((store: Store) => store.adminPanelPosts.post);
    const activeEditingLanguage = useSelector((store: Store) => store.adminPanelPosts.activeEditingLanguage);
    const dispatch = useAdminDispatch()
    const router = useRouter();
    const languageElement = useRef(null)
    const [productInfo, setProductInfo] = useState({})

    useEffect(() => {
        if (router?.query?.id) {
            dispatch(fetchAdminPanelPost(router.query.id as string))
        } else {
            dispatch(adminDefineNewPost(null))
        }
    }, [router.query.id]);

    const onChangeHandler = (e: { target: { name: any; value: any; }; }) => {
        dispatch(adminEditPost({[e.target.name]: e.target.value}))
    };

    const onTranslatedInputChangeHandler = (e: { target: any; }) => {
        if (activeEditingLanguage === 'default') {
            dispatch(adminEditPost({
                [e.target.name]: e.target.value
            }))
        } else {
            dispatch(adminEditPost({
                translations: {
                    ...(post?.translations || {}),
                    [activeEditingLanguage]: {
                        ...(post?.translations?.[activeEditingLanguage] || {}),
                        [e.target.name]: e.target.value
                    }
                }
            }))
        }
    }

    const onDescriptionChangeHandler = (data: string) => {

        const e = {
            target: {
                name: 'description',
                value: data
            }
        }
        onTranslatedInputChangeHandler(e)
    }



    return (
        <>
            <Link href={'/admin/post?new=1'} className={'btn btn-info'}>
                    New Post
            </Link>
            <AdminPostPageStyledDiv className={'admin-post'}>
                <div className={'content'}>
                    <select className={'custom-select'} ref={languageElement}
                            onChange={e => dispatch(adminChangeActiveEditingLanguage(e.target.value as string))}>
                        <option value={'default'}>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'Default'}</option>
                        {languagesOptions}
                    </select>

                    <TitleDescription onChangeHandler={onTranslatedInputChangeHandler}
                                      onDescriptionChangeHandler={onDescriptionChangeHandler}
                                      onTranslatedInputChangeHandler={onTranslatedInputChangeHandler}
                    />

                    <PostInformation productInfo={productInfo}
                                     setProductInfo={setProductInfo}
                                     onChangeHandler={onChangeHandler}/>

                </div>

                <div className={'side'}>
                    <DropDownWidget  component={ActionOnPost} title={post?.status}/>
                    <DropDownWidget  component={Format} title={'Format'}/>
                    <DropDownWidget  component={Meta} type={'categories'} title={'Post Category'}/>
                    <DropDownWidget  component={Meta} type={'tags'} title={'Post Tags'}/>

                    { post?.postType === 'video' ?
                            <DropDownWidget  component={Meta} type={'actors'} title={'Post Actors'}/>
                            : null
                    }

                    <DropDownWidget  component={RatingOption} title={'Rating'}/>

                </div>

            </AdminPostPageStyledDiv>
        </>
    );
};

export default Index;

