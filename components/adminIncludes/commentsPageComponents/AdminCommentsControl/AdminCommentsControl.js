import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  .status{
    a{
      margin:  0 10px;
    }
  }
`

const AdminCommentsControl = props => {
    return (
        <StyledDiv className='AdminCommentsControl'>
            <div className="status">
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'all'}
                }}><a>All</a></Link>
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'approved'}
                }}><a>Approved</a></Link>
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'trash'}
                }}><a>Trash</a></Link>
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'pending'}
                }}><a>Pending</a></Link>
            </div>

        </StyledDiv>
    );
};
export default AdminCommentsControl;
