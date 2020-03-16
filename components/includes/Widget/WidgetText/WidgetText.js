import React, { useEffect, useState, useContext, useRef } from 'react';
import Text from '../WidgetsModelsComponents/Text/Text'

const WidgetText = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log( props)
    }, []);
    if (props.text){
        return (
            <Text text={props.text} textAlign={props.textAlign}/>
        )
    }else return null

};
export default WidgetText;
