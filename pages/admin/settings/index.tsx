import Link from "next/link";
import styled from "styled-components";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const settings = () => {
    return (
        <StyledDiv id='settings'>
            <Link href={'/admin/settings/general'}>
                <a className='settings-page-item green-action-btn-link'>General Setting</a>
            </Link>
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

export default settings;