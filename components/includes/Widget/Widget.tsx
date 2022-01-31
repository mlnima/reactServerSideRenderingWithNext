import dynamic from "next/dynamic";
import styled from "styled-components";
import {FC} from "react";
import {WidgetDataPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
const WidgetText = dynamic(() => import('./WidgetText/WidgetText'))
const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetCustomScript = dynamic(() => import('./WidgetCustomScript/WidgetCustomScript'))
const WidgetPagination = dynamic(() => import('./WidgetPagination/WidgetPagination'))


interface WidgetComponentPropTypes {
    extraId: any;
    data:WidgetDataPropTypes,
    customStyles:string,
    widgetId:string,
    isSidebar:boolean,
    WidgetToRender:any,
    viewType?:string
}

let WidgetStyledSection = styled.section`
  ${({customStyles}:{customStyles:string}) => customStyles || ''}
`

const Widget : FC<WidgetComponentPropTypes> = ({data,WidgetToRender,widgetId,isSidebar,viewType}) => {
    const idAttribute = data?.extraId ? {id: data?.extraId} : {}

    return (
        <WidgetStyledSection {...idAttribute}
                             className={'widget ' + (data?.extraClassName ?? '')}
                             customStyles={data?.customStyles || ''}
        >
            {data.title ? <WidgetHeader {...data}/> : null}
            {data.text ? <WidgetText {...data} id={widgetId}/> : null}
            {WidgetToRender ?
                <WidgetToRender
                    {...data}
                    widgetId={widgetId}
                    isSidebar={isSidebar}
                    widget={true}
                    viewType={viewType}
                /> : null}
            {data.customScript ?
                <WidgetCustomScript customScript={data.customScript}
                                    customScriptStrategy={data.customScriptStrategy}
                />
                : null
            }
            {data?.pagination && data?.redirectLink ?
                <WidgetPagination baseUrl={data.redirectLink}/>
                : null
            }
        </WidgetStyledSection>
    );
};
export default Widget;
