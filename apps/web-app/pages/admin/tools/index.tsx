import Link from 'next/link'
import styled from "styled-components";
import React from "react";
import {
    fetchAdminCheckAndRemoveDeletedVideos, fetchGeneratePermaLinkForPosts,
    fetchSetMetaThumbnailsAndCount
} from "../../../store_toolkit/adminReducers/adminPanelPostsReducer";
import {useAdminDispatch} from "../../../store_toolkit/hooks";

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


const tools = () => {

    const dispatch = useAdminDispatch()

    return (
        <StyledDiv className={'adminTools'}>
            <Link href={'/admin/tools/terminal'} className={'btn btn-primary'}>
                Terminal
            </Link>
            <button className={'btn btn-primary'} onClick={() => dispatch(fetchAdminCheckAndRemoveDeletedVideos())}>
                Check and Removed deleted videos
            </button>
            <button className={'btn btn-primary'} onClick={() => dispatch(fetchGeneratePermaLinkForPosts(null))}>
                Generate PermaLink For Posts
            </button>
            <button className={'btn btn-primary'} onClick={() => dispatch(fetchSetMetaThumbnailsAndCount(null))}>
                Set New Meta Thumbnails And Count Fro Meta
            </button>
            <button className={'btn btn-primary'} onClick={() => dispatch(fetchSetMetaThumbnailsAndCount('tags'))}>
                Set New Thumbnails And Count for Tags
            </button>
            <button className={'btn btn-primary'}
                    onClick={() => dispatch(fetchSetMetaThumbnailsAndCount('categories'))}>
                Set New Thumbnails And Count for categories
            </button>
            <button className={'btn btn-primary'} onClick={() => dispatch(fetchSetMetaThumbnailsAndCount('actors'))}>
                Set New Thumbnails And Count for actors
            </button>
        </StyledDiv>
    );
};

export default tools;
