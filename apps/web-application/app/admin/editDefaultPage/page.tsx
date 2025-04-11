'use client';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { inputValueSimplifier } from "@repo/utils";
import { LanguagesOptions } from "@repo/ui";
import { updateSettingAction } from "@storeDashboard/reducers/settingsReducer";
import MonacoEditor from "@components/textEditors/MonacoEditor";
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@storeDashboard/hooks";
import { dashboardAPIRequestGetSettings } from "@repo/api-requests";
import './styles.scss'



interface PropTypes {}

const EditDefaultPage: React.FC<PropTypes> = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pageName = useMemo(() => searchParams.get('pageName'), [searchParams]);
  const [openStyleEditor, setOpenStyleEditor] = useState(false);
  const [language, setLanguage] = useState('default');
  const [headEditor, setHeadEditor] = useState(false);

  const defaultPageData = {
    pageName: '',
    title: '',
    description: '',
    keywords: '',
    sidebar: false,
    themeColor: '',
    customScriptsAsString: '',
    translations: {}
  };

  const dynamicSettingsPageMatcher = /homePageSettings|postPageSettings/g;
  const [fieldsData, setFieldsData] = useState(defaultPageData);

  useEffect(() => {
    if (pageName) {
      dashboardAPIRequestGetSettings([pageName]).then((response: { data: any }) => {
        const settingData = response?.data?.settings?.[pageName]?.data || defaultPageData;
        setFieldsData(settingData || {});
      });
    }
  }, [searchParams, pageName]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFieldsData(prevState => ({
      ...prevState,
      [e.target.name]: inputValueSimplifier(e)
    }));
  };

  const onChangeHandlerWithTranslation = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (language === 'default') {
      onChangeHandler(e);
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
      });
    }
  };

  const onSaveHandler = (e: any) => {
    e.preventDefault();
    if (pageName) {
      dispatch(updateSettingAction({ type: pageName, data: fieldsData }));
    }
  };

  return (
    <form className={'EditDefaultPage'} onSubmit={onSaveHandler}>
      <h1>{pageName}:</h1>
      <div className="form-field">
        <button className={'btn btn-primary'} type={'submit'}>
          Save
        </button>
      </div>
      <p>Editing language</p>
      <select name='activeEditingLanguage' className={'primarySelect active-editing-language'}
              onChange={e => setLanguage(e.target.value)}>
        <option value='default'>{process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'default'}</option>
        <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
      </select>
      <p>Sidebar</p>
      {/*//@ts-ignore*/}
      <select name="sidebar" className={'primarySelect'} onChange={onChangeHandler}
              //@ts-ignore
              value={fieldsData?.sidebar || 'no'}>
        <option value={'both'}>Both</option>
        <option value={'left'}>Left</option>
        <option value={'right'}>Right</option>
        <option value={'no'}>No</option>
      </select>

      {!dynamicSettingsPageMatcher.test(pageName as string) && <>
        <div className="form-field">
          <p>Title:</p>
          <input className={'primaryInput'}
                 type="text" onChange={(e) => onChangeHandlerWithTranslation(e)}
                 //@ts-ignore
                 value={language === 'default' ? fieldsData.title : fieldsData?.translations?.[language]?.title || {}}
                 name={'title'}
                 placeholder={'Title'} />
        </div>
        <div className="form-field">
          <p>Description:</p>
          <textarea className={'primaryInput'}
                    onChange={(e) => onChangeHandlerWithTranslation(e)}
                    //@ts-ignore
                    value={language === 'default' ? fieldsData.description : fieldsData?.translations?.[language]?.description || ''}
                    name={'description'}
                    placeholder={'Description'} />
        </div>
        <div className="form-field">
          <p>Keywords:</p>
          <input className={'primaryInput'}
                 type="text" onChange={(e) => onChangeHandlerWithTranslation(e)}
                 //@ts-ignore
                 value={language === 'default' ? fieldsData.keywords : fieldsData?.translations?.[language]?.keywords || ''}
                 name={'keywords'}
                 placeholder={'Keywords'} />
        </div>
      </>}

      <button className={'btn btn-primary'} type={'button'} onClick={() => setHeadEditor(!headEditor)}>
        Head Editor
      </button>
      {headEditor &&
        <div className={'editors'}>
          <div className={'editor-wrapper'}>
            <p>Custom Head Tags:</p>
            <MonacoEditor
              language={'html'}
              name={'customHeadTags'}
              defaultValue={fieldsData?.customScriptsAsString || ''}
              value={fieldsData?.customScriptsAsString || ''}
              className={'initialSettings-editor'}
              //@ts-ignore
              onParentChangeHandler={(e: any) => onChangeHandler(e)}
              height={'60vh'}
              width={'100%'}
            />
          </div>
        </div>
      }

      <div className="form-field">
        <button className={'btn btn-primary'} type={'submit'}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditDefaultPage;