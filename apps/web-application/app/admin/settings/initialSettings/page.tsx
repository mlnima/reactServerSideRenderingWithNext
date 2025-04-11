'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@storeDashboard/hooks';

import ContentSettings from './components/ContentSettings';
import HeadDataSettings from './components/HeadDataSettings';
import MembershipSettings from './components/MembershipSettings';
import LayoutSettings from './components/layoutSettings';
import { useAppDispatch } from '@storeDashboard/hooks';
import { editInitialSettings, updateSettingAction } from '@storeDashboard/reducers/settingsReducer';
import { inputValueSimplifier } from '@repo/utils';
import { LanguagesOptions } from '@repo/ui';
import './styles.scss';

interface PropTypes {
}

const InitialSettingsPage: FC<PropTypes> = () => {
  const initialSettingsData = useAppSelector(({ settings }) => settings.initialSettings);
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState('default');

  const onSaveHandler = () => {
    dispatch(updateSettingAction({ type: 'initialSettings', data: initialSettingsData }));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | object>, key: string) => {
    const value = inputValueSimplifier(e);
    dispatch(
      editInitialSettings({
        [key]: {
          ...(initialSettingsData?.[key] || {}),
          // @ts-expect-error: need fix
          [e.target.name]: value,
        },
      }),
    );
  };

  const onJsonChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    dispatch(
      editInitialSettings({
        [key]: {
          ...(initialSettingsData?.[key] || {}),
          [e.target.name]: JSON.parse(e.target.value),
        },
      }),
    );
  };

  const onChangeHandlerWithTranslation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | object>, key: string) => {
    if (language === 'default') {
      onChangeHandler(e, key);
    } else {
      dispatch(
        editInitialSettings({
          [key]: {
            ...(initialSettingsData?.[key] || {}),
            translations: {
              ...(initialSettingsData?.[key]?.translations || {}),
              [language]: {
                ...(initialSettingsData?.[key]?.translations?.[language] || {}),
                // @ts-expect-error: need fix
                [e.target.name]: inputValueSimplifier(e),
              },
            },
          },
        }),
      );
    }
  };

  useEffect(() => {
    console.log('initialSettingsData=> ', initialSettingsData);
  }, [initialSettingsData]);

  return (
    <div className={'InitialSettingsPage'}>
      <h1>Initial Settings</h1>
      <select
        name="activeEditingLanguage"
        className={'primarySelect active-editing-language'}
        onChange={e => setLanguage(e.target.value)}
      >
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
          onSaveHandler={onSaveHandler}
        />
        <MembershipSettings onChangeHandler={onChangeHandler} initialSettingsData={initialSettingsData} />
      </div>
      <button className={'btn btn-primary'} onClick={onSaveHandler}>
        Save
      </button>
    </div>
  );
};

export default InitialSettingsPage;