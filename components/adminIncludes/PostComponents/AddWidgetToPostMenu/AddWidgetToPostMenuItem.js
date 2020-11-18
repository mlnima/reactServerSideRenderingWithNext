import React from 'react';
import {widgetModels} from "../../widgetsModel/AddWidgetMenu/models";

const AddWidgetToPostMenuItem = props => {

   const onClickHandler = () =>{
       let newWidget = {
           ...widgetModels,
           type:props.type,
           widgetIndex: props.state.widgets ? props.state.widgets.length :0
       }
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
