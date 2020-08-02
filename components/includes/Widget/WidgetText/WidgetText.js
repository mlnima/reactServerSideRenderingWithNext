import React,{useEffect} from 'react';
import Text from '../WidgetsModelsComponents/Text/Text'

const WidgetText = props => {

    if (props.text) {
        return (
            <Text {...props}/>
        )
    } else return null

};
export default WidgetText;
