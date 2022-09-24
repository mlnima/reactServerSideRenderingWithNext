import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
// import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";

let StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const maintenance = () => {

    return (
        <StyledDiv id='maintenance-page'>
            <h1> Under Maintenance</h1>
            <p>please visit our site later</p>

        </StyledDiv>
    );
};


// export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(context.locale as string, ['common'])),
//         }
//     }
// })

maintenance.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default maintenance;
