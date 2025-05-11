'use client';
import Link from 'next/link';
import React from 'react';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import { loading, setAlert } from '@store/reducers/globalStateReducer';
import { setAllMetaImagesAndCount } from '@lib/actions/database/operations/metas/refreshMetaImagesAndCountFromPosts';
import { ServerActionResponse } from '@lib/actions/response';
import { checkRemovedVideos } from '@lib/actions/database/operations/posts/checkDeletedVideos';
import { generateSitemaps } from '@lib/actions/database/operations/sitemap/sitemapGenerator';

const ToolsPage = () => {

  const dispatch = useAppDispatch();

  const setMetaThumbnailsAndCount = async (type?:'categories' | 'tags' | 'actors') => {
    dispatch(loading(true));
    try {
      const {success,message,error} = await setAllMetaImagesAndCount(type) as ServerActionResponse
      dispatch(loading(false))
      if (!success){
        dispatch(
          setAlert({
            message: message,
            type: 'error',
            error,
          }),
        );
      }
      dispatch(
        setAlert({
          message:message,
          type: 'success',
        }),
      );
    }catch{
      dispatch(loading(false))
    }
  };

  return (
    <div className={'ToolsPage'}>
      <Link href={'/dashboard/tools/terminal'} className={'btn btn-primary'}>
        Terminal
      </Link>
      <button className={'btn btn-primary'} onClick={async ()=> {
        await checkRemovedVideos()
      }}>
        Check and Removed deleted videos(not working)
      </button>
      <button className={'btn btn-primary'} onClick={() => setMetaThumbnailsAndCount()}>
        Set New Meta Thumbnails And Count Fro Meta
      </button>
      <button className={'btn btn-primary'} onClick={() => setMetaThumbnailsAndCount('tags')}>
        Set New Thumbnails And Count for Tags
      </button>
      <button className={'btn btn-primary'}
              onClick={() => setMetaThumbnailsAndCount('categories')}>
        Set New Thumbnails And Count for categories
      </button>
      <button className={'btn btn-primary'} onClick={() => setMetaThumbnailsAndCount('actors')}>
        Set New Thumbnails And Count for actors
      </button>
      <button className={'btn btn-primary'} onClick={() => generateSitemaps()}>
        Generate Sitemaps
      </button>
    </div>
  );
};

export default ToolsPage;