import Link from "next/link";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {FC} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {convertMetasTypeToSingular} from "@_variables/_variables";

const PostMetaStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 5px 0;
  padding: 5px 0;
  width: 100%;

  .meta-type {
    color: var(--post-page-info-color, #ccc);
    display: flex;
    padding: 2px 5px;
    margin: 2px 5px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    .post-meta-item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin: 2px 5px;
      background-color: var(--meta-background-color, #f90);
      padding: 5px;
      max-height: 30px;
      border-radius: 3px;
      color: var(--meta-text-color, #000);
      text-decoration: none;

      .categories-logo, .tags-logo {
        margin-right: 5px;
        width: 14px;
        height: 14px;
        background-color: var(--meta-text-color, #000);
      }

      .categories-logo {
        mask: url('/public/asset/images/icons/folder-solid.svg') no-repeat center;
        -webkit-mask: url('/public/asset/images/icons/folder-solid.svg') no-repeat center;
      }

      .tags-logo {
        mask: url('/public/asset/images/icons/tag-solid.svg') no-repeat center;
        -webkit-mask: url('/public/asset/images/icons/tag-solid.svg') no-repeat center;
      }
    }

    .actors {
      background-color: transparent;
      color: var(--post-page-info-color, #ccc);

      .item-image {
        padding: 0;
        margin: 0 4px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
`

interface PostMetaPropType {
    type: string
}

const PostMeta: FC<PostMetaPropType> = ({type}) => {
    const {t} = useTranslation(['common', 'customTranslation']);

    const post = useSelector(({posts}: StoreTypes) => posts.post)

    const filterMeta = post?.[type]?.length ? post?.[type].filter(m => m.name?.length > 1) : [];

    const renderData = filterMeta.map(item => {
        return (
            <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`} key={`${item.type}_${item._id}`}>
                <a className={`post-meta-item ${item.type}`} title={item.name}>
                    {item.type === 'actors' ? <img src={item?.imageUrl}
                                                   alt={item.name}
                                                   className={'item-image'}/> :
                        <i className={`${item.type}-logo`}/>
                    }
                    {item.name}
                </a>
            </Link>
        )
    });

    if (filterMeta?.length) {
        return (
            <PostMetaStyledDiv className={type + ' post-meta'}>
                <div className="content">
                    {/*{type === 'actors' &&*/}
                    {/*    <span className='meta-type'>*/}
                    {/*        {t<string>(`${type.charAt(0).toUpperCase() + type.substring(1)}: `)}*/}
                    {/*    </span>*/}
                    {/*}*/}
                    {renderData}
                </div>
            </PostMetaStyledDiv>
        );
    } else return null

};

export default PostMeta;