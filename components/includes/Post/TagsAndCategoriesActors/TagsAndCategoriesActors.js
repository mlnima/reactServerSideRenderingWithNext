import Link from "next/link";
import { faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import _ from "lodash";

const TagsAndCategoriesActors = props => {
    const renderData = props.data.map(item => {
        const path = `/posts?metaId=${item._id}&metaName=${item.name}&metaType=${item.type}`;
        const asPath = `/${item.type}/${item.name}?metaId=${item._id}`
        const icon = props.type === 'categories' ? faFolder
            : props.type === 'tags' ? faTag
                : props.type === 'actors' ? faStar
                    : faTag
        return (
            <div key={_.uniqueId('id_')}  className='post-meta-item'>
                <FontAwesomeIcon style={props.svgDefaultStyle} icon={icon} className='meta-data-logo'  />
                <Link href={path} as={asPath}   >
                    <a className={props.type} >{item.name}</a>
                </Link>
            </div>
        )
    });

    if (props.data.length >= 1) {
        return (
            <div className={props.type + ' tags-categories-actors'}>
                <span > {props.type.charAt(0).toUpperCase() + props.type.substring(1)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </div>
        );
    } else return null

};
export default TagsAndCategoriesActors;