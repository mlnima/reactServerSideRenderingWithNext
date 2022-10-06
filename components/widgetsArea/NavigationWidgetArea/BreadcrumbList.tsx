import React, {memo} from "react";
import styled from "styled-components";
import BreadcrumbGenerator from "@components/includes/BreadcrumbGenerator";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const Style = styled.div`
  background-color: var(--navigation-background-color, #000);
  display: flex;
  //flex-wrap: wrap;
  padding: 5px;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  max-width: 100vw;
  overflow:hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
  div {
    display: flex;
    align-items: center;
    font-size: small;


    .breadcrumb-item-link {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--navigation-text-color, #ccc);

      .breadcrumb-item-arrow-icon {
        margin: auto 3px;
        rotate: 90deg;
      }

      &:hover {
        color: var(--main-active-color, #ccc);
      }
    }
  }

  ${(props: { stylesData: string }) => props.stylesData ?? ''}
`


const BreadcrumbList = () => {
    const navigationStyle = useSelector(({settings}: Store) => settings?.design?.navigationStyle)
    return (
        <Style role="presentation" stylesData={navigationStyle || ''} className='breadcrumbs-content'>
            <BreadcrumbGenerator/>
        </Style>
    )
};

export default memo(BreadcrumbList)

