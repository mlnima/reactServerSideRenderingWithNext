import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import _ from "lodash";
import styled from "styled-components";
let StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2px;
    max-width: 98%;
    margin: auto;
    .meta-child-element {
       background-color: var(--meta-background-color);
    .meta-widget-item{
      display: grid;
      grid-template-columns: 2fr 8fr;
      place-items: center;
      color: var(--meta-text-color);
      padding: 3px;
      .meta-name{
        padding-left: 2px;
      }
      .meta-data-logo{
    
        width: 20px;
        height: 20px;
      }
    }
    &:hover{
        transition: .5s;
        transform: scale(1.1);
        z-index: 2;
    }
  }
`
const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map(meta => {
        const path = `/posts?metaId=${meta._id}&metaName=${meta.name}&metaType=${meta.type}`;
        const asPath = `/${meta.type}/${meta.name}?metaId=${meta._id}`
        const icon = meta.type === 'categories' ? faFolder
            : meta.type === 'tags' ? faTag
                : meta.type === 'actors' ? faStar
                    : faTag

        return (
            <div key={_.uniqueId('id_')} className='meta-child-element' >
                <Link href={path} key={meta.name} as={asPath}>

                    <a className='meta-widget-item' >
                        <FontAwesomeIcon icon={icon} className='meta-data-logo'/>
                        <span className='meta-name'>{meta.name}</span>

                    </a>
                </Link>
            </div>
        )
    })

    return (
        <StyledDiv className='meta-widget'>
            {renderMeta}
        </StyledDiv>
    );
};
export default MetaWidget;
