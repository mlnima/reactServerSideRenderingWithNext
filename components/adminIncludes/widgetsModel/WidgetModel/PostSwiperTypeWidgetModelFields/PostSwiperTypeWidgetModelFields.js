import React, {useEffect, useState, useContext, useRef} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const PostSwiperTypeWidgetModelFields = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <>
            <TextInputFieldForWidget element='input' inputTitle='Image Swiper Images Amount In View Mobile :' name='postSwiperAmountMobile' type='number' value={props.postSwiperAmountMobile}
                                     classNameValue='postSwiperAmountMobile' placeHolder='Post Swiper Images Amount In View Mobile'
                                     onChangeHandler={props.onChangeHandler}/>
            <TextInputFieldForWidget element='input' inputTitle='Image Swiper Images Amount In View Desktop :' name='postSwiperAmountDesktop' type='number' value={props.postSwiperAmountDesktop}
                                     classNameValue='postSwiperAmountDesktop' placeHolder='Post Swiper Images Amount In View Desktop'
                                     onChangeHandler={props.onChangeHandler}/>
            <TextInputFieldForWidget element='input' inputTitle='Image Swiper Space Between Mobile :' name='postSwiperSpaceBetweenMobile' type='number' value={props.postSwiperSpaceBetweenMobile}
                                     classNameValue='postSwiperSpaceBetweenMobile' placeHolder='Post Swiper Space Between Mobile'
                                     onChangeHandler={props.onChangeHandler}/>
            <TextInputFieldForWidget element='input' inputTitle='Post Swiper Space Between Desktop :' name='postSwiperSpaceBetweenDesktop' type='number' value={props.postSwiperSpaceBetweenDesktop}
                                     classNameValue='postSwiperSpaceBetweenDesktop' placeHolder='Post Swiper Space Between Desktop'
                                     onChangeHandler={props.onChangeHandler}/>
        </>
    );
};
export default PostSwiperTypeWidgetModelFields;
