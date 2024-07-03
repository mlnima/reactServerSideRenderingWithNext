import React, {useEffect, useRef, useMemo} from 'react';
import TitleDescription from "./TitleDescription/TitleDescription";
import ActionOnPost from "./ActionOnPost/ActionOnPost";
import DropDownWidget from "./DropDownWidget/DropDownWidget";
import Format from "./Format/Format";
import Meta from "./Meta/Meta";
import {Link, useSearchParams} from 'react-router-dom'
import RatingOption from './RatingOption/RatingOption'
import PostInformation from "./PostInformation/PostInformation";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {editPostAction} from "@store/reducers/postsReducer";
import {getPostAction,defineNewPost,changeActiveEditingLanguage} from "@store/reducers/postsReducer";
import {DashboardStore} from "typescript-types";
import {useAppDispatch} from "@store/hooks";
import {LanguagesOptions} from "@repo/ui";
import { isNumericString } from '@repo/shared-util';

const AdminPostPageStyledDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 200px;
  max-width: 100vw;
  .content {

    .language-action{
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      .language-selector{
        width: 100px;
      }
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
  }
  .side{
    width: 200px;
    padding: 8px;
    box-sizing: border-box;
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
        if (isNumericString(e.target.value)){
            dispatch(editPostAction({[e.target.name]: parseInt(e.target.value)}))
        }else {
            dispatch(editPostAction({[e.target.name]: e.target.value}))
        }
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
        <div>

            <AdminPostPageStyledDiv className={'admin-post'}>

                <div className={'content'}>
                    <div className="language-action">
                        <Link to={'/dashboard/post?new=1'} className={'btn btn-info'}>
                            New Post
                        </Link>
                        <select className={'primarySelect language-selector'} ref={languageElement}
                                onChange={e => dispatch(changeActiveEditingLanguage(e.target.value as string))}>
                            <option value={'default'}>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'Default'}</option>
                            <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''}/>
                        </select>
                    </div>


                    <TitleDescription onChangeHandler={onTranslatedInputChangeHandler}
                                      onDescriptionChangeHandler={onDescriptionChangeHandler}
                                      onTranslatedInputChangeHandler={onTranslatedInputChangeHandler}
                    />

                    <PostInformation onChangeHandler={onChangeHandler}/>

                </div>

                <aside className={'side'}>
                    <DropDownWidget  component={ActionOnPost} title={post?.status}/>
                    <DropDownWidget  component={Format} title={'Format'}/>
                    <DropDownWidget  component={Meta} type={'categories'} title={'Post Category'}/>
                    <DropDownWidget  component={Meta} type={'tags'} title={'Post Tags'}/>

                    { post?.postType === 'video' ?
                        <DropDownWidget  component={Meta} type={'actors'} title={'Post Actors'}/>
                        : null
                    }

                    <DropDownWidget  component={RatingOption} title={'Rating'}/>

                </aside>

            </AdminPostPageStyledDiv>
        </div>
    );
};

export default Index;

