import Link from 'next/link'
import _ from "lodash";

const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map(meta => {
        const typePath = meta.type === 'tags' ? 'tag' :
                meta.type === 'categories' ? 'category' :
                meta.type === 'actors' ? 'actor' : 'category'
        return (

            <Link href={`/${typePath}/${meta._id}`} key={meta.name}>
                <a className='meta-widget-item' key={_.uniqueId('id_')} title={meta.name}>
                    <style jsx>{`
                      .meta-widget-item {
                        text-decoration: none;
                        color: var(--meta-text-color);
                        background-color: var(--meta-background-color);
                        padding: 5px 10px;
                      }

                      .meta-widget-item:hover {
                        transition: .5s;
                        transform: scale(1.02);
                        z-index: 2;
                      }

                      .meta-name {
                        padding-left: 2px;
                      }
                    `}</style>
                    {meta.name}
                </a>
            </Link>

        )
    })

    return (
        <div className='meta-widget'>
            <style jsx>
                {`
                  .meta-widget {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 2px;
                    max-width: 98%;
                    margin: auto;
                  }
                `}
            </style>
            {renderMeta}
        </div>
    );
};
export default MetaWidget;

// const path = `/posts?metaId=${meta._id}&metaName=${meta.name}&metaType=${meta.type}`;
// const asPath = `/${meta.type}/${meta.name}?metaId=${meta._id}`
//<Link href={path} key={meta.name} as={asPath}>