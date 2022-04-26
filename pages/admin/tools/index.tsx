import Link from 'next/link'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {adminCheckAndRemoveDeletedVideos, setMetaThumbnailsAndCount} from "@store/adminActions/adminPanelPostsActions";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import React from "react";

let StyledDiv = styled.div`
  
  .btn-primary{
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

    const dispatch = useDispatch()

    return (
        <StyledDiv className={'adminTools'}>
            <Link href={'/admin/tools/terminal'}>
                <a className={'btn btn-primary'}>Terminal</a>
            </Link>
            <button className={'btn btn-primary'} onClick={()=>dispatch(adminCheckAndRemoveDeletedVideos())}>Check and Removed deleted videos</button>
            <button className={'btn btn-primary'} onClick={()=>dispatch(setMetaThumbnailsAndCount())}>Set New Meta Thumbnails And Count Fro Meta</button>
            <button className={'btn btn-primary'} onClick={()=>dispatch(setMetaThumbnailsAndCount('tags'))}>Set New Thumbnails And Count for Tags  </button>
            <button className={'btn btn-primary'} onClick={()=>dispatch(setMetaThumbnailsAndCount('categories'))}>Set New Thumbnails And Count for categories  </button>
            <button className={'btn btn-primary'} onClick={()=>dispatch(setMetaThumbnailsAndCount('actors'))}>Set New Thumbnails And Count for actors  </button>
        </StyledDiv>
    );
};

tools.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default tools;
