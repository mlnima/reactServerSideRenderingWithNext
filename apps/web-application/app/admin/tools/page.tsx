'use client';
import Link from 'next/link';
import React from 'react';
import { useAppDispatch } from '@store/hooks';
import {
  dashboardDeleteDuplicateMetas,
  dashboardAPIRequestGenerateSiteMaps,
  dashboardAPIRequestCheckAndRemoveDeletedVideos,
  dashboardAPIRequestSetMetaThumbnailsAndCount,
  dashboardAPIRequestGeneratePermaLinkForPosts,
} from '@repo/api-requests';
import './styles.scss';
import { loading, setAlert } from '@store/reducers/globalStateReducer';
import { AxiosResponse } from 'axios';


const ToolsPage = () => {

  const dispatch = useAppDispatch();

  const checkAndRemoveDeletedVideos = async () => {
    dispatch(loading(true));
    return await dashboardAPIRequestCheckAndRemoveDeletedVideos()
      .then((res: AxiosResponse<any>) => {
        dispatch(
          setAlert({
            message:
              res.data?.message ||
              'Checking Removed Video Started',
            type: 'success',
          }),
        );
      })
      .catch(err => {
        dispatch(
          setAlert({
            message: err.response.data.message,
            type: 'error',
            err,
          }),
        );
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

  const setMetaThumbnailsAndCount = async (type?: string) => {
    dispatch(loading(true));
    await dashboardAPIRequestSetMetaThumbnailsAndCount(type)
      .then((res: AxiosResponse<any>) => {
        dispatch(
          setAlert({
            message:
              res.data?.message ||
              'Setting New Image and Fix Count For Meta Data Started',
            type: 'success',
          }),
        );
      })
      .catch(err => {
        dispatch(
          setAlert({
            message: err.response.data.message,
            type: 'error',
            err,
          }),
        );
      })
      .finally(() => dispatch(loading(false)));
  };

  const generatePermaLinkForPosts = async () => {
    dispatch(loading(true));
    await dashboardAPIRequestGeneratePermaLinkForPosts(type)
      .then((res: AxiosResponse<any>) => {
        dispatch(
          setAlert({
            message:
              res.data?.message ||
              'Generating PermaLinks for Posts Started',
            type: 'success',
          }),
        );
      })
      .catch(err => {
        dispatch(
          setAlert({
            message: err.response.data.message,
            type: 'error',
            err,
          }),
        );
      })
      .finally(() => dispatch(loading(false)));
  };

  return (
    <div className={'ToolsPage'}>
      <Link href={'/dashboard/tools/terminal'} className={'btn btn-primary'}>
        Terminal
      </Link>
      <button className={'btn btn-primary'} onClick={checkAndRemoveDeletedVideos}>
        Check and Removed deleted videos
      </button>
      <button className={'btn btn-primary'} onClick={() => generatePermaLinkForPosts()}>
        Generate PermaLink For Posts
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