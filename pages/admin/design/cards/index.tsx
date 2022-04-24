import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import React, {ChangeEvent} from "react";
import {adminPanelEditDesign} from "@store/adminActions/adminPanelSettingsActions";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'), {ssr: false});

const cards = () => {
    const design = useSelector(({adminPanelSettings}: StoreTypes) => adminPanelSettings?.design)
    const dispatch = useDispatch()

    const onChangeHandler = (event) => {
        dispatch(adminPanelEditDesign({[event.target.name]: event.target.value}))
    }

    return (
        <>
            <div>
                <p>Card Width Desktop:</p>
                <input className={'form-control-input'}
                       type={'number'}
                       name={'cardWidthDesktop'}
                       placeholder={'Card Width Desktop px' }
                       value={design.cardWidthDesktop}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}
                />
            </div>
            <div>
                <p>Posts Per Raw For Mobile:</p>
                <input className={'form-control-input'}
                       type={'number'}
                       name={'postsPerRawForMobile'}
                       placeholder={'Posts Per Raw For Mobile' }
                       value={design.postsPerRawForMobile}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e)}
                />
            </div>
            <div>
                <p>Post Element Image Loader:</p>
                <select name='postElementImageLoader'
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeHandler(e)}
                        value={design.postElementImageLoader}
                        placeholder={'Post Element Image Loader'}
                        className={'custom-select'}
                >
                    <option value='' >Select</option>
                    <option value='normal'>Normal</option>
                    <option value='next'>Next</option>
                </select>
            </div>
            {design.postElementImageLoader === 'next' ?
                <div>
                    <p>Post Element Image Loader Type:</p>
                    <select name='postElementImageLoaderType'
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeHandler(e)}
                            value={design.postElementImageLoaderType}
                    >
                        <option>select</option>
                        <option value='lazy'>Lazy</option>
                        <option value='eager'>Eager</option>
                    </select>
                </div>
                : null
            }

            <StyleSection name='cardsCustomStyle' title='Cards Custom Style:'/>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})


export default cards;
