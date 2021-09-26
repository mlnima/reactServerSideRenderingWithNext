import Link from "next/link";

const CardMetaData = props => {
    const typePath = props.meta.type === 'tags' ? 'tag' :
          props.meta.type === 'categories' ? 'category' :
          props.meta.type === 'actors' ? 'actor' : 'category'

    return (
        <Link href={`/${typePath}/${props.meta._id}`}>
            <a className='card-meta-data' title={props.meta.name}>
                #{props.meta.name}
            </a>
        </Link>

    );
};
export default CardMetaData;
