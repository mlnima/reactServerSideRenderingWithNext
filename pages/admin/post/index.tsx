import {useEffect, useState, useRef} from 'react';

import TitleDescription from "../../../components/adminIncludes/PostComponents/TitleDescription/TitleDescription";
import ActionOnPost from "../../../components/adminIncludes/PostComponents/ActionOnPost/ActionOnPost";
import DropDownWidget from "../../../components/adminIncludes/PostComponents/DropDownWidget/DropDownWidget";
import Format from "../../../components/adminIncludes/PostComponents/Format/Format";
import Meta from "../../../components/adminIncludes/PostComponents/Meta/Meta";
import Link from 'next/link'
import RatingOption from '../../../components/adminIncludes/PostComponents/RatingOption/RatingOption'
import {useRouter} from "next/router";
import PostInformation from "../../../components/adminIncludes/PostComponents/PostInformation/PostInformation";
import {languagesOptions} from "../../../_variables/_variables";
import _ from "lodash";
import styled from "styled-components";
import {setAlert, setLoading} from "../../../store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import {adminChangeActiveEditingLanguage, adminEditPost, adminGetPost, adminNewPost, adminSaveNewPost, adminUpdatePost} from "../../../store/adminActions/adminPanelPostsActions";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

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
    const userData = useSelector((store:StoreTypes) => store.user.userData);
    const post = useSelector((store:StoreTypes) => store.adminPanelPosts.post);
    const activeEditingLanguage = useSelector((store:StoreTypes) => store.adminPanelPosts.activeEditingLanguage);
    const dispatch = useDispatch()
    const router = useRouter();
    const languageElement = useRef(null)
    const [productInfo, setProductInfo] = useState({})

    useEffect(() => {
        if (router.query.id) {
            dispatch(adminGetPost(router.query.id))
        } else {
            dispatch(adminNewPost())
        }
    }, [router.query.id]);

    const onChangeHandler = (e: { target: { name: any; value: any; }; }) => {
        dispatch(adminEditPost({
            [e.target.name]: e.target.value
        }))
    };

    const onTranslatedInputChangeHandler = (e: { target: any; }) => {
        if (activeEditingLanguage  === 'default') {
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

    const onDescriptionChangeHandler = (data:string) => {

        const e = {
            target: {
                name: 'description',
                value: data
            }
        }
        onTranslatedInputChangeHandler(e)
    }

    const onPostMetaChangeHandler = (type : string, data:[]) => {

        // @ts-ignore
        const previousMetaData = post?.[type] || [];
        const uniqItems = _.uniqBy([...previousMetaData, ...data], (e) => {
            return e.name;
        })
        dispatch(adminEditPost({
            [type]: uniqItems
        }))
    }

    const onDeleteMetaFromPost = (type : string, name : string) => {
        dispatch(adminEditPost({
            // @ts-ignore
            [type]: post[type].filter((i : {name:string}) => i.name !== name)
        }))
    }

    const onSaveHandler = async () => {
        dispatch(setLoading(true))
        try {
            // @ts-ignore
            if (post?._id) {
                // @ts-ignore
                dispatch(adminUpdatePost({...post,author: post?.author ? post.author : userData?._id}))
            } else {
                // @ts-ignore
                dispatch(adminSaveNewPost({...post,author: userData?._id},router))
            }
        } catch (error) {
            // @ts-ignore
            dispatch(setAlert({message: error.stack, type: 'error', active: true}))
            dispatch(setLoading(false))
        }
    }

    return (
        <>

            <Link href={'/admin/post?new=1'}>
                <a className={'btn btn-info'}>
                    New Post
                </a>
            </Link>
            <AdminPostPageStyledDiv className={'admin-post'}>
                <div className={'content'}>
                    <select className={'custom-select'} ref={languageElement} onChange={e => dispatch(adminChangeActiveEditingLanguage(e.target.value))}>
                        <option value={'default'}>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL || 'Default'}</option>
                        {languagesOptions}
                    </select>

                    <TitleDescription onChangeHandler={onTranslatedInputChangeHandler} onDescriptionChangeHandler={onDescriptionChangeHandler} onSaveHandler={onSaveHandler}/>

                    <PostInformation productInfo={productInfo} setProductInfo={setProductInfo}  onChangeHandler={onChangeHandler}/>

                </div>

                <div className={'side'}>
                    <DropDownWidget renderFor={'all'}
                                    component={ActionOnPost}
                                    title={post?.status}
                                    onChangeHandler={onChangeHandler}
                                    onSaveHandler={onSaveHandler}
                    />
                    <DropDownWidget renderFor={'all'}
                                    component={Format}
                                    title={'Format'}
                                    onChangeHandler={onChangeHandler}/>

                    <DropDownWidget renderFor={'all'}
                                    component={Meta}
                                    type={'categories'}
                                    title={'Post Category'}
                                    onChangeHandler={onChangeHandler}
                                    onPostMetaChangeHandler={onPostMetaChangeHandler}
                                    onDeleteHandler={onDeleteMetaFromPost}/>

                    <DropDownWidget renderFor={'all'}
                                    component={Meta}
                                    type={'tags'}
                                    title={'Post Tags'}
                                    onChangeHandler={onChangeHandler}
                                    onPostMetaChangeHandler={onPostMetaChangeHandler}
                                    onDeleteHandler={onDeleteMetaFromPost}/>

                    {
                        post?.postType === 'video' ?
                            <DropDownWidget renderFor={'all'}
                                            component={Meta}
                                            type={'actors'}
                                            title={'Post Actors'}
                                            onChangeHandler={onChangeHandler}
                                            onPostMetaChangeHandler={onPostMetaChangeHandler}
                                            onDeleteHandler={onDeleteMetaFromPost}/>
                            : null
                    }

                    <DropDownWidget renderFor={'all'}
                                    component={RatingOption}
                                    title={'Rating'}
                                    onChangeHandler={onChangeHandler}/>

                </div>

            </AdminPostPageStyledDiv>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store =>


    async (context) => {
        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common'])),
            }
        }
    });

export default Index;

