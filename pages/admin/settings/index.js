import Link from "next/link";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const settings = () => {
    return (
        <StyledDiv id='settings'>
            <Link href='/admin/settings/general'><a className='settings-page-item green-action-btn-link'>General Setting</a></Link>
        </StyledDiv>
    );
};
export default settings;