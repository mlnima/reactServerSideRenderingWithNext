import React from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const SliderWidgetTypeFields = props => {
    return (
        <>
            <div className={'selectFieldForWidget'}>
                <p>Effect :</p>
                <select className={'custom-select'}
                        name='sliderEffect'
                        onChange={props.onUniqueDataChangeHandler}
                        value={props.widgetData?.uniqueData?.sliderEffect}
                >
                    <option value='false'>Select</option>
                    <option value='fade'>Fade</option>
                    <option value='coverflow'>Coverflow</option>
                    <option value='flip'>Flip</option>
                    <option value='cube'>Cube</option>
                </select>
            </div>

            <div className={'selectFieldForWidget'}>
                <p>Auto Play :</p>
                <select className={'custom-select'}
                        name='sliderAutoplay'
                        onChange={props.onUniqueDataChangeHandler}
                        value={props.widgetData?.uniqueData?.sliderAutoplay}
                >
                    <option value='false'>Off</option>
                    <option value='true'>On</option>
                </select>
            </div>
            <TextInputFieldForWidget inputTitle='Speed :'
                                     name='sliderSpeed'
                                     type='number'
                                     value={props.widgetData?.uniqueData?.sliderSpeed || 1000}
                                     classNameValue='sliderSpeed'
                                     placeHolder='Slide Speed'
                                     onChangeHandler={props.onUniqueDataChangeHandler}
                                     rendering={props.rendering}
            />
        </>
    );

};
export default SliderWidgetTypeFields;
