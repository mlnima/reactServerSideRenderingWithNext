import Link from "next/link";

const CardMetaData = props => {

    return (
        <Link href={`/posts?metaId=${props.meta._id}&metaName=${props.meta.name}&metaType=${props.meta.type}`}
              as={`/${props.meta.type}/${props.meta.name}?metaId=${props.meta._id}`}>
            <a className='video-card-meta-data' title={props.meta.name}>
                <style jsx>{`
                  .video-card-meta-data {
                    height: 20px;
                    width: auto;
                    color: var(--post-element-text-color);
                   
                    padding: 1px 2px 1px 15px;
                    margin: 2px;
                    //border: var(--post-element-text-color) .1px solid;
                    text-align: center;
                    border-radius: 5px;
                    align-self: flex-start;
                    background: url('/public/asset/images/icons/icon-tag.png') no-repeat left;
                  }
                `}</style>
                {props.meta.name}</a>
        </Link>

    );
};
export default CardMetaData;