import Link from "next/link";
import _ from "lodash";

const TagsAndCategoriesActors = props => {

    const filterMeta = props.data.length>0 ?  props.data.filter(m=>m.name.length>1) : []

    const renderData = filterMeta.map(item => {
        const path = `/posts?metaId=${item._id}&metaName=${item.name}&metaType=${item.type}`;
        const asPath = `/${item.type}/${item.name}?metaId=${item._id}`

        return (
            <div key={_.uniqueId('id_')} className='post-meta-item'>
            <style jsx>{`
                .post-meta-item{
                    background-color:var(--meta-background-color);
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-height: 30px;
                    margin: 5px;
                }
                    .post-meta-item-link{
                    color:var(--meta-text-color);
                    text-decoration: none;              
                }
            `}</style>


                <Link href={path} as={asPath}>
                    <a className={props.type+' post-meta-item-link' } >{item.name}</a>
                </Link>
            </div>
        )
    });

    if (props.data.length >= 1) {
        return (
            <div className={props.type + ' tags-categories-actors'}>
            <style jsx>{`
                .tags-categories-actors{
                    display: flex;
                    flex-wrap: wrap;
                    margin: 5px 0;
                    padding: 5px 0;
                }
                .meta-type {
                    color:var(--post-page-info-color);
                    display: flex;
                    margin: 0 5px;
                }
                    .content{
                    display: flex;
                    flex-wrap: wrap;
                }
            `}</style>
                <span className='meta-type'> {props.type.charAt(0).toUpperCase() + props.type.substring(1)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </div>
        );
    } else return null

};
export default TagsAndCategoriesActors;