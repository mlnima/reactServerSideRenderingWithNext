import Link from "next/link";
import styled from "styled-components";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import React from "react";

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

settings.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default settings;