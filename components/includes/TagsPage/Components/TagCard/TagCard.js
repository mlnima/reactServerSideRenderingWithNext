import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";

const TagCard = ({cardWidth, tag}) => {
    const router = useRouter()
    return (
        <Link href={`/tag/${tag._id}`}>
            <a className='tag-card-link'>
                <style jsx>{`
                  .tag-card-link {
                    width: 48vw;
                    margin: 1vw;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;

                    .tag-card-title {
                      width: 100%;
                      color: var(--main-text-color);
                      text-align: center;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 1;
                    }
                  }

                  @media only screen and (min-width: 768px) {
                    .tag-card-link {
                      width: ${cardWidth}px;
                      margin: 5px;
                    }

                  }


                `}</style>
                <TagCardMedia cardWidth={cardWidth} imageUrl={tag.imageUrl}/>
                <h3 className='tag-card-title'>{tag?.translations?.[router.locale]?.name || tag.name}</h3>
            </a>
        </Link>);
};
export default TagCard;
