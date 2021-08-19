import Link from "next/link";

const CardMetaData = props => {
    const typePath = props.meta.type === 'tags' ? 'tag' :
        props.meta.type === 'categories' ? 'category' :
            props.meta.type === 'actors' ? 'actor' : 'category'
    return (
        <Link href={`/${typePath}/${props.meta._id}`}>
            <a className='video-card-meta-data' title={props.meta.name}>
                <style jsx>{`
                  .video-card-meta-data {
                    height: 12px;
                    font-size: 12px;
                    width: auto;
                    color: var(--post-element-text-color);
                    margin: 4px;
                    padding: 2px;
                    border-radius: 5px;
                    align-self: flex-start;
                  }

                  @media only screen and (min-width: 768px) {
                    .video-card-meta-data {
                      font-size: 14px;
                    }
                  }
                `}</style>
                {props.meta.name}</a>
        </Link>

    );
};
export default CardMetaData;
