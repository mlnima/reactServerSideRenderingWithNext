import Link from "next/link";
import {faFolder, faStar, faTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
const CardMetaItemStyledLink = styled.a`
  color: var(--main-active-color, #ccc);
  font-size: 12px;
  transition: .5s;
  .icon{
    width: 10px;
    height: 8px;
    margin: 0 .5px 0 3px;
  }
  &:hover {
    color: var(--post-element-text-color,#ccc);
  }
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`

interface CardMetaItemPropTypes {
    meta:{
        type:string,
        _id:string,
        name:string,
    }
}

const CardMetaItem = ({meta}:CardMetaItemPropTypes) => {
    const typePath = meta.type === 'tags' ? 'tag' :
          meta.type === 'categories' ? 'category' :
          meta.type === 'actors' ? 'actor' : 'category';

    return (
            <Link href={`/${typePath}/${meta._id}`}>
                <CardMetaItemStyledLink href={`/${typePath}/${meta._id}`} className='card-meta-link' title={meta.name}>
                    {meta.type === 'actors' ? <FontAwesomeIcon icon={faStar} className='icon'/>:
                        meta.type === 'categories' ? <FontAwesomeIcon icon={faFolder} className='icon'/> :
                            <FontAwesomeIcon icon={faTag} className='icon'/>
                    }
                    {meta.name}
                </CardMetaItemStyledLink>
            </Link>
    );
};
export default CardMetaItem;
