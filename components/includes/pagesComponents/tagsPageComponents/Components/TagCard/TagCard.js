import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {withTranslation} from "next-i18next";

const TagCard = ({t, cardWidth, tag, onActivateLoadingHandler}) => {
    const router = useRouter()

    return (
        <div className={'tag-card'}>
            <div className={'tag-card-image'}>
                <Link href={`/tag/${tag._id}`}>
                    <a className='tag-card-link' onClick={onActivateLoadingHandler}>
                        <TagCardMedia cardWidth={cardWidth} imageUrl={tag.imageUrl} mediaAlt={tag?.translations?.[router.locale]?.name || tag.name} tagId={tag._id}/>
                    </a>
                </Link>
            </div>
            <div className={'tag-card-info'}>
                <Link href={`/tag/${tag._id}`}>
                    <a className='tag-card-link' onClick={onActivateLoadingHandler}>
                        <h3 className='tag-card-title'> {tag?.translations?.[router.locale]?.name || t([t(`customTranslation:${tag?.name}`)])}</h3>
                        {tag?.count ? <span>{tag?.count}</span> : null}
                    </a>
                </Link>
            </div>
        </div>

    );
};

export default withTranslation(['customTranslation'])(TagCard);

