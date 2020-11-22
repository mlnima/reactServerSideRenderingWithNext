import React, {useEffect, useState, useContext, useRef} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const ImageSwiperTypeWidgetModelFields = props => {
    const [state, setState] = useState({
        imageUrl: '',
        targetUrl: '',
        targetUrlAs: '',
        targetUrlType: '',
    });
    const [currentData,setCurrentData]=useState([])

  useEffect(() => {
      setCurrentData(props.imageSwiperData||[])
  }, [props.imageSwiperData]);





    useEffect(() => {
        console.log(props)
    }, [props]);

    const onChangeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }


    const onSubmitHandler = e => {
        e.preventDefault()
        const data = {
            target: {
                name: 'imageSwiperData',
                value: [...currentData,
                    {imageUrl: state.imageUrl, targetUrl: state.targetUrl, targetUrlType: state.targetUrlType, targetUrlAs: state.targetUrlAs}]
            }
        }
        props.onChangeHandler(data)
    }


    const onDeleteImageHandler = url =>{
        const data = {
            target: {
                name: 'imageSwiperData',
                value: currentData.filter(i=>i.imageUrl !== url)
            }
        }
        props.onChangeHandler(data)
    }



    const renderCurrentData = currentData.map(item=>{
        return(
            <div className='current-data-preview' style={{maxWidth:'300px'}}>
                <img src={item.imageUrl} style={{width:'100px'}}/>
                <p style={{width:'250px',wordWrap: 'break-word'}}>Image url : {item.imageUrl}</p>
                <p>Target url : {item.targetUrl}</p>
                <p>Target url As : {item.targetUrlAs}</p>
                <p>Target url Type : {item.targetUrlType}</p>
                <button onClick={()=>onDeleteImageHandler(item.imageUrl)}>delete</button>
            </div>
        )
    })




    return (
        <>
            <form onSubmit={e => onSubmitHandler(e)}>
                <p>Image Url:</p>
                <input type='text' required={true} name='imageUrl' onChange={e => onChangeHandler(e)}/>
                <p>Target Url:</p>
                <input type='text' required={true} name='targetUrl' onChange={e => onChangeHandler(e)}/>
                <p>Target Url As:</p>
                <input type='text' required={true} name='targetUrlAs' onChange={e => onChangeHandler(e)}/>
                <p>Target Url Type:</p>
                <select name='targetUrlType' required={true} onChange={e => onChangeHandler(e)}>
                    <option>select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
                <button type='submit'>Add</button>
            </form>

            {renderCurrentData}
            {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Images Amount In View Mobile :' name='imageSwiperAmountMobile' type='number' value={props.imageSwiperAmountMobile}*/}
            {/*                         classNameValue='imageSwiperAmountMobile' placeHolder='Image Swiper Images Amount In View Mobile'*/}
            {/*                         onChangeHandler={props.onChangeHandler}/>*/}
            {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Images Amount In View Desktop :' name='imageSwiperAmountDesktop' type='number' value={props.imageSwiperAmountDesktop}*/}
            {/*                         classNameValue='imageSwiperAmountDesktop' placeHolder='Image Swiper Images Amount In View Desktop'*/}
            {/*                         onChangeHandler={props.onChangeHandler}/>*/}
            {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Space Between Mobile :' name='imageSwiperSpaceBetweenMobile' type='number' value={props.imageSwiperSpaceBetweenMobile}*/}
            {/*                         classNameValue='imageSwiperSpaceBetweenMobile' placeHolder='Image Swiper Space Between Mobile'*/}
            {/*                         onChangeHandler={props.onChangeHandler}/>*/}
            {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Space Between Desktop :' name='imageSwiperSpaceBetweenDesktop' type='number' value={props.imageSwiperSpaceBetweenDesktop}*/}
            {/*                         classNameValue='imageSwiperSpaceBetweenDesktop' placeHolder='Image Swiper Space Between Desktop'*/}
            {/*                         onChangeHandler={props.onChangeHandler}/>*/}
        </>
    );
};
export default ImageSwiperTypeWidgetModelFields;
