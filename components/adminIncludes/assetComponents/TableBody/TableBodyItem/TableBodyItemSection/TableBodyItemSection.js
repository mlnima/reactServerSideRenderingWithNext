import React, {useEffect, useState, useContext, useRef} from 'react';
import RenderArraySection from './RenderArraySection';
import moment from "moment";

import styled from "styled-components";
let StyledDiv = styled.div`
  overflow-wrap: break-word;
  width: 150px;
  text-align: center;
  img {
    width: 100%;
  }
  .asset-page-item-array-section {
    display: flex;
    flex-wrap: wrap;

    .asset-page-item-array-section-item {
      margin: 5px;
      font-size: small;
    }
    p{
      overflow:hidden;
      display:inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
     
    }

  }

`
const TableBodyItemSection = props => {



    if (props.dataName === '_id') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'postedDate') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'status') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'author') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue ?props.dataValue.username:'Private' || 'Private'}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'authorID') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'email') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'onDocument') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'body') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'title') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{props.dataValue}</p>
            </StyledDiv>
        )
    } else if (props.dataName === 'tags') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <RenderArraySection data={props.dataValue}/>
            </StyledDiv>
        )
    } else if (props.dataName === 'categories') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <RenderArraySection data={props.dataValue}/>
            </StyledDiv>
        )
    } else if (props.dataName === 'actors') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <RenderArraySection data={props.dataValue}/>
            </StyledDiv>
        )
    } else if (props.dataName === 'mainThumbnail'||props.dataName === 'noImageUrl'||props.dataName === 'imageUrl') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <img src={props.dataValue}/>
            </StyledDiv>
        )
    } else if (props.dataName === 'createdAt'||props.dataName === 'updatedAt') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{moment(new Date(props.dataValue), "YYYYMMDD").fromNow(false)}</p>
            </StyledDiv>
        )
    } else return (
        <StyledDiv className='asset-page-table-body-item-section'>
            <p>{props.dataValue}</p>
        </StyledDiv>
    )

};
export default TableBodyItemSection;


//moment(new Date(this.props.message.createdAt), "YYYYMMDD").fromNow(false)