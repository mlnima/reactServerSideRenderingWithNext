'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetter, convertVariableNameToName, inputValueSimplifier } from '@repo/utils';
import { IInitialSettings } from '@repo/typescript-types';
import { postTypes } from "@repo/data-structures";
import './ContentSettings.scss';

interface PropTypes {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, section: string) => void;
  onSaveHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  initialSettingsData: IInitialSettings | null;
  setInitialSettingsData: React.Dispatch<React.SetStateAction<IInitialSettings | null>>;
}

const ContentSettings: React.FC<PropTypes> = (
  {
    onChangeHandler,
    initialSettingsData,
    onSaveHandler,
    setInitialSettingsData,
  }) => {

  const [openPostSettings, setOpenPostSettings] = useState(false);
  const postConfigTypes = [
    'viewSystem',
    'showViewsOnCard',
    'ratingSystem',
    // 'showRatingOnCard',
    'showDateOnCard',
    'showDateInPostPage',
    'allowComment',
  ];

  const onPostTypeSettingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, postType: string) => {
    const value = inputValueSimplifier(e);

    setInitialSettingsData((prevState: IInitialSettings | null) => {
      if (!prevState || !prevState.contentSettings?.postSettings) return prevState;

      // Ensure the structure exists before accessing it
      const updatedPostSettings = {
        ...prevState.contentSettings.postSettings,
        [postType]: {
          ...(prevState.contentSettings.postSettings[postType] || {}),
          [e.target.name as keyof typeof postConfigTypes[number]]: value,
        },
      };

      return {
        ...prevState,
        contentSettings: {
          ...prevState.contentSettings,
          postSettings: updatedPostSettings,
        },
      };
    });
  };

  useEffect(() => {
    console.log(`initialSettingsData=> `, initialSettingsData);
  }, [initialSettingsData]);

  return (
    <div className={'setting-section ContentSettings'}>
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
                      // @ts-expect-error: its fine
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
    </div>
  );
};

export default ContentSettings;


// dispatch(
//   editInitialSettings({
//     contentSettings: {
//       ...(initialSettingsData?.contentSettings || {}),
//       postSettings: {
//         ...(initialSettingsData?.contentSettings?.postSettings || {}),
//         [postType]: {
//           ...(initialSettingsData?.contentSettings?.postSettings?.[postType] || {}),
//           [e.target.name]: value,
//         },
//       },
//     },
//   }),
// );