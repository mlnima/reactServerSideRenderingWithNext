import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";
import {withTranslation} from "next-i18next";

const CategoryCard = ({t, cardWidth, category, onActivateLoadingHandler}) => {
    const router = useRouter()
    return (
        <div className={'category-card'}>
            <div className={'category-card-image'}>
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-link-image' onClick={onActivateLoadingHandler}>
                        <CategoryCardMedia cardWidth={cardWidth} imageUrl={category?.imageUrl} mediaAlt={category?.translations?.[router.locale]?.name || category?.name} categotyId={category._id}/>
                    </a>
                </Link>
            </div>
            <div className={'category-card-info'}>
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-info-link' onClick={onActivateLoadingHandler}>
                        <h3 className='category-card-title'>{category?.translations?.[router.locale]?.name || t([t(`customTranslation:${category?.name}`)])}</h3>
                        {category?.count ? <span>{category?.count}</span> : null}
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default withTranslation(['customTranslation'])(CategoryCard);

