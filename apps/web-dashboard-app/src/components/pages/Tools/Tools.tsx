import {Link} from 'react-router-dom'
import styled from "styled-components";
import React from "react";
import {
    checkAndRemoveDeletedVideosAction,
    generatePermaLinkForPostsAction,
    setMetaThumbnailsAndCountAction
} from "@store/reducers/postsReducer";
import {useAppDispatch} from "@store/hooks";
import {dashboardAPIRequestSyncDuplicateMetas} from "api-requests";

let StyledDiv = styled.div`

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
`


const Tools = () => {

    const dispatch = useAppDispatch()

    return (
        <StyledDiv className={'adminTools'}>
            <Link to={'/dashboard/tools/terminal'} className={'btn btn-primary'}>
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
            <button className={'btn btn-primary'} onClick={() => dashboardAPIRequestSyncDuplicateMetas()}>
                Sync Duplicate Metas
            </button>
        </StyledDiv>
    );
};

export default Tools;
