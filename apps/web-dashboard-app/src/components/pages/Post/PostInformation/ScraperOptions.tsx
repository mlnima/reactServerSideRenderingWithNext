import React, {FC, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {inputValueSimplifier} from "@repo/shared-util";
import {useAppDispatch} from "@store/hooks";
import {
    editPostSourceAction,
    getPostScrapedDataAction,
    getSearchAndFindARelatedPostUrlAction
} from "@store/reducers/postsReducer";
import {useSelector} from "react-redux";
import {DashboardStore} from "@repo/typescript-types";
import RelatedPostPreview
    from "@components/pages/Post/PostInformation/RelatedPostScrapper/RelatedPostPreview/RelatedPostPreview";

const Style = styled.div`
  .filed-checkboxes {
    display: flex;
    align-items: center;
    gap: 5px;

    .filed-checkbox {
      display: flex;
      align-items: center;
      background-color: var(--primary-background-color, #000);
      padding: 4px;
      box-sizing: border-box;
      border-radius: 5px;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 5px;
    gap: 5px;

    .actionSection {
      margin-left: 20px;
      margin-right: 20px;
      gap: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 600px;
    }
  }

  .relatedPostWrapper {
    margin: 12px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .relatedPostsContent {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .loadMoreRelatedPosts {

    }

  }
`;

interface PropTypes {
    sourceURL: string
    postId?: string
}


const ScraperOptions: FC<PropTypes> = ({sourceURL, postId}) => {
    const findARelatedPostUrlSelectRef = useRef<HTMLSelectElement>(null)
    const findARelatedPostUrlInputRef = useRef<HTMLInputElement>(null)
    const [relatedPostsPage, setRelatedPostsPage] = useState<number>(1)
    const post = useSelector(({posts}) => posts.post);
    const dispatch = useAppDispatch()
    const [fields, setFields] = useState<any>([])
    const relatedPosts = useSelector(({posts}) => posts.relatedPosts);

    const availableFields = [
        'actors',
        'categories',
        'tags',
        'title',
        'videoEmbedCode',
        'videoTrailerUrl',
        'description',
        'duration',
        'mainThumbnail',
        'postType',
        'quality',
        'source',
        'sourceSite',
    ]


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = inputValueSimplifier(e)
        const newStateData = isChecked ? [...fields, e.target.name] : fields.filter((field: string) => field != e.target.name)
        setFields(newStateData)
        localStorage.setItem('adminEditingPostPageScrapperFields', JSON.stringify(newStateData))

    }

    useEffect(() => {
        if (localStorage.adminEditingPostPageScrapperFields) {
            setFields(JSON.parse(localStorage.adminEditingPostPageScrapperFields))
        }
    }, []);

    const onGetRelatedPostsHandler = (more?: boolean) => {
        const nextPage = relatedPostsPage + 1
        setRelatedPostsPage(() => nextPage)

        dispatch(
            getSearchAndFindARelatedPostUrlAction(
                {
                    postId,
                    page: more ? nextPage : relatedPostsPage,
                    relatedBy: findARelatedPostUrlSelectRef?.current?.value ||
                        findARelatedPostUrlInputRef?.current?.value ||
                        ''
                }
            )
        )
    }

    return (
        <Style>
            <span>Scrapper Options:</span>
            <div className={'filed-checkboxes'}>
                {availableFields.map((field: string,index:number) => {
                    return (
                        <div className={'filed-checkbox'} key={index}>
                            <label>{field}</label>
                            <input type={'checkbox'}
                                   name={field}
                                   onChange={(e) => onChangeHandler(e)}
                                   value={field}
                                   checked={fields.includes(field)}/>
                        </div>
                    )
                })}
            </div>

            <div className={'action-buttons'}>

                <button onClick={() => setFields(availableFields)} className={'btn btn-info'}>all</button>
                <button onClick={() => setFields([])} className={'btn btn-info'}>clear</button>
                <button onClick={() => dispatch(getPostScrapedDataAction({url: sourceURL}))}
                        className={'btn btn-primary'}>
                    Scrap All
                </button>
                <button className={'btn btn-primary'}
                        onClick={() => dispatch(getPostScrapedDataAction({url: sourceURL,fields}))}
                >
                    scrap limited
                </button>
                <div className={'actionSection'}>

                    <button onClick={() => dispatch(
                        getSearchAndFindARelatedPostUrlAction(
                            {
                                postId,
                                page: relatedPostsPage,
                                relatedBy: findARelatedPostUrlSelectRef?.current?.value ||
                                    findARelatedPostUrlInputRef?.current?.value ||
                                    ''
                            }
                        )
                    )}
                            className={'btn btn-primary'}>
                        Find Similar
                    </button>
                    <span>By</span>
                    <select className={'primarySelect'} ref={findARelatedPostUrlSelectRef}>
                        <option value={''}>select</option>
                        {[...(post?.actors || []), ...(post?.categories || []), ...(post?.tags || [])].map(item => {
                            return (
                                <option value={item?.name} key={item?.name}>{item?.name}</option>
                            )
                        })}
                    </select>
                    <span>Or</span>
                    <input className={'primaryInput'} ref={findARelatedPostUrlInputRef}/>
                </div>

            </div>

            {relatedPosts.length > 0 &&

                <div className={'relatedPostWrapper'}>
                    <div className={'relatedPostsContent'}>
                        {relatedPosts.map((relatedPost: any,index:number) => {

                            return <RelatedPostPreview key={index} cardData={relatedPost}/>
                        })
                        }
                    </div>

                    <button className={'btn btn-primary loadMoreRelatedPosts'}
                            onClick={()=>onGetRelatedPostsHandler(true)}>
                        More
                    </button>
                </div>
            }


        </Style>
    )
};
export default ScraperOptions;
