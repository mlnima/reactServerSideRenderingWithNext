import React, {useEffect, useState, useRef, useMemo} from 'react';
import TitleDescription from "./TitleDescription/TitleDescription";
import ActionOnPost from "./ActionOnPost/ActionOnPost";
import DropDownWidget from "./DropDownWidget/DropDownWidget";
import Format from "./Format/Format";
import Meta from "./Meta/Meta";
import {Link, useSearchParams} from 'react-router-dom'
import RatingOption from './RatingOption/RatingOption'
import PostInformation from "./PostInformation/PostInformation";
import languagesOptions from "@variables/languagesOptions";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {editPostAction} from "@store/reducers/postsReducer";
import {getPostAction,defineNewPost,changeActiveEditingLanguage} from "@store/reducers/postsReducer";
import {DashboardStore, Store} from "typescript-types";
import {useAppDispatch} from "@store/hooks";

const AdminPostPageStyledDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 10px;
  }
`

const Index = () => {
    const post = useSelector(({posts}:DashboardStore) => posts.post);
    const activeEditingLanguage = useSelector(({posts}:DashboardStore) => posts.activeEditingLanguage);
    const dispatch = useAppDispatch()
    const [search, setSearch] = useSearchParams();
    const postId = useMemo(()=>search.get('id'),[search])
    const languageElement = useRef(null)

    useEffect(() => {
        if (postId) {
            dispatch(getPostAction(postId))
        } else {
            dispatch(defineNewPost(null))
        }
    }, [postId]);

    const onChangeHandler = (e: { target: { name: any; value: any; }; }) => {
        dispatch(editPostAction({[e.target.name]: e.target.value}))
    };

    const onTranslatedInputChangeHandler = (e: { target: any; }) => {
        if (activeEditingLanguage === 'default') {
            dispatch(editPostAction({
                [e.target.name]: e.target.value
            }))
        } else {
            dispatch(editPostAction({
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
            <Link to={'/admin/post?new=1'} className={'btn btn-info'}>
                New Post
            </Link>
            <AdminPostPageStyledDiv className={'admin-post'}>
                <div className={'content'}>
                    <select className={'custom-select'} ref={languageElement}
                            onChange={e => dispatch(changeActiveEditingLanguage(e.target.value as string))}>
                        <option value={'default'}>{process.env.REACT_APP_DEFAULT_LOCAL || 'Default'}</option>
                        {languagesOptions}
                    </select>

                    <TitleDescription onChangeHandler={onTranslatedInputChangeHandler}
                                      onDescriptionChangeHandler={onDescriptionChangeHandler}
                                      onTranslatedInputChangeHandler={onTranslatedInputChangeHandler}
                    />

                    <PostInformation onChangeHandler={onChangeHandler}/>

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

