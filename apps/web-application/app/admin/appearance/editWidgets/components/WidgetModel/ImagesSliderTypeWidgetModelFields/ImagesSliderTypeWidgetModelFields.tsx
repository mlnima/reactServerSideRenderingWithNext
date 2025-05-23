// @ts-nocheck
'use client';
import React, {useEffect, useState, FC} from 'react';
import MonacoEditor from '@components/textEditors/MonacoEditor';
import './ImagesSliderTypeWidgetModelFields.scss'


interface ImageSwiperTypeWidgetModelFieldsPropTypes {
    onUniqueDataChangeHandler: any,
    uniqueData: {
        moreDetailsButtonTextContent: string,
        details: string,
        imagesData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[]
    },

}

const ImagesSliderTypeWidgetModelFields: FC<ImageSwiperTypeWidgetModelFieldsPropTypes> =
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
        const [openImagesForm, setOpenImagesForm] = useState(false);

        const resetState = () => {
            setTimeout(() => {
                setState({
                    imageUrl: '',
                    imageAlt: '',
                    targetUrl: '',
                    targetUrlAs: '',
                    targetUrlType: '_self',
                    imageIndex: uniqueData?.imagesData ? Math.max(...uniqueData?.imagesData?.map(image => image.imageId), 0) + 1 : 0,
                    imageId: uniqueData?.imagesData ? Math.max(...uniqueData?.imagesData?.map(image => image.imageId), 0) + 1 : 0,
                })
            }, 1000)
        }


        useEffect(() => {
            resetState()
        }, [uniqueData?.imagesData]);


        const onChangeHandler = (e) => {
            setState({...state, [e.target.name]: e.target.value})
        }

        const onSubmitHandler = e => {
            e.preventDefault()
            onUniqueDataChangeHandler({
                target: {
                    name: 'imagesData',
                    value: [...(uniqueData?.imagesData || []), state]
                }
            })
        }

        const onDeleteImageHandler = imageId => {
            const data = {
                target: {
                    name: 'imagesData',
                    value: uniqueData?.imagesData?.filter(i => i.imageId !== imageId)
                }
            }
            onUniqueDataChangeHandler(data)
        }

        const changeImageIndex = (imageId, value) => {
            const findIndexOfTheImage = uniqueData?.imagesData?.findIndex(image => image.imageId === imageId)
            const instanceArray = uniqueData?.imagesData
            instanceArray[findIndexOfTheImage].imageIndex = instanceArray[findIndexOfTheImage].imageIndex + value
            onUniqueDataChangeHandler({
                target: {
                    name: 'imagesData',
                    value: instanceArray
                }
            })
        }


        const renderCurrentData = [...uniqueData?.imagesData]?.sort((a, b) => a.imageIndex > b.imageIndex ? 1 : -1)?.map((item, index) => {
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
            <div className={'ImagesSliderTypeWidgetModelFields'}>

                <div className={'open-section'}>
                    <p className={'section-title'}> Image Swiper / Slider : </p>
                    <button onClick={() => setOpenImagesForm(!openImagesForm)} className={'btn btn-primary section-action'}>
                        {openDetails ? 'close' : 'open'}
                    </button>
                </div>

                {openImagesForm ?

                <>

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
                                   className={'primaryInput'}
                            />
                        </div>
                        <div className={'image-Swiper-fields-form-section'}>
                            <p>Alt:</p>
                            <input type='text'
                                   required={true}
                                   name='imageAlt'
                                   onChange={e => onChangeHandler(e)}
                                   value={state.imageAlt}
                                   className={'primaryInput'}
                            />
                        </div>
                        <div className={'image-Swiper-fields-form-section'}>
                            <p>Index:</p>
                            <input type='number'
                                   name='imageIndex'
                                   onChange={e => onChangeHandler(e)}
                                   value={state.imageIndex}
                                   className={'primaryInput'}
                            />
                        </div>
                        <div className={'image-Swiper-fields-form-section'}>
                            <p>Target Url:</p>
                            <input type='text'
                                   name='targetUrl'
                                   onChange={e => onChangeHandler(e)}
                                   value={state.targetUrl}
                                   className={'primaryInput'}
                            />
                        </div>
                        <div className={'image-Swiper-fields-form-section'}>
                            <p>Target Url Type:</p>
                            <select name='targetUrlType'
                                    onChange={e => onChangeHandler(e)}
                                    value={state.targetUrlType}
                                    className={'primarySelect'}
                            >
                                <option value=''>Select</option>
                                <option value='_self'>Same Window</option>
                                <option value='_blank'>Open New Tab</option>
                            </select>
                        </div>


                        <button type='submit' className={' btn btn-primary'}>Add</button>
                    </form>

                    <div className={'added-images'}>
                        {uniqueData?.imagesData?.length ? renderCurrentData : null}
                    </div>

                    <div className={'image-Swiper-fields-form-section'}>
                        <p>Details Button Text Content:</p>
                        <input type='text'
                               name='moreDetailsButtonTextContent'
                               onChange={onUniqueDataChangeHandler}
                               value={uniqueData?.moreDetailsButtonTextContent}
                               className={'primaryInput'}
                        />
                    </div>
                </>

                :null
                }


                <div className={'open-section'}>
                    <p className={'section-title'}>Details:</p>
                    <button onClick={() => setOpenDetails(!openDetails)} className={'btn btn-primary section-action'}>
                        {openDetails ? 'close details' : 'open details'}
                    </button>
                </div>

                <div className={'monaco-editor-section'}>

                    {/*<div className={'editor-section'}>*/}
                    {/*    <p>Details:</p>*/}
                    {/*    <button onClick={() => setOpenDetails(!openDetails)} className={'btn btn-primary open-details'}>*/}
                    {/*        {openDetails ? 'close details' : 'open details'}*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    {openDetails ?
                        <div>
                            Image Swiper Details:
                            <MonacoEditor language={'html'}
                                          name={'details'}
                                          defaultValue={uniqueData?.details}
                                          value={uniqueData?.details}
                                          className={'details'}
                                          onParentChangeHandler={onUniqueDataChangeHandler}
                            />
                        </div>
                        : null
                    }
                </div>

            </div>
        );
    };
export default ImagesSliderTypeWidgetModelFields;


