import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {withTranslation} from "next-i18next";

const TagCard = ({t,cardWidth, tag,onActivateLoadingHandler}) => {
    const router = useRouter()
    return (
        <Link href={`/tag/${tag._id}`}>
            <a className='tag-card-link' onClick={onActivateLoadingHandler}  >
                <TagCardMedia cardWidth={cardWidth} imageUrl={tag.imageUrl} mediaAlt={tag?.translations?.[router.locale]?.name || tag.name} tagId={tag._id}/>
                <h3 className='tag-card-title'> { tag?.translations?.[router.locale]?.name || t([t(`customTranslation:${tag?.name}`)])}</h3>
            </a>
        </Link>
    );
};

export default withTranslation(['customTranslation'])(TagCard);

