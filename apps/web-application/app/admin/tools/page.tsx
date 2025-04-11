'use client';
import Link from 'next/link';
import React from 'react';
import {
  checkAndRemoveDeletedVideosAction,
  generatePermaLinkForPostsAction,
  setMetaThumbnailsAndCountAction,
} from '@storeDashboard/reducers/postsReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { dashboardDeleteDuplicateMetas, dashboardAPIRequestGenerateSiteMaps } from '@repo/api-requests';
import './styles.scss';


const ToolsPage = () => {

  const dispatch = useAppDispatch();

  return (
    <div className={'ToolsPage'}>
      <Link href={'/dashboard/tools/terminal'} className={'btn btn-primary'}>
        Terminal
      </Link>
      <button className={'btn btn-primary'} onClick={() => dispatch(checkAndRemoveDeletedVideosAction())}>
        Check and Removed deleted videos
      </button>
      <button className={'btn btn-primary'} onClick={() => dispatch(generatePermaLinkForPostsAction(null))}>
        Generate PermaLink For Posts
      </button>
      <button className={'btn btn-primary'} onClick={() => dispatch(setMetaThumbnailsAndCountAction(null))}>
        Set New Meta Thumbnails And Count Fro Meta
      </button>
      <button className={'btn btn-primary'} onClick={() => dispatch(setMetaThumbnailsAndCountAction('tags'))}>
        Set New Thumbnails And Count for Tags
      </button>
      <button className={'btn btn-primary'}
              onClick={() => dispatch(setMetaThumbnailsAndCountAction('categories'))}>
        Set New Thumbnails And Count for categories
      </button>
      <button className={'btn btn-primary'} onClick={() => dispatch(setMetaThumbnailsAndCountAction('actors'))}>
        Set New Thumbnails And Count for actors
      </button>
      <button className={'btn btn-primary'} onClick={() => dashboardDeleteDuplicateMetas()}>
        Delete Duplicate Metas
      </button>
      <button className={'btn btn-primary'} onClick={() => dashboardAPIRequestGenerateSiteMaps()}>
        Generate Sitemaps
      </button>
    </div>
  );
};

export default ToolsPage;