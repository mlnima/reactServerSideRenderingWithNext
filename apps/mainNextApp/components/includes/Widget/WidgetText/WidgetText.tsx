import React, {FC} from 'react';
import Text from '../WidgetsModelsComponents/Text/Text'

interface WidgetTextProps{
    translations:{},
    text:string
}

const WidgetText:FC<WidgetTextProps> = props => {
    return (
        <Text {...props}/>
    )
};

export default WidgetText;
