'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { convertVariableNameToName, capitalizeFirstLetter, inputValueSimplifier } from '@repo/utils';
import { useAppDispatch } from '@storeDashboard/hooks';
import { editInitialSettings } from '@storeDashboard/reducers/settingsReducer';
import { InitialSettings } from '@repo/typescript-types';

interface StyleProps {
    className?: string;
}

const Style = styled.div`
    .actionButtons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .postSettings {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        .postSetting {
            width: 300px;

            .field {
                h3 {
                    padding: 0.25rem;
                    margin: 0;
                }
            }

            .checkboxField {
                grid-template-columns: 1fr 50px;
            }
        }
    }
`;

interface PropTypes {
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, section: string) => void;
    onSaveHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
    initialSettingsData: InitialSettings;
}

const ContentSettings: React.FC<PropTypes> = ({ onChangeHandler, initialSettingsData, onSaveHandler }) => {
    const dispatch = useAppDispatch();
    const [openPostSettings, setOpenPostSettings] = useState(false);
    const postTypes = ['blog', 'news']; // Assuming these are the post types
    const postConfigTypes = [
        'viewSystem',
        'showViewsOnCard',
        'ratingSystem',
        'showRatingOnCard',
        'showDateOnCard',
        'showDateInPostPage',
        'allowComment',
    ];

    const onPostTypeSettingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, postType: string) => {
        const value = inputValueSimplifier(e);
        dispatch(
            editInitialSettings({
                contentSettings: {
                    ...(initialSettingsData?.contentSettings || {}),
                    postSettings: {
                        ...(initialSettingsData?.contentSettings?.postSettings || {}),
                        [postType]: {
                            ...(initialSettingsData?.contentSettings?.postSettings?.[postType] || {}),
                            [e.target.name]: value,
                        },
                    },
                },
            }),
        );
    };

    useEffect(() => {
        console.log(`initialSettingsData=> `, initialSettingsData);
    }, [initialSettingsData]);

    return (
        <Style className={'setting-section'}>
            <div className={'field'}>
                <h2>Content Settings:</h2>
            </div>

            <div className="inputField">
                <p>Cards Width in Desktop:</p>
                <input
                    onChange={e => onChangeHandler(e, 'contentSettings')}
                    name={'cardsWidthDesktop'}
                    value={initialSettingsData?.contentSettings?.cardsWidthDesktop}
                    className={'primaryInput'}
                    type="number"
                />
            </div>
            <div className="inputField">
                <p>Content per page:</p>
                <input
                    onChange={e => onChangeHandler(e, 'contentSettings')}
                    name={'contentPerPage'}
                    value={initialSettingsData?.contentSettings?.contentPerPage}
                    className={'primaryInput'}
                    type="number"
                />
            </div>
            <div className="inputField">
                <p>Number of cards per row In Mobile:</p>
                <input
                    onChange={e => onChangeHandler(e, 'contentSettings')}
                    name={'numberOfCardsPerRowInMobile'}
                    value={initialSettingsData?.contentSettings?.numberOfCardsPerRowInMobile}
                    className={'primaryInput'}
                    type="number"
                />
            </div>
            <div className="field actionButtons">
                <button className="btn btn-dark" onClick={() => setOpenPostSettings(!openPostSettings)}>
                    Post Settings
                    <FontAwesomeIcon icon={openPostSettings ? faChevronUp : faChevronDown} style={{ width: 16, height: 16 }} />
                </button>
                <button className={'btn btn-primary'} onClick={onSaveHandler}>
                    Save
                </button>
            </div>

            <div className="postSettings">
                {openPostSettings &&
                    postTypes.map((postType) => (
                        <div key={postType} className={'postSetting'}>
                            <div className={'field'}>
                                <h3>{capitalizeFirstLetter(postType)}:</h3>
                            </div>

                            {postConfigTypes.map((postTypeSetting) => (
                                <div className={'checkboxField'} key={postTypeSetting}>
                                    <p>{convertVariableNameToName(postTypeSetting)}:</p>
                                    <input
                                        onChange={(e) => onPostTypeSettingChangeHandler(e, postType)}
                                        type={'checkbox'}
                                        name={postTypeSetting}

                                        checked={
                                            // @ts-expect-error: check
                                            initialSettingsData?.contentSettings?.postSettings?.[postType]?.[
                                                postTypeSetting
                                            ]
                                        }
                                        className={'primaryInput'}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </Style>
    );
};

export default ContentSettings;