import Link from 'next/link'
import styled from "styled-components";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch} from "react-redux";
import {adminCheckAndRemoveDeletedVideos, setMetaThumbnailsAndCount} from "../../../store/adminActions/adminPanelPostsActions";

let StyledDiv = styled.div`
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
        </StyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default tools;
