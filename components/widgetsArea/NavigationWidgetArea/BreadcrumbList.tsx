import React, {memo} from "react";
import styled from "styled-components";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BreadcrumbGenerator from "@components/includes/BreadcrumbGenerator";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const Style = styled.div`
  background-color: var(--navigation-background-color, #000);

  li {
    display: flex;
    align-items: center;
    font-size: small;
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  ${(props: { stylesData: string }) => props.stylesData ?? ''}
`


const BreadcrumbList = () => {
    const navigationStyle = useSelector(({settings}: Store) => settings?.design?.navigationStyle)
    return (
        <Style role="presentation" stylesData={navigationStyle || ''} className='navigation-content'>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <BreadcrumbGenerator/>
            </Breadcrumbs>
        </Style>
    )
};
export default memo(BreadcrumbList)

