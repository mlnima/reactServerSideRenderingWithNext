import React, {useEffect, useState, useContext, useRef, FC} from 'react';
import styled from "styled-components";
import MonacoEditor from "@components/adminIncludes/MonacoEditor/MonacoEditor";

const ImageSwiperTypeWidgetModelFieldsStyledDiv = styled.div`
  margin: 5px auto;
  padding: 2px;
  border-top: #fff solid;
  border-bottom: 1px #fff solid;

  width: 95%;

  .open-details {
    margin: 20px auto;
  }

  .form-control-input {
    width: 70%;
  }

  form {
    .image-Swiper-fields-form-section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .form-control-input {
        width: 70%;
      }
    }

  }

  .added-images {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .current-data-preview {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      width: 220px;
      border: 1px white solid;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;

      img {
        width: 200px !important;
        object-fit: contain;

      }

      p {
        padding: 2px;
        margin: 2px;
        align-self: flex-start;
        display: flex;
        align-items: center;
      }

      .index {
        display: flex;
        align-items: center;

        button {
          margin: 0 5px;
        }
      }
    ;
    }
  }


`

interface ImageSwiperTypeWidgetModelFieldsPropTypes {
    onUniqueDataChangeHandler: any,
    uniqueData: {
        moreDetailsButtonTextContent: string,
        details: string,
        imageSwiperData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[]
    },

}

const ImageSwiperTypeWidgetModelFields: FC<ImageSwiperTypeWidgetModelFieldsPropTypes> =
    ({
         uniqueData,
         onUniqueDataChangeHandler
     }) => {

        const [state, setState] = useState({
            imageUrl: '',
            imageAlt: '',
            targetUrl: '',
            targetUrlAs: '',
            targetUrlType: '',
            imageIndex: 0,
            imageId: 0
        });
        const [openDetails, setOpenDetails] = useState(false);


        const resetState = () => {
            setTimeout(() => {
                setState({
                    imageUrl: '',
                    imageAlt: '',
                    targetUrl: '',
                    targetUrlAs: '',
                    targetUrlType: '_self',
                    imageIndex: uniqueData?.imageSwiperData ? Math.max(...uniqueData?.imageSwiperData?.map(image => image.imageId), 0) + 1 : 0,
                    imageId: uniqueData?.imageSwiperData ? Math.max(...uniqueData?.imageSwiperData?.map(image => image.imageId), 0) + 1 : 0,
                })
            }, 1000)
        }


        useEffect(() => {
            resetState()
        }, [uniqueData?.imageSwiperData]);


        const onChangeHandler = (e) => {
            setState({...state, [e.target.name]: e.target.value})
        }

        const onSubmitHandler = e => {
            e.preventDefault()
            onUniqueDataChangeHandler({
                target: {
                    name: 'imageSwiperData',
                    value: [...(uniqueData?.imageSwiperData || []), state]
                }
            })
        }

        const onDeleteImageHandler = imageId => {
            const data = {
                target: {
                    name: 'imageSwiperData',
                    value: uniqueData?.imageSwiperData?.filter(i => i.imageId !== imageId)
                }
            }
            onUniqueDataChangeHandler(data)
        }

        const changeImageIndex = (imageId, value) => {
            const findIndexOfTheImage = uniqueData?.imageSwiperData?.findIndex(image => image.imageId === imageId)
            const instanceArray = uniqueData?.imageSwiperData
            instanceArray[findIndexOfTheImage].imageIndex = instanceArray[findIndexOfTheImage].imageIndex + value
            onUniqueDataChangeHandler({
                target: {
                    name: 'imageSwiperData',
                    value: instanceArray
                }
            })
        }


        const renderCurrentData = uniqueData?.imageSwiperData?.sort((a, b) => a.imageIndex > b.imageIndex ? 1 : -1)?.map((item, index) => {
            return (
                <div key={item.imageId || index} className='current-data-preview' style={{maxWidth: '300px'}}>
                    <p>ID: {item.imageId}</p>
                    <img src={item.imageUrl} style={{width: '100px'}} title={item.imageUrl}/>
                    <p title={item.imageUrl}>Image url
                        : {item.imageUrl.substring(0, 30)}...</p>
                    <p title={item.imageAlt}>Image Alt : {item.imageAlt}</p>
                    <p className={'index'}>Index:
                        <button onClick={() => changeImageIndex(item.imageId, -1)}
                                className={'btn btn-primary'}>-</button>
                        {item.imageIndex}
                        <button onClick={() => changeImageIndex(item.imageId, 1)} className={'btn btn-primary'}>+
                        </button>
                    </p>
                    <p>Url : {item.targetUrl}</p>
                    <p>Url Type : {item.targetUrlType}</p>
                    <button onClick={() => onDeleteImageHandler(item.imageId)} className={'btn btn-danger'}>Delete
                    </button>
                </div>
            )
        })


        return (
            <ImageSwiperTypeWidgetModelFieldsStyledDiv className={'image-Swiper-fields'}>
                <h2> Image Swiper : </h2>
                <form onSubmit={e => onSubmitHandler(e)}>
                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Image ID:</p>
                        <label>{state.imageId}</label>
                    </div>
                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Url:</p>
                        <input type='text'
                               required={true}
                               name='imageUrl'
                               onChange={e => onChangeHandler(e)}
                               value={state.imageUrl}
                               className={'form-control-input'}
                        />
                    </div>
                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Alt:</p>
                        <input type='text'
                               required={true}
                               name='imageAlt'
                               onChange={e => onChangeHandler(e)}
                               value={state.imageAlt}
                               className={'form-control-input'}
                        />
                    </div>
                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Index:</p>
                        <input type='number'
                               name='imageIndex'
                               onChange={e => onChangeHandler(e)}
                               value={state.imageIndex}
                               className={'form-control-input'}
                        />
                    </div>
                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Target Url:</p>
                        <input type='text'
                               name='targetUrl'
                               onChange={e => onChangeHandler(e)}
                               value={state.targetUrl}
                               className={'form-control-input'}
                        />
                    </div>
                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Target Url Type:</p>
                        <select name='targetUrlType'
                                onChange={e => onChangeHandler(e)}
                                value={state.targetUrlType}
                                className={'custom-select'}
                        >
                            <option value=''>Select</option>
                            <option value='_self'>Same Window</option>
                            <option value='_blank'>Open New Tab</option>
                        </select>
                    </div>


                    <button type='submit' className={' btn btn-primary'}>Add</button>
                </form>

                <div className={'added-images'}>
                    {uniqueData?.imageSwiperData?.length ? renderCurrentData : null}
                </div>

                <div className={'image-Swiper-fields-form-section'}>
                    <p>Details Button Text Content:</p>
                    <input type='text'
                           name='moreDetailsButtonTextContent'
                           onChange={onUniqueDataChangeHandler}
                           value={uniqueData?.moreDetailsButtonTextContent}
                           className={'form-control-input'}
                    />
                </div>

                <div className={'monaco-editor-section'}>

                    <div className={'editor-section'}>
                        <p>Details:</p>
                        <button onClick={() => setOpenDetails(!openDetails)} className={'btn btn-primary open-details'}>
                            {openDetails ? 'close details' : 'open details'}
                        </button>
                    </div>

                    {openDetails ?
                        <div>
                            Image Swiper Details:
                            <MonacoEditor language={'html'}
                                          name={'details'}
                                          defaultValue={uniqueData?.details}
                                          value={uniqueData?.details}
                                          className={'details'}
                                          onChange={onUniqueDataChangeHandler}
                            />
                        </div>
                        : null
                    }
                </div>

            </ImageSwiperTypeWidgetModelFieldsStyledDiv>
        );
    };
export default ImageSwiperTypeWidgetModelFields;


// {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Images Amount In View Mobile :' name='imageSwiperAmountMobile' type='number' value={props.imageSwiperAmountMobile}*/}
// {/*                         classNameValue='imageSwiperAmountMobile' placeHolder='Image Swiper Images Amount In View Mobile'*/}
// {/*                         onChangeHandler={props.onChangeHandler}/>*/}
// {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Images Amount In View Desktop :' name='imageSwiperAmountDesktop' type='number' value={props.imageSwiperAmountDesktop}*/}
// {/*                         classNameValue='imageSwiperAmountDesktop' placeHolder='Image Swiper Images Amount In View Desktop'*/}
// {/*                         onChangeHandler={props.onChangeHandler}/>*/}
// {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Space Between Mobile :' name='imageSwiperSpaceBetweenMobile' type='number' value={props.imageSwiperSpaceBetweenMobile}*/}
// {/*                         classNameValue='imageSwiperSpaceBetweenMobile' placeHolder='Image Swiper Space Between Mobile'*/}
// {/*                         onChangeHandler={props.onChangeHandler}/>*/}
// {/*<TextInputFieldForWidget element='input' inputTitle='Image Swiper Space Between Desktop :' name='imageSwiperSpaceBetweenDesktop' type='number' value={props.imageSwiperSpaceBetweenDesktop}*/}
// {/*                         classNameValue='imageSwiperSpaceBetweenDesktop' placeHolder='Image Swiper Space Between Desktop'*/}
// {/*                         onChangeHandler={props.onChangeHandler}/>*/}