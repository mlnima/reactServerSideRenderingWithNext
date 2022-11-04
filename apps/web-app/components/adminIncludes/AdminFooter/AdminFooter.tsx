import React, {FC} from 'react';
import styled from "styled-components";

const AdminFooterStyledFooter = styled.footer`
  grid-area: admin-footer;
`

const AdminFooter:FC = () => {
    return (
        <AdminFooterStyledFooter className='admin-footer'>
            Admin Footer
        </AdminFooterStyledFooter>
    );
};
export default AdminFooter;
