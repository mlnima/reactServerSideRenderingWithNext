import React, { useEffect, useRef, useMemo } from 'react';
import TitleDescription from './TitleDescription';
import ActionOnPost from './ActionOnPost';
import Format from './Format';
import Meta from './Meta';
import { Link, useSearchParams } from 'react-router-dom';
import RatingOption from './RatingOption';
import PostInformation from './PostInformation/PostInformation';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { editPostAction } from '@store/reducers/postsReducer';
import { getPostAction, defineNewPost, changeActiveEditingLanguage } from '@store/reducers/postsReducer';
import { DashboardStore } from '@repo/typescript-types';
import { useAppDispatch } from '@store/hooks';
import { LanguagesOptions } from '@repo/ui';
import { isNumericString } from '@repo/shared-util';
import Author from "./Author";

const AdminPostPageStyledDiv = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 320px;
    max-width: 100vw;

    .editingPostSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0.25rem 0.5rem;
        background-color: var(--tertiary-background-color);
        color: var(--secondary-text-color);
        margin-top: 0.5rem;
        border-radius: var(--primary-border-radius);
        box-sizing: border-box;

        .editingPostSectionTitle {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0.25rem 0;
        }
    }

    .editingPostSectionSide {
    }

    .content {
        .language-action {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 8px;

            .language-selector {
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

    .side {
        width: 100%;
        //padding: .5rem;
        //box-sizing: border-box;
    }
`;

const Index = () => {
    const post = useSelector(({ posts }: DashboardStore) => posts.post);
    const activeEditingLanguage = useSelector(({ posts }: DashboardStore) => posts.activeEditingLanguage);
    const dispatch = useAppDispatch();
    const [search, setSearch] = useSearchParams();
    const postId = useMemo(() => search.get('id'), [search]);
    const languageElement = useRef(null);

    useEffect(() => {
        if (postId) {
            dispatch(getPostAction(postId));
        } else {
            dispatch(defineNewPost(null));
        }
    }, [postId]);

    const onChangeHandler = (e: { target: { name: any; value: any } }) => {
        if (isNumericString(e.target.value)) {
            dispatch(editPostAction({ [e.target.name]: parseInt(e.target.value) }));
        } else {
            dispatch(editPostAction({ [e.target.name]: e.target.value }));
        }
    };

    const onTranslatedInputChangeHandler = (e: { target: any }) => {
        if (activeEditingLanguage === 'default') {
            dispatch(
                editPostAction({
                    [e.target.name]: e.target.value,
                }),
            );
        } else {
            dispatch(
                editPostAction({
                    translations: {
                        ...(post?.translations || {}),
                        [activeEditingLanguage]: {
                            ...(post?.translations?.[activeEditingLanguage] || {}),
                            [e.target.name]: e.target.value,
                        },
                    },
                }),
            );
        }
    };

    const onDescriptionChangeHandler = (data: string) => {
        const e = {
            target: {
                name: 'description',
                value: data,
            },
        };
        onTranslatedInputChangeHandler(e);
    };

    if (!post) {
        return <h1>Not Found</h1>;
    }
    return (
        <div>
            <AdminPostPageStyledDiv className={'admin-post'}>
                <div className={'content'}>
                    <div className="language-action">
                        <Link to={'/dashboard/post?new=1'} className={'btn btn-info'}>
                            New Post
                        </Link>
                        <select
                            className={'primarySelect language-selector'}
                            ref={languageElement}
                            onChange={e => dispatch(changeActiveEditingLanguage(e.target.value as string))}
                        >
                            <option value={'default'}>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'Default'}</option>
                            <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
                        </select>
                    </div>

                    <TitleDescription
                        onChangeHandler={onTranslatedInputChangeHandler}
                        onDescriptionChangeHandler={onDescriptionChangeHandler}
                        onTranslatedInputChangeHandler={onTranslatedInputChangeHandler}
                    />

                    <PostInformation onChangeHandler={onChangeHandler} />
                </div>

                <aside className={'side'}>
                    <div className={'editingPostSection editingPostSectionSide'}>
                        <div className={'editingPostSectionTitle'}>
                            <span>Status:</span>
                            <span>{post?.status}</span>
                        </div>
                        <ActionOnPost />
                    </div>
                    <div className={'editingPostSection editingPostSectionSide'}>
                        <div className={'editingPostSectionTitle'}>Format:</div>
                        <Format />
                    </div>
                    <div className={'editingPostSection editingPostSectionSide'}>
                        <div className={'editingPostSectionTitle'}>Author:</div>
                        <Author />
                    </div>
                    <div className={'editingPostSection editingPostSectionSide'}>
                        <div className={'editingPostSectionTitle'}>Categories:</div>
                        <Meta type={'categories'} />
                    </div>
                    <div className={'editingPostSection editingPostSectionSide'}>
                        <div className={'editingPostSectionTitle'}>Tags:</div>
                        <Meta type={'tags'} />
                    </div>

                    {post?.postType === 'video' && (
                        <div className={'editingPostSection editingPostSectionSide'}>
                            <div className={'editingPostSectionTitle'}>Actors:</div>
                            <Meta type={'actors'} />
                        </div>
                    )}

                    <div className={'editingPostSection editingPostSectionSide'}>
                        <RatingOption />
                    </div>
                </aside>
            </AdminPostPageStyledDiv>
        </div>
    );
};

export default Index;




