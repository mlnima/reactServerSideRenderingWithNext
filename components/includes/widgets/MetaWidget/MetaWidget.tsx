import styled from "styled-components";
import MetaWidgetElement from './MetaWidgetElement'
import {FC, useMemo} from "react";
import {Meta} from "@_typeScriptTypes/Meta";

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

interface MetaWidgetPropType{
    uniqueData?:{
        metaData?:Meta[],
    },
    metaType:string
}

const MetaWidget: FC<MetaWidgetPropType> = ({metaType,uniqueData}) => {

    const typePath = useMemo(()=>{
        return metaType === 'tags' ? 'tag' :
               metaType === 'categories' ? 'category' :
               metaType === 'actors' ? 'actor' : 'category'
    },[uniqueData])

    // console.log(uniqueData?.metaData)
    const renderMeta = (uniqueData?.metaData || []).map((meta,index) => {
        return (
            <MetaWidgetElement typePath={typePath} id={meta._id} key={meta._id} name={meta.name}/>
        )
    })

    return (
        <MetaWidgetStyledDiv className='meta-widget'>
            {renderMeta}
        </MetaWidgetStyledDiv>
    );
};

export default MetaWidget;

