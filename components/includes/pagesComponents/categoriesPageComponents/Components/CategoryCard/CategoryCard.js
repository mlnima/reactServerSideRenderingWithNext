import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const CategoryCardStyledDiv = styled.div`
.category-card-info{
  .category-card-info-link{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 95%;
    margin: auto;

    .category-card-title {
      color: var(--main-active-color);
      width: fit-content;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 12px;
      padding: 3px 0;
      margin: 3px 0;
      &:hover {
        color: var(--post-element-text-color, #ccc);
      }

    }
    .category-card-count{
      margin: 0 2px;
      color: var(--main-text-color);
    }
  }
}
`
const CategoryCard = ({t, cardWidth, category, onActivateLoadingHandler}) => {
    const router = useRouter()
    return (
        <CategoryCardStyledDiv className={'category-card'}>
            <div className={'category-card-image'}>
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-link-image' onClick={onActivateLoadingHandler}>
                        <CategoryCardMedia cardWidth={cardWidth} imageUrl={category?.imageUrl} mediaAlt={category?.translations?.[router.locale]?.name || category?.name} categotyId={category._id}/>
                    </a>
                </Link>
            </div>
            <div className={'category-card-info'}>
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-info-link'
                       onClick={onActivateLoadingHandler}
                       title={category?.translations?.[router.locale]?.name || t([t(`customTranslation:${category?.name}`)])}
                    >
                        <h3 className='category-card-title'>{category?.translations?.[router.locale]?.name || t([t(`customTranslation:${category?.name}`)])}</h3>
                        {category?.count ? <span className={'category-card-count'}>({category?.count})</span> : null}
                    </a>
                </Link>
            </div>
        </CategoryCardStyledDiv>
    );
};

export default withTranslation(['customTranslation'])(CategoryCard);

