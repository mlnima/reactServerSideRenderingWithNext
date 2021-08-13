import Link from "next/link";
import _ from "lodash";

const PostMeta = props => {
    const filterMeta = props.data.length > 0 ? props.data.filter(m => m.name.length > 1) : [];
    const renderData = filterMeta.map(item => {
        const typePath = item.type === 'tags' ? 'tag' :
                     item.type === 'categories' ? 'category' :
                     item.type === 'actors' ? 'actor' : 'category'
        return (
            <div key={_.uniqueId(`${item.type}_`)} className='post-meta-item'>
                <style jsx>{`
                  .post-meta-item {
                    background-color: var(--meta-background-color);
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-height: 30px;
                    margin: 5px;
                  }
                  .post-meta-item-link {
                    color: var(--meta-text-color);
                    text-decoration: none;
                  }
                `}</style>

                <Link href={`/${typePath}/${item._id}`} >
                    <a className={props.type + ' post-meta-item-link'} title={item.name}>{item.name}</a>
                </Link>
            </div>
        )
    });

    if (props.data.length >= 1) {
        return (
            <div className={props.type + ' post-meta'}>
                <style jsx>{`
                  .post-meta {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 5px 0;
                    padding: 5px 0;
                    width: 100%;
                  }

                  .meta-type {
                    color: var(--post-page-info-color);
                    display: flex;
                    margin: 0 5px;
                  }

                  .content {
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
export default PostMeta;