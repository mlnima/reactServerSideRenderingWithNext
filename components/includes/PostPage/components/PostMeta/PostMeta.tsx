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
    flex-wrap: wrap;
    margin: 2px 5px;
    .post-meta-item {
      background-color: var(--meta-background-color, #f90);
      padding: 2px 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: 30px;
      margin: 2px;
      border-radius: 3px;
    }

    .post-meta-item-link {
      color: var(--meta-text-color, #000);
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    .actors {
      background-color: transparent;

      .post-meta-item-link {
        color: var(--post-page-info-color, #ccc);

        .meta-name {
          margin: 0;
          padding: 0;
        }

        .item-image {
          padding: 0;
          margin: 0 4px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: contain;
        }
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
            <div key={`${item.type}_${item._id}`} className={`post-meta-item ${item.type}`}>
                <Link href={`/${convertMetasTypeToSingular(item.type)}/${item._id}`}>
                    <a className={type + ' post-meta-item-link'} title={item.name}>
                        {item.type === 'actors' && <img src={item?.imageUrl} alt={item.name} className={'item-image'}/>}
                        <p className={'meta-name'}>{item.name}</p>
                    </a>
                </Link>
            </div>
        )
    });

    if (filterMeta?.length) {
        return (
            <PostMetaStyledDiv className={type + ' post-meta'}>
                <span className='meta-type'> {t<string>(`${type.charAt(0).toUpperCase() + type.substring(1)}`)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </PostMetaStyledDiv>
        );
    } else return null

};

export default PostMeta;