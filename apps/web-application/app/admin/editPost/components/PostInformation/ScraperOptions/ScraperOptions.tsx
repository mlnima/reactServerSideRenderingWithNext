// @ts-nocheck
'use client';
import { convertVariableNameToName } from '@repo/utils';
import React, { FC, useEffect, useRef, useState } from 'react';
import { inputValueSimplifier } from '@repo/utils';
import { useAppDispatch } from '@storeDashboard/hooks';
import {
  getPostScrapedDataAction,
  getSearchAndFindARelatedPostUrlAction,
} from '@storeDashboard/reducers/postsReducer';
import RelatedPostPreview from '../RelatedPostScrapper/RelatedPostPreview/RelatedPostPreview';
import './ScraperOptions.scss';
import { IPost } from '@repo/typescript-types';


interface PropTypes {
  sourceURL: string;
  postId?: string;
  post:IPost
  relatedPosts: IPost[] | null
}

const ScraperOptions: FC<PropTypes> = ({ sourceURL, postId,post,relatedPosts }) => {
  const findARelatedPostUrlSelectRef = useRef<HTMLSelectElement>(null);
  const findARelatedPostUrlInputRef = useRef<HTMLInputElement>(null);
  const [relatedPostsPage, setRelatedPostsPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [fields, setFields] = useState<string[]>([]);

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
  ];

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = inputValueSimplifier(e);
    const fieldName = e.target.name;
    setFields((prevFields) =>
      isChecked ? [...prevFields, fieldName] : prevFields.filter((field) => field !== fieldName),
    );
    localStorage.setItem('adminEditingPostPageScrapperFields', JSON.stringify(fields));
  };

  useEffect(() => {
    if (localStorage.adminEditingPostPageScrapperFields) {
      const storedFields = JSON.parse(localStorage.adminEditingPostPageScrapperFields);
      setFields(storedFields);
    }
  }, []);

  const onGetRelatedPostsHandler = (more?: boolean) => {
    const nextPage = more ? relatedPostsPage + 1 : relatedPostsPage;
    setRelatedPostsPage(nextPage);
    dispatch(
      getSearchAndFindARelatedPostUrlAction({
        postId,
        page: nextPage,
        relatedBy: findARelatedPostUrlSelectRef.current?.value ||
          findARelatedPostUrlInputRef.current?.value ||
          '',
      }),
    );
  };

  return (
    <div className={'ScraperOptions'}>
      <span>Scrapper Options:</span>
      <div className="filed-checkboxes">
        {availableFields.map((field, index) => (
          <div className="filed-checkbox" key={index}>
            <label>{convertVariableNameToName(field)}</label>
            <input
              type="checkbox"
              name={field}
              onChange={onChangeHandler}
              value={field}
              checked={fields.includes(field)}
            />
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button onClick={() => setFields(availableFields)} className="btn btn-info">All</button>
        <button onClick={() => setFields([])} className="btn btn-info">Clear</button>
        <button
          onClick={() => dispatch(getPostScrapedDataAction({ url: sourceURL }))}
          className="btn btn-primary"
        >
          Scrap All
        </button>
        <button
          onClick={() => dispatch(getPostScrapedDataAction({ url: sourceURL, fields }))}
          className="btn btn-primary"
        >
          Scrap Limited
        </button>
        <div className="actionSection">
          <button
            onClick={() => onGetRelatedPostsHandler()}
            className="btn btn-primary"
          >
            Find Similar
          </button>
          <span>By</span>
          <select className="primarySelect" ref={findARelatedPostUrlSelectRef}>
            <option value="">select</option>
            {[...(post?.actors || []), ...(post?.categories || []), ...(post?.tags || [])].map(item => (
              <option key={item?.name} value={item?.name}>{item?.name}</option>
            ))}
          </select>
          <span>Or</span>
          <input className="primaryInput" ref={findARelatedPostUrlInputRef} />
        </div>
      </div>
      {(relatedPosts && relatedPosts.length > 0 )&& (
        <div className="relatedPostWrapper">
          <div className="relatedPostsContent">
            {relatedPosts.map((relatedPost, index) => (
              <RelatedPostPreview key={index} cardData={relatedPost} />
            ))}
          </div>
          <button
            className="btn btn-primary loadMoreRelatedPosts"
            onClick={() => onGetRelatedPostsHandler(true)}
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

export default ScraperOptions;