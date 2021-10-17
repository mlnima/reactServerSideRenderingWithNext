import Link from 'next/link'
import styled from "styled-components";

const MetaWidgetStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .meta-widget-item {
    text-decoration: none;
    color: var(--meta-text-color,#000);
    background-color: var(--meta-background-color,#f90);
    margin: 2px 2px;
  }
`

const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map((meta,index) => {
        const typePath = meta.type === 'tags' ? 'tag' :
                meta.type === 'categories' ? 'category' :
                meta.type === 'actors' ? 'actor' : 'category'
        return (
            <Link href={`/${typePath}/${meta._id}`} key={meta.name}>
                <a className='btn meta-widget-item' key={index} title={meta.name}>
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

