import React, {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import inputValueSimplifier from "custom-util/src/inputsUtils/inputValueSimplifier";
import languagesOptions from "@variables/languagesOptions";
import {updateSettingAction} from "@store/reducers/settingsReducer";
import MonacoEditor from "@components/common/MonacoEditor";
import { useSearchParams} from "react-router-dom";
import {useAppDispatch} from "@store/hooks";
import {dashboardAPIRequestGetSettings} from "api-requests";

const Style = styled.form`

  padding: 0;
  margin: 0;

  .form-field {


  }

  .editors {
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    .editor-wrapper {
      width: 100%;
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: 50vw;
    .editors {


      .editor-wrapper {
        width: 50%;
      }
    }
  }
`;

interface PropTypes {
}

const DefaultPageSettings: FC<PropTypes> = ({}) => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useSearchParams();
    const pageName = useMemo(() => search.get('pageName'), [search])
    const [openStyleEditor, setOpenStyleEditor] = useState(false);
    const [language, setLanguage] = useState('default')
    const defaultPageData = {
        pageName: '',
        title: '',
        description: '',
        keywords: '',
        sidebar: false,
        themeColor: '',
        customScriptsAsString: '',
        customStyles: '',
        translations: {}
    }
    const dynamicSettingsPageMatcher = /homePageSettings|postPageSettings/g
    const [fieldsData, setFieldsData] = useState(defaultPageData)

    useEffect(() => {
        if (!!pageName) {
            dashboardAPIRequestGetSettings([pageName]).then(response => {
                const settingData = response?.data?.settings?.[pageName]?.data || defaultPageData
                setFieldsData(settingData||{})

            })
        }
    }, [search, pageName]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setFieldsData(prevState => ({
            ...prevState,
            [e.target.name]: inputValueSimplifier(e)
        }))
    }

    const onChangeHandlerWithTranslation = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        if (language === 'default') {
            onChangeHandler(e)
        } else {
            setFieldsData({
                ...fieldsData,
                translations: {
                    ...(fieldsData?.translations || {}),
                    [language]: {
                        //@ts-ignore
                        ...(fieldsData?.translations?.[language] || {}),
                        [e.target.name]: inputValueSimplifier(e)
                    }
                }
            })
        }
    }

    const onSaveHandler = (e: any) => {
        e.preventDefault()
        if (pageName) {
            dispatch(updateSettingAction({type: pageName, data: fieldsData}))
        }
    }

    return (
        <Style className={'form-default'} onSubmit={onSaveHandler}>
            <h1>{pageName}:</h1>
            <select name='activeEditingLanguage' className={'custom-select active-editing-language'}
                    onChange={e => setLanguage(e.target.value)}>
                <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?? 'default'}</option>
                {languagesOptions}
            </select>
            <div className="form-field">
                <button className={'btn btn-primary'} type={'submit'}>
                    Save
                </button>
            </div>

            {!dynamicSettingsPageMatcher.test(pageName as string)&& <>

                <div className="form-field">
                    <p>Title:</p>
                    <input className={'form-control-input'}
                           type="text" onChange={(e) => onChangeHandlerWithTranslation(e)}
                        //@ts-ignore
                           value={language === 'default' ? fieldsData.title : fieldsData?.translations?.[language]?.title || {} }
                           name={'title'}
                           placeholder={'Title'}/>
                </div>
                <div className="form-field">
                    <p>Description:</p>
                    <textarea className={'form-control-input'}
                              onChange={(e) => onChangeHandlerWithTranslation(e)}
                        //@ts-ignore
                              value={language === 'default' ? fieldsData.description : fieldsData?.translations?.[language]?.description || ''}
                              name={'description'}
                              placeholder={'Description'}/>
                </div>
                <div className="form-field">
                    <p>Keywords:</p>
                    <input className={'form-control-input'}
                           type="text" onChange={(e) => onChangeHandlerWithTranslation(e)}
                        //@ts-ignore
                           value={language === 'default' ? fieldsData.keywords : fieldsData?.translations?.[language]?.keywords || ''}
                           name={'keywords'}
                           placeholder={'Keywords'}/>
                </div>



                </>}


            <div className={'editors'}>
                <div className={'editor-wrapper'}>
                    <p> Custom Styles:</p>
                    <MonacoEditor
                        language={'scss'}
                        name={'customStyles'}
                        defaultValue={fieldsData?.customStyles || ''}
                        value={fieldsData?.customStyles || ''}
                        className={'initialSettings-editor'}
                        onChange={(e: any) => onChangeHandler(e)}
                        height={'60vh'}
                        width={'100%'}
                    />
                </div>
                <div className={'editor-wrapper'}>
                    <p>Custom Head Tags:</p>
                    <MonacoEditor
                        language={'html'}
                        name={'customHeadTags'}
                        defaultValue={fieldsData?.customScriptsAsString || ''}
                        value={fieldsData?.customScriptsAsString || ''}
                        className={'initialSettings-editor'}
                        //@ts-ignore
                        onChange={(e: any) => onChangeHandler(e)}
                        height={'60vh'}
                        width={'100%'}
                    />
                </div>
            </div>


            <div className="form-field">
                <button className={'btn btn-primary'} type={'submit'}>
                    Save
                </button>
            </div>


        </Style>
    )
};
export default DefaultPageSettings;