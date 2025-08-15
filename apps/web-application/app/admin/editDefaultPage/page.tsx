'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { inputValueSimplifier } from '@repo/utils/dist/src';
import LanguagesOptions from '@components/global/LanguagesOptions';
import MonacoEditor from '@components/textEditors/MonacoEditor';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import dashboardUpdateSettings from '@lib/actions/database/settings/dashboardUpdateSettings';
import getSettings from '@lib/actions/database/settings/getSettings';
import { ServerActionResponse } from '@lib/actions/response';
import { setAlert } from '@store/reducers/globalStateReducer';
import { clearACacheByTag } from '@lib/serverActions';

interface PropTypes {}

const EditDefaultPage: React.FC<PropTypes> = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pageName = searchParams.get('pageName');
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
    translations: {},
  };

  const dynamicSettingsPageMatcher = /homePageSettings|postPageSettings/g;
  const [fieldsData, setFieldsData] = useState(defaultPageData);

  const getPageSettings = async () => {
    if (pageName) {
      const { success, data, message, error } = (await getSettings([pageName])) as ServerActionResponse<{
        [key: string]: object;
      }>;

      if (!success) {
        dispatch(setAlert({ message, type: 'error', active: true }));
        return;
      }

      const settingData = data?.[pageName] || defaultPageData;

      // @ts-expect-error: it's fine
      setFieldsData(settingData || {});
    }
  };

  useEffect(() => {
    getPageSettings();
  }, [searchParams, pageName]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFieldsData((prevState) => ({
      ...prevState,
      [e.target.name]: inputValueSimplifier(e),
    }));
  };

  const onChangeHandlerWithTranslation = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
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
            [e.target.name]: inputValueSimplifier(e),
          },
        },
      });
    }
  };

  const onSaveHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (pageName) {
        const { success, error, message } = await dashboardUpdateSettings({ type: pageName, data: fieldsData });
        if (!success) {
          dispatch(setAlert({ message, type: 'error', active: true, error }));
          return;
        }
        await clearACacheByTag(`CSetting-${pageName}`);
      }
    } catch (error) {
      dispatch(setAlert({ type: 'error', active: true, error }));
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
      <select
        name="activeEditingLanguage"
        className={'primarySelect active-editing-language'}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="default">{process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'default'}</option>
        <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
      </select>
      <p>Sidebar</p>
      {/*//@ts-ignore*/}
      <select
        name="sidebar"
        className={'primarySelect'}
        onChange={onChangeHandler}
        //@ts-ignore
        value={fieldsData?.sidebar || 'no'}
      >
        <option value={'both'}>Both</option>
        <option value={'left'}>Left</option>
        <option value={'right'}>Right</option>
        <option value={'no'}>No</option>
      </select>

      {!dynamicSettingsPageMatcher.test(pageName as string) && (
        <>
          <div className="form-field">
            <p>Title:</p>
            <input
              className={'primaryInput'}
              type="text"
              onChange={(e) => onChangeHandlerWithTranslation(e)}
              //@ts-ignore
              value={language === 'default' ? fieldsData.title : fieldsData?.translations?.[language]?.title || {}}
              name={'title'}
              placeholder={'Title'}
            />
          </div>
          <div className="form-field">
            <p>Description:</p>
            <textarea
              className={'primaryInput'}
              onChange={(e) => onChangeHandlerWithTranslation(e)}
              //@ts-ignore
              value={language === 'default' ? fieldsData.description : fieldsData?.translations?.[language]?.description || ''}
              name={'description'}
              placeholder={'Description'}
            />
          </div>
          <div className="form-field">
            <p>Keywords:</p>
            <input
              className={'primaryInput'}
              type="text"
              onChange={(e) => onChangeHandlerWithTranslation(e)}
              // @ts-expect-error: it's fine
              value={language === 'default' ? fieldsData.keywords : fieldsData?.translations?.[language]?.keywords || ''}
              name={'keywords'}
              placeholder={'Keywords'}
            />
          </div>
        </>
      )}

      <button className={'btn btn-primary'} type={'button'} onClick={() => setHeadEditor(!headEditor)}>
        Head Editor
      </button>
      {headEditor && (
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
      )}

      <div className="form-field">
        <button className={'btn btn-primary'} type={'submit'}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditDefaultPage;
