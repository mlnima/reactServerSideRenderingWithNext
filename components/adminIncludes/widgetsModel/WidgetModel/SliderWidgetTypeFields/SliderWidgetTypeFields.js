import React, {useEffect, useState, useContext, useRef} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const SliderWidgetTypeFields = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    if (props.rendering) {
        return (
            <>
                <TextInputFieldForWidget inputTitle='How Many In Mobile ( default: 1 ):' name='slideAmountInMobile' type='number' value={props.widgetData.slideAmountInMobile}
                                         classNameValue='slideAmountInMobile' placeHolder='Slide Amount In Mobile'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>
                <TextInputFieldForWidget inputTitle='How Many In Desktop ( default: 3 ): :' name='slideAmountInDesktop' type='number' value={props.widgetData.slideAmountInDesktop}
                                         classNameValue='slideAmountInDesktop' placeHolder='Slide Amount In Desktop'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>
                <TextInputFieldForWidget inputTitle='Space Between In Mobile  ( default: 0 ) :' name='spaceBetweenAmountMobile' type='number' value={props.widgetData.spaceBetweenAmountMobile}
                                         classNameValue='spaceBetweenAmountMobile' placeHolder='SpaceBetweenAmountMobile'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>
                <TextInputFieldForWidget inputTitle='Space Between In Desktop  ( default: 0 ) :' name='spaceBetweenAmountDesktop' type='number' value={props.widgetData.spaceBetweenAmountDesktop}
                                         classNameValue='spaceBetweenAmountDesktop' placeHolder='Space Between Amount Desktop'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>
                <p>Effect :</p>
                <select name='sliderEffect' onChange={props.onChangeHandler} value={props.widgetData.sliderEffect}>
                    <option value='false'>Select</option>
                    <option value='fade'>Fade</option>
                    <option value='coverflow'>Coverflow</option>
                    <option value='flip'>Flip</option>
                    <option value='cube'>Cube</option>
                </select>
                <p>Auto Play :</p>
                <select name='sliderAutoplay' onChange={props.onChangeHandler} value={props.widgetData.sliderAutoplay}>
                    <option value='false'>Off</option>
                    <option value='true'>On</option>
                </select>
                {/*<p>Navigation :</p>*/}
                {/*<select name='sliderNavigation' onChange={props.onChangeHandler}  value={props.widgetData.sliderNavigation}>*/}
                {/*    <option value='false'>Off</option>*/}
                {/*    <option value='true'>On</option>*/}
                {/*</select>*/}
                <TextInputFieldForWidget inputTitle='Speed :' name='sliderSpeed' type='number' value={props.widgetData.sliderSpeed}
                                         classNameValue='sliderSpeed' placeHolder='Slide Speed'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>

                <TextInputFieldForWidget inputTitle='Image Ration width :' name='imageRatioWidth' type='number' value={props.widgetData.imageRatioWidth}
                                         classNameValue='imageRatioWidth' placeHolder='Image Ratio Width'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>

                <TextInputFieldForWidget inputTitle='Image Ration Height :' name='imageRatioHeight' type='number' value={props.widgetData.imageRatioHeight}
                                         classNameValue='imageRatioHeight' placeHolder='Image Ratio Height'
                                         onChangeHandler={props.onChangeHandler} rendering={props.rendering}/>


            </>
        );
    } else return null

};
export default SliderWidgetTypeFields;
