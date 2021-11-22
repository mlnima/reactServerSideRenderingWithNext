import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";
import {withTranslation} from "next-i18next";

const CategoryCard = ({t, cardWidth, category, onActivateLoadingHandler}) => {

    const router = useRouter()
    return (
        <Link href={`/category/${category?._id}`}>
            <a className='category-card-link' onClick={onActivateLoadingHandler}>
                <CategoryCardMedia cardWidth={cardWidth} imageUrl={category?.imageUrl} mediaAlt={category?.translations?.[router.locale]?.name || category?.name} categotyId={category._id}/>
                <h3 className='category-card-title'>{category?.translations?.[router.locale]?.name || t([t(`customTranslation:${category?.name}`)])}</h3>
            </a>
        </Link>
    );
};

export default withTranslation(['customTranslation'])(CategoryCard);

