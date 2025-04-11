"use client";
import React, { useState, FC } from 'react';
import Link from 'next/link';
import TableBodyItemArraySection from './TableBodyItemArraySection';
import moment from "moment";
import './TableBodyItemSection.scss'

interface TableBodyItemSectionPropTypes {
  dataValue: any;
  dataName: string;
}

const TableBodyItemSection: FC<TableBodyItemSectionPropTypes> = ({ dataValue, dataName }) => {
  const [gotError, setGotError] = useState(false);

  if (dataName === '_id') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'postedDate') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'status') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'author') {
    return (
      <div className='TableBodyItemSection'>
        {dataValue?.username && dataValue?._id ? (
          <Link href={`/dashboard/user?id=${dataValue?._id}`} target={'_blank'}>
            <p>{dataValue.username}</p>
          </Link>
        ) : (
          <p> Account might be deleted</p>
        )}
      </div>
    );
  } else if (dataName === 'authorID') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'email') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'onDocumentId') {
    return (
      <div className='TableBodyItemSection'>
        {dataValue?.postType && dataValue?._id ? (
          <Link href={`/post/${dataValue?.postType}/${dataValue?._id}`} target={'_blank'}>
            <p>{dataValue?.title || dataValue?._id || 'something went wrong'}</p>
          </Link>
        ) : (
          <p> Post might be deleted</p>
        )}
      </div>
    );
  } else if (dataName === 'body') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'title') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  }else if (dataName === 'postCount') {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  } else if (dataName === 'tags') {
    return (
      <div className='TableBodyItemSection'>
        <TableBodyItemArraySection data={dataValue}  />
      </div>
    );
  } else if (dataName === 'categories') {
    return (
      <div className='TableBodyItemSection'>
        <TableBodyItemArraySection data={dataValue} />
      </div>
    );
  } else if (dataName === 'actors') {
    return (
      <div className='TableBodyItemSection'>
        <TableBodyItemArraySection data={dataValue} />
      </div>
    );
  } else if (dataName === 'mainThumbnail' || dataName === 'noImageUrl' || dataName === 'imageUrl' || dataName === 'thumbnail') {
    const imagePath = dataValue?.filePath || dataValue;
    const imageUrl = imagePath?.includes('http') ? imagePath : `${process.env.NEXT_PUBLIC_API_SERVER_URL}${imagePath}`;

    return (
      <div className='TableBodyItemSection'>
        {gotError ? (
          <p>Error || No image</p>
        ) : (
          <img src={imageUrl} onError={(err) => {
            // console.log(err);
            setGotError(true);
          }} />
        )}
      </div>
    );
  } else if (dataName === 'createdAt' || dataName === 'updatedAt') {
    return (
      <div className='TableBodyItemSection'>
        <p>{moment(new Date(dataValue), "YYYYMMDD").fromNow(false)}</p>
      </div>
    );
  } else {
    return (
      <div className='TableBodyItemSection'>
        <p>{dataValue}</p>
      </div>
    );
  }
};

export default TableBodyItemSection;
