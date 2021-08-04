import React, {useState ,useEffect} from 'react';
import {widgetModels} from "../../widgetsModel/AddWidgetMenu/models";

const AddWidgetToPostMenuItem = props => {
    const [widgetsLength,setWidgetsLength] = useState(0)

    useEffect(() => {
        setWidgetsLength(props.state.widgets ? props.state.widgets.length :0)
    }, [props]);


    let newWidget = {
        ...widgetModels,
        type:props.type,
        widgetIndex: widgetsLength,
        widgetId:widgetsLength
    }





   const onClickHandler = () =>{


       props.setState({
           ...props.state,
           widgets:props.state.widgets ? [...props.state.widgets,newWidget] :[newWidget]
       })
   }

    return (
        <button onClick={onClickHandler} >{props.name}</button>
    );
};

export default AddWidgetToPostMenuItem;
