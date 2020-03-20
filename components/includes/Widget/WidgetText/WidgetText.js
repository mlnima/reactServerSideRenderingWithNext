import React from 'react';
import Text from '../WidgetsModelsComponents/Text/Text'

const WidgetText = props => {

    if (props.text){
        return (
            <Text text={props.text} textAlign={props.textAlign}/>
        )
    }else return null

};
export default WidgetText;
