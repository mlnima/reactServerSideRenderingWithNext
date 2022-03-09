import React, { useState, FC} from 'react';
import RenderArraySection from './RenderArraySection';
import Link from 'next/link'
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
      width: 150px;
     
    }

  }

`

interface TableBodyItemSectionPropTypes{
    dataValue:any,
    dataName:string
}

const TableBodyItemSection: FC<TableBodyItemSectionPropTypes> = ({dataValue,dataName}) => {
const [gotError,setGotError] = useState(false)


    if (dataName === '_id') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'postedDate') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'status') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'author') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                { dataValue?.username && dataValue?._id ?
                    <Link href={`/admin/user?id=${dataValue?._id}`}>
                        <a target={'blank'}>
                            <p>{dataValue.username}</p>
                        </a>
                    </Link>
                    :<p> Account might be deleted</p>
                }
            </StyledDiv>
        )
    } else if (dataName === 'authorID') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'email') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'onDocumentId') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                { dataValue?.postType && dataValue?._id ?
                    <Link href={`/post/${dataValue?.postType}/${dataValue?._id}`}>
                        <a target={'blank'}>
                            <p>{dataValue?.title || dataValue?._id || 'something went wrong'}</p>
                        </a>
                    </Link>
                    :<p> Post might be deleted</p>
                }
            </StyledDiv>
        )
    } else if (dataName === 'body') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'title') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{dataValue}</p>
            </StyledDiv>
        )
    } else if (dataName === 'tags') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <RenderArraySection data={dataValue}/>
            </StyledDiv>
        )
    } else if (dataName === 'categories') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <RenderArraySection data={dataValue}/>
            </StyledDiv>
        )
    } else if (dataName === 'actors') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <RenderArraySection data={dataValue}/>
            </StyledDiv>
        )
    } else if (dataName === 'mainThumbnail'||dataName === 'noImageUrl'||dataName === 'imageUrl') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                {gotError ?
                   <p>Error || No image</p>
                :  <img src={dataValue} onError={(err)=>{
                        // console.log(err)
                        setGotError(true)
                  }}/>
                }

            </StyledDiv>
        )
    } else if (dataName === 'createdAt'||dataName === 'updatedAt') {
        return (
            <StyledDiv className='asset-page-table-body-item-section'>
                <p>{moment(new Date(dataValue), "YYYYMMDD").fromNow(false)}</p>
            </StyledDiv>
        )
    } else return (
        <StyledDiv className='asset-page-table-body-item-section'>
            <p>{dataValue}</p>
        </StyledDiv>
    )

};
export default TableBodyItemSection;


//moment(new Date(this.message.createdAt), "YYYYMMDD").fromNow(false)