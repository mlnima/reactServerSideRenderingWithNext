import Link from 'next/link'
import _ from "lodash";
import styled from "styled-components";

const MetaWidgetStyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2px;
  max-width: 98%;
  margin: auto;

  .meta-widget-item {
    text-decoration: none;
    color: var(--meta-text-color,#000);
    background-color: var(--meta-background-color,#f90);
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
`

const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map(meta => {
        const typePath = meta.type === 'tags' ? 'tag' :
                meta.type === 'categories' ? 'category' :
                meta.type === 'actors' ? 'actor' : 'category'
        return (

            <Link href={`/${typePath}/${meta._id}`} key={meta.name}>
                <a className='meta-widget-item' key={_.uniqueId('id_')} title={meta.name}>
                    {meta.name}
                </a>
            </Link>

        )
    })

    return (
        <MetaWidgetStyledDiv className='meta-widget'>
            {renderMeta}
        </MetaWidgetStyledDiv>
    );
};
export default MetaWidget;

