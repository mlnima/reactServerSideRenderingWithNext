import dynamic from "next/dynamic";
const WidgetText = dynamic(() => import('./WidgetText/WidgetText'))
const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetCustomScript = dynamic(() => import('./WidgetCustomScript/WidgetCustomScript'))
import styled from "styled-components";

let WidgetStyledSection = styled.section`
  ${props => props?.customStyles}
`

const Widget = props => {
    const idAttribute = props.data?.extraId ? {id: props.data?.extraId} : {}

    return (
        <WidgetStyledSection {...idAttribute}
                             className={'widget ' + (props.data?.extraClassName ?? '')}
                             customStyles={props.data?.customStyles || ''}
        >
            {props.data.title ? <WidgetHeader {...props.data}/> : null}
            {props.data.text ? <WidgetText {...props.data} id={props._id}/> : null}
            {props.widgetToRender ?
                <props.widgetToRender
                    {...props.data}
                    widgetId={props.widgetId}
                    isSidebar={props.isSidebar}
                    widget={true}
                    viewType={props.viewType}
                /> : null}
            {props.data.customScript ?
                <WidgetCustomScript customScript={props.data.customScript}
                                    customScriptStrategy={props.data.customScriptStrategy}
                />
                :null
            }
        </WidgetStyledSection>
    );
};
export default Widget;
