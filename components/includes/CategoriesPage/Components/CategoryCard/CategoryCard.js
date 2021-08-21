import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";
import {withTranslation} from "next-i18next";

const CategoryCard = ({t,cardWidth, category, postElementSize}) => {
    const router = useRouter()

    return (
        <Link href={`/category/${category?._id}`}>
            <a className='category-card-link'>
                <style jsx>{`
                  .category-card-link {

                    width: ${postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
                    max-width: ${postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
                    margin: 2.8px;
                    display: flex;
                    flex-direction: ${postElementSize === 'list' ? 'row' : 'column'};
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    padding-bottom: 5px;
                    background-color: var(--post-element-background-color);

                    .category-card-title {
                      width: ${postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                      max-width: ${postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                      color: var(--main-text-color);
                      text-align: center;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 1;
                      font-weight: normal;
                      font-size: 12px;
                                &:hover {
                        filter: invert(70%);
                      }

                    }
                  }

                  @media only screen and (min-width: 768px) {
                    .category-card-link {
                      width: ${postElementSize === 'list' ? '100%' : `${cardWidth}px`};
                      max-width: ${postElementSize === 'list' ? `320px` : `100%`};
                      flex-direction: ${postElementSize === 'list' ? 'row' : 'column'};
                      margin: ${postElementSize === 'list' ? '2px' : '7px'};;
                      font-size: 14px;

                      .category-card-title {
                        font-size: 14px;
                      }
                    }

                  }


                `}</style>
                <CategoryCardMedia cardWidth={cardWidth} imageUrl={category?.imageUrl} mediaAlt={category?.translations?.[router.locale]?.name || category?.name}/>
                <h3 className='category-card-title'>{ category?.translations?.[router.locale]?.name || t([t(`customTranslation:${category?.name}`)])}</h3>
            </a>
        </Link>
    );
};

export default withTranslation(['customTranslation'])(CategoryCard);
