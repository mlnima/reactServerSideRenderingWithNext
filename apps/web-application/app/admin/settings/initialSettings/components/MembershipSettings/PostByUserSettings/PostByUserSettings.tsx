'use client';

import React from 'react';
import { postTypes } from '@repo/data-structures';
import { inputValueSimplifier } from '@repo/utils';
import { IInitialSettings } from '@repo/typescript-types';
import './PostByUserSettings.scss'

interface PropTypes {
  initialSettingsData: IInitialSettings;
  setInitialSettingsData: React.Dispatch<React.SetStateAction<IInitialSettings | null>>;
}

const PostByUserSettings: React.FC<PropTypes> = ({ setInitialSettingsData, initialSettingsData }) => {

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, postType: string) => {
    const value = inputValueSimplifier(e);


    setInitialSettingsData((prevState: IInitialSettings | null) => {
      if (!prevState || !prevState.membershipSettings?.postByUserSettings) return prevState;
      return {
        ...prevState,
        membershipSettings: {
          ...(prevState?.membershipSettings || {}),
          postByUserSettings: {
            ...(prevState?.membershipSettings?.postByUserSettings || {}),
            [postType]: {
              ...(prevState?.membershipSettings?.postByUserSettings?.[postType] || {}),
              [e.target.name]: value,
            },
          },
        },
      }
    });
  };

  return (
    <div className={'checkboxFieldVertical field PostByUserSettings'}>
      <div className={'field'}>
        <p>Allowed Post Type By User:</p>
      </div>

      <div className={'checkboxFieldItems'}>
        {postTypes.map(postType => {
          return (
            <div className={'checkboxFieldItem'} key={postType}>
              <div className={'checkboxFieldItemSection'}>
                <p>{postType} :</p>
              </div>
              <div className={'checkboxFieldItemSection'}>
                <p>Allow</p>
                <input
                  onChange={e => onChangeHandler(e, postType)}
                  type={'checkbox'}
                  name={'allow'}
                  checked={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.allow}
                  className={'primaryInput'}
                />
              </div>

              <div className={'checkboxFieldItemSection'}>
                <p>Maximum Categories</p>
                <input
                  onChange={e => onChangeHandler(e, postType)}
                  type={'number'}
                  name={'maxCategories'}
                  value={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.maxCategories}
                  className={'primaryInput'}
                />
              </div>

              <div className={'checkboxFieldItemSection'}>
                <p>Maximum Tags</p>
                <input
                  onChange={e => onChangeHandler(e, postType)}
                  type={'number'}
                  name={'maxTags'}
                  value={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.maxTags}
                  className={'primaryInput'}
                />
              </div>

              {postType === 'video' && (
                <div className={'checkboxFieldItemSection'}>
                  <p>Maximum Actors</p>
                  <input
                    onChange={e => onChangeHandler(e, postType)}
                    type={'number'}
                    name={'maxActors'}
                    value={initialSettingsData?.membershipSettings?.postByUserSettings?.[postType]?.maxActors}
                    className={'primaryInput'}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostByUserSettings;