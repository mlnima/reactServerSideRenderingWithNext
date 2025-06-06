//InitialSettingsPageWrapper
'use client';
import React, { FC, useEffect, useState } from 'react';
import ContentSettings from './ContentSettings/ContentSettings';
import HeadDataSettings from './HeadDataSettings';
import MembershipSettings from './MembershipSettings/MembershipSettings';
import LayoutSettings from './layoutSettings';
import { useAppDispatch } from '@store/hooks';
import { inputValueSimplifier } from '@repo/utils';
import LanguagesOptions from '@components/global/LanguagesOptions';
import { IInitialSettings } from '@repo/typescript-types';
import dashboardUpdateSettings from '@lib/actions/database/settings/dashboardUpdateSettings';
import { setAlert } from '@store/reducers/globalStateReducer';
import { clearACacheByTag } from '@lib/serverActions';
import KeyboardHandler from '@components/global/KeyboardHandler';

interface PropTypes {
  initialSettings?: IInitialSettings;
}

const InitialSettingsPageWrapper: FC<PropTypes> = ({ initialSettings }) => {

  const [initialSettingsData, setInitialSettingsData] = useState<IInitialSettings | null>(null);

  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState('default');


  useEffect(() => {
    if (initialSettings) {
      setInitialSettingsData(initialSettings);
    }
  }, [initialSettings]);

  useEffect(() => {
    console.log(`initialSettings=> `,initialSettings);
  }, [initialSettings]);


  const onSaveHandler = async () => {

    const { success, error, message } = await dashboardUpdateSettings({
      type: 'initialSettings',
      data: initialSettingsData,
    });

    dispatch(
      setAlert({
        message,
        type: !success ?  'Error' : 'Success',
        err: error || null,
      }),
    );
    await clearACacheByTag('CSettings-initialSettings')
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {
    name: string
  }>, key: string) => {
    const value = inputValueSimplifier(e);
    if (!e.target?.name) return;
    // @ts-expect-error: it's fine
    setInitialSettingsData((prevState) => ({
      ...prevState,
      [key]: {
        // @ts-expect-error: it's fine
        ...(prevState?.[key] || {}),
        [e.target.name]: value,
      },
    }));

  };

  const onJsonChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    // @ts-expect-error: it's fine
    setInitialSettingsData((prevState) => ({
      ...prevState,
      [key]: {
        // @ts-expect-error: it's fine
        ...(prevState?.[key] || {}),
        [e.target.name]: JSON.parse(e.target.value),
      },
    }));
  };

  const onChangeHandlerWithTranslation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {
    name: string
  }>, key: string) => {
    if (language === 'default') {
      onChangeHandler(e, key);
    } else {
      // @ts-expect-error: it's fine
      setInitialSettingsData((prevState) => ({
        ...prevState,
        [key]: {
          // @ts-expect-error: it's fine
          ...(prevState?.[key] || {}),
          translations: {
            // @ts-expect-error: it's fine
            ...(prevState?.[key]?.translations || {}),
            [language]: {
              // @ts-expect-error: it's fine
              ...(prevState?.[key]?.translations?.[language] || {}),
              [e.target.name]: inputValueSimplifier(e),
            },
          },
        },
      }));
    }
  };


  if (!initialSettingsData) return null;

  return (
    <div className={'InitialSettingsPage'}>
      <h1>Initial Settings</h1>
      <select
        name="activeEditingLanguage"
        className={'primarySelect active-editing-language'}
        onChange={e => setLanguage(e.target.value)}>
        <option value="default">{process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'default'}</option>
        <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
      </select>
      <div className={'setting-sections'}>
        <HeadDataSettings
          onChangeHandler={onChangeHandler}
          initialSettingsData={initialSettingsData}
          language={language}
          onChangeHandlerWithTranslation={onChangeHandlerWithTranslation}
        />
        <LayoutSettings onChangeHandler={onChangeHandler} initialSettingsData={initialSettingsData} />

        <ContentSettings
          onChangeHandler={onChangeHandler}
          initialSettingsData={initialSettingsData}
          setInitialSettingsData={setInitialSettingsData}
          onSaveHandler={onSaveHandler}
        />
        <MembershipSettings onChangeHandler={onChangeHandler} initialSettingsData={initialSettingsData}
                            setInitialSettingsData={setInitialSettingsData} />
      </div>
      <button className={'btn btn-primary'} onClick={onSaveHandler}>
        Save
      </button>
      <KeyboardHandler shortcuts={[{
        keys: ['s'],
        ctrlKey: true,
        callback: onSaveHandler
      }]} />
    </div>
  );
};

export default InitialSettingsPageWrapper;