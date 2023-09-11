import styled from "styled-components";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import React from "react";

let StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const maintenance = () => {
    return (
        <StyledDiv id='maintenance-page'>
            <HeadSetter/>
            <h1> Under Maintenance</h1>
            <p>please visit our site later</p>
        </StyledDiv>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(utils => async (context) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(context.locale as string, ['common'])),
//         }
//     }
// })

export default maintenance;
