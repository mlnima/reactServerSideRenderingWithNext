// @ts-nocheck
import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@store/hooks';
import { editInitialSettings } from '@store/reducers/settingsReducer';
import { postTypes } from '@repo/data-structures';
import { useSelector } from 'react-redux';
import { DashboardStore } from 'typescript-types';
import { inputValueSimplifier } from '@repo/shared-util';

const Style = styled.div`
    display: flex;
    flex-direction: column;

    .checkboxFieldItems {
        width: 100%;
        display: flex;
        flex-direction: column;
        //align-items: center;
        justify-content: space-between;
        gap: 1rem;

        .checkboxFieldItem {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            //justify-content: space-between;
            align-items: center;
          
            .checkboxFieldItemSection{
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-direction: column;
              gap: .5rem;
              align-content: flex-start;
              height: 100%;
              p{
                //text-align: center;
                place-items: flex-start;
             
            
              }
              input{
                max-width: 4rem;
              }
            }

        }
    }
`;

interface PropTypes {}

const PostByUserSettings: FC<PropTypes> = ({}) => {
    const dispatch = useAppDispatch();
    const initialSettingsData = useSelector(({ settings }: DashboardStore) => settings.initialSettings);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, postType: string) => {
        const value = inputValueSimplifier(e);
        //@ts-ignore

        dispatch(
            editInitialSettings({
                membershipSettings: {
                    //@ts-ignore
                    ...(initialSettingsData?.membershipSettings || {}),
                    postByUserSettings: {
                        ...(initialSettingsData?.membershipSettings?.postByUserSettings || {}),
                        [postType]: {
                            ...(initialSettingsData?.membershipSettings?.postByUserSettings?.[postType] || {}),
                            [e.target.name]: value,
                        },
                    },
                },
            }),
        );
    };

    return (
        <Style className={'checkboxFieldVertical field'}>
            <div className={'field'}>
                <p>Allowed Post Type By User:</p>
            </div>


            <div className={'checkboxFieldItems'}>
                {postTypes.map(postType => {
                    return (
                        <div className={'checkboxFieldItem'}>
                            <div className={'checkboxFieldItemSection'}>
                            <p> {postType} :</p>
                            </div>
                            <div className={'checkboxFieldItemSection'}>
                                <p> Allow</p>
                                <input
                                    key={postType}
                                    onChange={e => onChangeHandler(e, postType)}
                                    type={'checkbox'}
                                    name={'allow'}
                                    checked={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.allow}
                                    className={'primaryInput'}
                                />
                            </div>

                            <div className={'checkboxFieldItemSection'}>
                                <p> Maximum Categories</p>
                                <input
                                    key={postType}
                                    onChange={e => onChangeHandler(e, postType)}
                                    type={'number'}
                                    name={'maxCategories'}
                                    value={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.maxCategories}
                                    className={'primaryInput'}
                                />
                            </div>

                            <div className={'checkboxFieldItemSection'}>
                                <p> Maximum Tags</p>
                                <input
                                    key={postType}
                                    onChange={e => onChangeHandler(e, postType)}
                                    type={'number'}
                                    name={'maxTags'}
                                    value={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.maxTags}
                                    className={'primaryInput'}
                                />
                            </div>

                            {postType ==='video' &&

                                <div className={'checkboxFieldItemSection'}>
                                    <p> Maximum Actors</p>
                                    <input
                                        key={postType}
                                        onChange={e => onChangeHandler(e, postType)}
                                        type={'number'}
                                        name={'maxActors'}
                                        value={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.maxActors}
                                        className={'primaryInput'}
                                    />
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        </Style>
    );
};
export default PostByUserSettings;
