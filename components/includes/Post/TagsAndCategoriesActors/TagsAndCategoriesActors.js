import Link from "next/link";
import {faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import _ from "lodash";
import styled from "styled-components";

let StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
    padding: 5px 0;
    .meta-type {
          color:var(--post-page-info-color);
          display: flex;
          margin: 0 5px;
      }
    .content{
           display: flex;
           flex-wrap: wrap;
    .post-meta-item{
            background-color:var(--meta-background-color);
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            max-height: 30px;
            margin: 5px;
            a{
             color:var(--meta-text-color);
            }
    }
    .meta-data-logo{
      width: 20px;
      height: 20px;
      color:var(--meta-text-color);
    }
  }
`
const TagsAndCategoriesActors = props => {
    const renderData = props.data.map(item => {
        const path = `/posts?metaId=${item._id}&metaName=${item.name}&metaType=${item.type}`;
        const asPath = `/${item.type}/${item.name}?metaId=${item._id}`
        const icon = props.type === 'categories' ? faFolder
            : props.type === 'tags' ? faTag
                : props.type === 'actors' ? faStar
                    : faTag
        return (
            <div key={_.uniqueId('id_')} className='post-meta-item'>
                <FontAwesomeIcon style={props.svgDefaultStyle} icon={icon} className='meta-data-logo'/>
                <Link href={path} as={asPath}>
                    <a className={props.type}>{item.name}</a>
                </Link>
            </div>
        )
    });

    if (props.data.length >= 1) {
        return (
            <StyledDiv className={props.type + ' tags-categories-actors'}>
                <span className='meta-type'> {props.type.charAt(0).toUpperCase() + props.type.substring(1)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </StyledDiv>
        );
    } else return null

};
export default TagsAndCategoriesActors;