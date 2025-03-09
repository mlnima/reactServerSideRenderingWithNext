'use client';

import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DashboardStore } from "@repo/typescript-types";
import ContentSettings from './components/ContentSettings';
import HeadDataSettings from './components/HeadDataSettings';
import MembershipSettings from './components/MembershipSettings';
import LayoutSettings from './components/layoutSettings';
import { useAppDispatch } from '@storeDashboard/hooks';
import { editInitialSettings, updateSettingAction } from '@storeDashboard/reducers/settingsReducer';
import { inputValueSimplifier } from '@repo/utils';
import { LanguagesOptions } from '@repo/ui';

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
    gap: 1rem;

    .setting-section {
      width: 100%;
      max-width: 1300px;
      border-radius: 5px;
      padding: .25rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: var(--tertiary-background-color);

      p {
        place-items: flex-start;
        margin: 0;
      }

      input,
      textarea {
        max-width: 600px;
      }
      .checkboxField,.inputField,.field{
        padding: .5rem 1rem  ;
        box-sizing: border-box;
        &:nth-child(even) {
          background-color: var(--secondary-background-color);
        }
        &:nth-child(even) {
          background-color: var(--secondary-background-color);
        }
      }

      .checkboxField {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;

      }

      .inputField {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;

      }

    }
  }
`;

interface PropTypes {}

const Page: FC<PropTypes> = () => {
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
                        ...(initialSettingsData?.[key] || {}),
                        translations: {
                            ...(initialSettingsData?.[key]?.translations || {}),
                            [language]: {
                                ...(initialSettingsData?.[key]?.translations?.[language] || {}),
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
        </Style>
    );
};

export default Page;