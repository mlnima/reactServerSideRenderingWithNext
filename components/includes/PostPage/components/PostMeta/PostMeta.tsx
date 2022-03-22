import Link from "next/link";
import {uniqueId} from "lodash";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {FC} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const PostMetaStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
  padding: 5px 0;
  width: 100%;

  .meta-type {
    color: var(--post-page-info-color,#ccc);
    display: flex;
    margin: 0 5px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .post-meta-item {
    background-color: var(--meta-background-color,#f90);
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 30px;
    margin: 5px;
  }

  .post-meta-item-link {
    color: var(--meta-text-color,#000);
    text-decoration: none;
  }
`

interface PostMetaPropType{
    type:string
}


const PostMeta:FC<PostMetaPropType> = ({  type}) => {
    const {t} = useTranslation(['common', 'customTranslation']);

    const post = useSelector(({posts}:StoreTypes)=>posts.post)

    const filterMeta = post?.[type]?.length ? post?.[type].filter(m => m.name?.length > 1) : [];
    const renderData = filterMeta.map(item => {
        const typePath = item.type === 'tags' ? 'tag' :
            item.type === 'categories' ? 'category' :
                item.type === 'actors' ? 'actor' : 'category'

        return (
            <div key={uniqueId(`${item.type}_`)} className='post-meta-item'>
                <Link href={`/${typePath}/${item._id}`}>
                    <a className={type + ' post-meta-item-link'} title={item.name}>{item.name}</a>
                </Link>
            </div>
        )
    });
    if (filterMeta?.length){
        return (
            <PostMetaStyledDiv className={type + ' post-meta'}>
                <span className='meta-type'> {t(`${type.charAt(0).toUpperCase() + type.substring(1)}`)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </PostMetaStyledDiv>
        );
    }else return null

};

export default PostMeta;