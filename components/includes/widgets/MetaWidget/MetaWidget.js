import Link from 'next/link'
import _ from "lodash";

const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map(meta => {
        const path = `/posts?metaId=${meta._id}&metaName=${meta.name}&metaType=${meta.type}`;
        const asPath = `/${meta.type}/${meta.name}?metaId=${meta._id}`
        return (

                <Link href={path} key={meta.name} as={asPath}>
                    <a className='meta-widget-item' key={_.uniqueId('id_')}>
                        <style jsx>{`
                            .meta-widget-item{
                                  text-decoration: none;
                                  display: grid;
                                  align-items: center;
                                  color: var(--meta-text-color);
                                  background-color: var(--meta-background-color);
                                  //margin: 1px;
                                  padding-left: 2px;
                                  height: 50px;
                            }
                            .meta-widget-item:hover{
                                  transition: .5s;
                                  transform: scale(1.02);
                                  z-index: 2;
                            }
                            .meta-name{
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
                .meta-widget{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 1px;
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
