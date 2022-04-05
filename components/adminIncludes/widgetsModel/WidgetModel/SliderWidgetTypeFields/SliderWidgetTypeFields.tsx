import React, {FC, useEffect, useState} from 'react';
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";
import MonacoEditor from "@components/adminIncludes/MonacoEditor/MonacoEditor";
import {sliderDefaultData} from './sliderDefaultData'


interface SliderWidgetTypeFieldsPropTypes {
    uniqueData: {
        details: string,
        swiperConfig:{},
        imageSwiperData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[]
    },
    onUniqueDataChangeHandler: any,
    onUniqueDataJsonChangeHandler: any,
}

const SliderWidgetTypeFields: FC<SliderWidgetTypeFieldsPropTypes> =
    ({
         uniqueData,
         onUniqueDataJsonChangeHandler
     }) => {

        const [openObjectEditor, setOpenObjectEditor] = useState(false)

        const defaultDataInjector = (type)=>{
            if (sliderDefaultData?.[type]){
                const e = {
                    target :{
                        name:'swiperConfig',
                        value: JSON.stringify(sliderDefaultData?.[type])
                    }
                }
                onUniqueDataJsonChangeHandler(e)
            }

        }

        return (
            <div className={'monaco-editor-section'}>
                <h2> Swiper Config: </h2>
                <div className={'editor-section'}>
                    <p>Image Swiper Config:</p>
                    <a href={'https://swiperjs.com/demos'} target={'_blank'}>Examples</a>
                    <button className={'btn btn-primary'} onClick={() => setOpenObjectEditor(!openObjectEditor)}>
                        open
                    </button>
                </div>
                <div className={'editor-section'}>
                    <p>Inject Default Data:</p>
                    <button className={'btn btn-primary'} onClick={() => defaultDataInjector('cube')}>
                        Cube
                    </button>
                    <button className={'btn btn-primary'} onClick={() => defaultDataInjector('fade')}>
                        Fade
                    </button>
                    <button className={'btn btn-primary'} onClick={() => defaultDataInjector('coverflow')}>
                        Coverflow
                    </button>
                    <button className={'btn btn-primary'} onClick={() => defaultDataInjector('flip')}>
                        Flip
                    </button>
                    <button className={'btn btn-primary'} onClick={() => defaultDataInjector('cards')}>
                        Cards
                    </button>
                    <button className={'btn btn-primary'} onClick={() => defaultDataInjector('creative')}>
                        Creative
                    </button>
                </div>


                {openObjectEditor ?
                    <MonacoEditor
                        language={'json'}
                        name={'swiperConfig'}
                        defaultValue={JSON.stringify(uniqueData?.swiperConfig, null, '\t')}
                        value={JSON.stringify(uniqueData?.swiperConfig, null, '\t')}
                        className={'details'}
                        onChange={onUniqueDataJsonChangeHandler}
                    />
                    : null
                }


                {/*<div className={'selectFieldForWidget'}>*/}


                {/*    <p>Effect :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='sliderEffect'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.sliderEffect}*/}
                {/*    >*/}
                {/*        <option value='' >Select</option>*/}
                {/*        <option value='fade'>Fade</option>*/}
                {/*        <option value='coverflow'>Coverflow</option>*/}
                {/*        <option value='flip'>Flip</option>*/}
                {/*        <option value='cube'>Cube</option>*/}
                {/*        <option value='cards'>Cards</option>*/}
                {/*        <option value='creative'>Creative</option>*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/*<div className={'selectFieldForWidget'}>*/}
                {/*    <p>Auto Play :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='sliderAutoplay'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.sliderAutoplay}*/}
                {/*    >*/}
                {/*        <option value='' >Select</option>*/}
                {/*        <option value='false'>Fasle</option>*/}
                {/*        <option value='true'>True</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className={'selectFieldForWidget'}>*/}
                {/*    <p>Navigation :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='navigation'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.navigation}*/}
                {/*    >*/}
                {/*        <option value='' >Select</option>*/}
                {/*        <option value='false'>Fasle</option>*/}
                {/*        <option value='true'>True</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className={'selectFieldForWidget'}>*/}
                {/*    <p>Pagination :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='pagination'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.pagination}*/}
                {/*    >*/}
                {/*        <option value='' >Select</option>*/}
                {/*        <option value='false'>Fasle</option>*/}
                {/*        <option value='true'>True</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className={'selectFieldForWidget'}>*/}
                {/*    <p>Pagination Type :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='paginationType'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.paginationType}*/}
                {/*    >*/}
                {/*        <option value='' >Select</option>*/}
                {/*        <option value='true'>True</option>*/}
                {/*        <option value='fraction'>Fraction</option>*/}
                {/*        <option value='progressbar'>Progressbar</option>*/}
                {/*        <option value='scrollbar'>Scrollbar</option>*/}
                {/*        <option value='vertical'>Vertical</option>*/}
                {/*    </select>*/}
                {/*</div>*/}


                {/*<div className={'selectFieldForWidget'}>*/}
                {/*    <p>Slides Per View :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='slidesPerView'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.slidesPerView}*/}
                {/*    >*/}
                {/*        <option >Select</option>*/}
                {/*        {['auto',1,2,3,4,5,6,7,8,9,10].map(option=>{*/}
                {/*            return (*/}
                {/*                <option value={option}>{option}</option>*/}
                {/*            )*/}
                {/*        })}*/}

                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className={'selectFieldForWidget'}>*/}
                {/*    <p>Centered Slides :</p>*/}
                {/*    <select className={'custom-select'}*/}
                {/*            name='centeredSlides'*/}
                {/*            onChange={onUniqueDataChangeHandler}*/}
                {/*            value={uniqueData?.centeredSlides}*/}
                {/*    >*/}
                {/*        <option value='' >Select</option>*/}
                {/*        <option value='false'>Fasle</option>*/}
                {/*        <option value='true'>True</option>*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/*<TextInputFieldForWidget inputTitle='Speed :'*/}
                {/*                         name='sliderSpeed'*/}
                {/*                         type='number'*/}
                {/*                         value={uniqueData?.sliderSpeed || 1000}*/}
                {/*                         classNameValue='sliderSpeed'*/}
                {/*                         placeHolder='Slider Speed'*/}
                {/*                         onChangeHandler={onUniqueDataChangeHandler}*/}
                {/*                         rendering={true}*/}
                {/*/>*/}
                {/*<TextInputFieldForWidget inputTitle='Space Between :'*/}
                {/*                         name='spaceBetween'*/}
                {/*                         type='number'*/}
                {/*                         value={uniqueData?.spaceBetween || 0}*/}
                {/*                         classNameValue='spaceBetween'*/}
                {/*                         placeHolder='spaceBetween'*/}
                {/*                         onChangeHandler={onUniqueDataChangeHandler}*/}
                {/*                         rendering={true}*/}
                {/*/>*/}


            </div>
        );

    };
export default SliderWidgetTypeFields;
