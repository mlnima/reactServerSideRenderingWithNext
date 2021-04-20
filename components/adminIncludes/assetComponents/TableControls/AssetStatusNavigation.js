import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from 'next/link';
import {convertVariableNameToName} from '../../../../_variables/_variables'
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .asset-page-status-navigation-item{
       margin: 5px;
       //@include linkLikeActionBtnAdmin;
  }
`;
const AssetStatusNavigation = props => {
    const router = useRouter()
    const [state, setState] = useState({
        types: ['all', 'draft', 'published', 'pending', 'trash', 'reported']
    });

    const renderStatus = state.types.map(type => {
        return (
            <Link key={type} href={{
                pathname: router ? router.pathname : '',
                query: {...router.query, status: type}
            }}><a className='asset-page-status-navigation-item'>{convertVariableNameToName(type)}</a></Link>
        )
    })

    if (router) {
        if (router.query.assetsType === 'posts' || router.query.assetsType === 'metas' || router.query.assetsType === 'comments' || router.query.assetsType === 'orders') {
            return (
                <StyledDiv className='asset-page-status-navigation'>
                    {renderStatus}
                </StyledDiv>
            );
        } else {
            return (
                <StyledDiv className='asset-page-status-navigation'>

                </StyledDiv>
            )
        }
    } else return null


};
export default AssetStatusNavigation;
