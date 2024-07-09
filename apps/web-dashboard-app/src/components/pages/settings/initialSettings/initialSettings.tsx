import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DashboardStore } from 'typescript-types';
import PostCardsSettings from '@components/pages/settings/initialSettings/PostCardsSettings';
import HeadDataSettings from '@components/pages/settings/initialSettings/HeadDataSettings';
import MembershipSettings from '@components/pages/settings/initialSettings/MembershipSettings';
import LayoutSettings from '@components/pages/settings/initialSettings/layoutSettings';
import { useAppDispatch } from '@store/hooks';
import {editInitialSettings, updateSettingAction} from '@store/reducers/settingsReducer';
import { inputValueSimplifier } from '@repo/shared-util';
import { LanguagesOptions } from '@repo/ui';
import PostByUserSettings from "@components/pages/settings/initialSettings/PostByUserSettings";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  .active-editing-language {
    width: 100px;
  }

  .setting-sections {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 8px;

    .setting-section {
      width: 100%;
      max-width: 1300px;
      border-radius: 5px;
      background-color: var(--secondary-background-color, #181818);
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input,
      textarea {
        max-width: 600px;
      }

      .checkbox-field {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
      }
      
    }
  }
`;

interface PropTypes {}

const initialSettings: FC<PropTypes> = ({}) => {
    const initialSettingsData = useSelector(({ settings }: DashboardStore) => settings.initialSettings);
    const dispatch = useAppDispatch();
    const [language, setLanguage] = useState('default');

    const onSaveHandler = () => {
        dispatch(updateSettingAction({ type: 'initialSettings', data: initialSettingsData }));
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = inputValueSimplifier(e);
        dispatch(
            editInitialSettings({
                [key]: {
                    //@ts-ignore
                    ...(initialSettingsData?.[key] || {}),
                    [e.target.name]: value,
                },
            }),
        );
    };

    const onJsonChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        dispatch(
            editInitialSettings({
                [key]: {
                    //@ts-ignore
                    ...(initialSettingsData?.[key] || {}),
                    [e.target.name]: JSON.parse(e.target.value),
                },
            }),
        );
    };

    const onChangeHandlerWithTranslation = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (language === 'default') {
            onChangeHandler(e, key);
        } else {
            dispatch(
                editInitialSettings({
                    [key]: {
                        //@ts-ignore
                        ...(initialSettingsData?.[key] || {}),
                        translations: {
                            //@ts-ignore
                            ...(initialSettingsData?.[key]?.translations || {}),
                            [language]: {
                                //@ts-ignore
                                ...(initialSettingsData?.[key]?.translations?.[language] || {}),
                                [e.target.name]: inputValueSimplifier(e),
                            },
                        },
                    },
                }),
            );
        }
    };

    return (
        <Style>
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

                <PostCardsSettings
                    onChangeHandler={onChangeHandler}
                    onJsonChangeHandler={onJsonChangeHandler}
                    initialSettingsData={initialSettingsData}
                />
                <MembershipSettings
                    onChangeHandler={onChangeHandler}
                    initialSettingsData={initialSettingsData}
                />
            </div>
            <button className={'btn btn-primary'} onClick={onSaveHandler}>
                Save
            </button>
        </Style>
    );
};
export default initialSettings;
