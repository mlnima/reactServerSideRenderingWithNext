'use client';

import Link from 'next/link';
import styled from "styled-components";
import React from "react";
import {
    checkAndRemoveDeletedVideosAction,
    generatePermaLinkForPostsAction,
    setMetaThumbnailsAndCountAction
} from "@storeDashboard/reducers/postsReducer";
import { useAppDispatch } from "@storeDashboard/hooks";
import { dashboardDeleteDuplicateMetas, dashboardAPIRequestGenerateSiteMaps } from "@repo/api-requests";

const StyledDiv = styled.div`
  .btn-primary {
    margin: 10px;
  }

  .terminalControl {
    display: flex;
    justify-content: space-between;

    width: 95%;

    input {
      background-color: black;
      color: white;
      width: 95%;
    }

    button {
      background-color: black;
      color: yellow;
      border: none;
    }
  }

  #terminalLog {
    width: 95%;
    min-height: 50vh;
    background-color: black;
    color: #916d07;
    margin-top: 40px;
    overflow: scroll;
  }
`;

const page = () => {

    const dispatch = useAppDispatch();

    return (
        <StyledDiv className={'adminTools'}>
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
        </StyledDiv>
    );
};

export default page;