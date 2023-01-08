// @ts-nocheck
import React, {FC, useState} from 'react';
import MonacoEditor from "@components/common/MonacoEditor";
import {sliderDefaultData} from './swiperDefaultData'
import {convertVariableNameToName} from "custom-util";


interface SliderWidgetTypeFieldsPropTypes {
    uniqueData: {
        details: string,
        swiperConfigMobile: {},
        swiperConfigDesktop: {},
        imageSwiperData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[]
    },
    // onUniqueDataChangeHandler: any,
    onUniqueDataJsonChangeHandler: any,
}

const SwiperWidgetFields: FC<SliderWidgetTypeFieldsPropTypes> =
    ({
         uniqueData,
         onUniqueDataJsonChangeHandler
     }) => {

        const [openObjectEditorDesktop, setOpenObjectEditorDesktop] = useState(false)
        const [openObjectEditorMobile, setOpenObjectEditorMobile] = useState(false)

        const defaultDataInjector = (type, device) => {
            if (sliderDefaultData?.[type]) {
                const e = {
                    target: {
                        name: device,
                        value: JSON.stringify(sliderDefaultData?.[type])
                    }
                }
                onUniqueDataJsonChangeHandler(e)
            }
        }

        const renderInjectorButtonsDesktop = ['cube', 'fade', 'coverflow', 'flip', 'cards', 'creative'].map((type, index) => {
            return (
                <button key={index} className={'btn btn-primary'}
                        onClick={() => defaultDataInjector(type, 'swiperConfigDesktop')}>
                    {convertVariableNameToName(type)}
                </button>
            )
        })

        const renderInjectorButtonsMobile = ['cube', 'fade', 'coverflow', 'flip', 'cards', 'creative'].map((type, index) => {
            return (
                <button key={index} className={'btn btn-primary'}
                        onClick={() => defaultDataInjector(type, 'swiperConfigMobile')}>
                    {convertVariableNameToName(type)}
                </button>
            )
        })


        return (
            <div className={'monaco-editor-section'}>
                <div className={'open-section'}>
                    <p className={'section-title'}>Swiper Config:</p>
                    <a href={'https://swiperjs.com/demos'} target={'_blank'}
                       className={'btn btn-info section-action'}>
                        Examples
                    </a>
                </div>
                <div className={'editor-section'}>
                    <p>Image Swiper Config for Desktop:</p>
                    <button className={'btn btn-primary'}
                            onClick={() => setOpenObjectEditorDesktop(!openObjectEditorDesktop)}>
                        {openObjectEditorDesktop ? 'close' : 'open'}
                    </button>
                </div>

                {openObjectEditorDesktop ?
                    <>
                        <div className={'editor-section'}>
                            <p>Inject Default Data:</p>
                            {renderInjectorButtonsDesktop}
                        </div>
                        <MonacoEditor
                            language={'json'}
                            name={'swiperConfigDesktop'}
                            defaultValue={JSON.stringify(uniqueData?.swiperConfigDesktop, null, '\t')}
                            value={JSON.stringify(uniqueData?.swiperConfigDesktop, null, '\t')}
                            className={'details'}
                            onChange={onUniqueDataJsonChangeHandler}
                        />
                    </>
                    : null
                }

                <div className={'editor-section'}>
                    <p>Image Swiper Config for Mobile:</p>

                    <button className={'btn btn-primary'}
                            onClick={() => setOpenObjectEditorMobile(!openObjectEditorMobile)}>
                        {openObjectEditorMobile ? 'close' : 'open'}
                    </button>
                </div>

                {openObjectEditorMobile ?
                    <>
                        <div className={'editor-section'}>
                            <p>Inject Default Data:</p>
                            {renderInjectorButtonsMobile}
                        </div>
                        <MonacoEditor
                            language={'json'}
                            name={'swiperConfigMobile'}
                            defaultValue={JSON.stringify(uniqueData?.swiperConfigMobile, null, '\t')}
                            value={JSON.stringify(uniqueData?.swiperConfigMobile, null, '\t')}
                            className={'details'}
                            onChange={onUniqueDataJsonChangeHandler}
                        />
                    </>
                    : null
                }


            </div>
        );

    };
export default SwiperWidgetFields;
