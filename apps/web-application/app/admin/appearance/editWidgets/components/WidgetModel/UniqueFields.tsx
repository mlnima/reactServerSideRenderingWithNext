import React, { ChangeEventHandler, FC } from 'react';
// import dynamic from "next/dynamic";
import {advertiseType, postTypes,advertisePlaceType} from '@repo/data-structures';
import {  WidgetSettingsPropTypes } from "@repo/typescript-types";
import SearchTypeInputFields from './SearchTypeInputFields/SearchTypeInputFields';
import MultipleLinkWidgetModelFields from './MultipleLinkWidgetModelFields/MultipleLinkWidgetModelFields';
import SelectFieldForWidget from './SelectFieldForWidget/SelectFieldForWidget';
import LogoTypeWidgetModelFields from './LogoTypeWidgetModelFields/LogoTypeWidgetModelFields';
import DayModeNightModeFields from './DayModeNightModeFields/DayModeNightModeFields';
import FormTypeWidgetModelFields from './FormTypeWidgetModelFields/FormTypeWidgetModelFields';
import MenuWidgetModelFields from './MenuWidgetModelFields/MenuWidgetModelFields';
import LinkTypeWidgetModelFields from './LinkTypeWidgetModelFields/LinkTypeWidgetModelFields';
import MediaWidgetType from './MediaWidgetType/MediaWidgetType';
import TextInputFieldForWidget from './TextInputFieldForWidget/TextInputFieldForWidget';
import AdvertiseWidgetModelFields from './AdvertiseWidgetModelFields';
import ImagesSliderTypeWidgetModelFields from './ImagesSliderTypeWidgetModelFields/ImagesSliderTypeWidgetModelFields';
import SliderWidgetFields from './SliderWidgetFields/SliderWidgetFields';
import UserPreferenceConfigModelFields from './UserPreferenceConfigModelFields/UserPreferenceConfigModelFields';
import MonacoEditor from '@components/textEditors/MonacoEditor';

interface UniqueFieldsPropTypes {
    widgetData: any;
    widgetSettings: WidgetSettingsPropTypes;
    setWidgetSettings: any;
    onChangeHandlerWithTranslate: any;
    onUniqueDataJsonChangeHandler: any;
    onCheckboxChangeHandler: any;
    widgetId: string;
    setWidgetData: React.Dispatch<React.SetStateAction<any>>;
    onChangeHandler: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    onUniqueDataChangeHandler: ChangeEventHandler<HTMLInputElement>;
    onUniqueDataChangeHandlerWithTranslate: ChangeEventHandler<HTMLInputElement>;
}

const UniqueFields: FC<UniqueFieldsPropTypes> = ({
    widgetData,
    widgetSettings,
    setWidgetData,
    onChangeHandler,
    onUniqueDataChangeHandler,
    onChangeHandlerWithTranslate,
    onUniqueDataJsonChangeHandler,
    onCheckboxChangeHandler,
    onUniqueDataChangeHandlerWithTranslate,
}) => {
    return (
        <>
            {widgetData.type === 'form' && (
                <FormTypeWidgetModelFields
                    widgetSettings={widgetSettings}
                    widgetData={widgetData}
                    setWidgetData={setWidgetData}
                    onChangeHandler={onChangeHandler}
                    onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    mobileNavigation={widgetData.mobileNavigation}
                />
            )}
            {widgetData.type === 'menu' && (
                <MenuWidgetModelFields
                    widgetData={widgetData}
                    setWidgetData={setWidgetData}
                    onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    // onChangeHandler={onChangeHandler}
                    // mobileNavigation={widgetData.mobileNavigation}
                    widgetSettings={widgetSettings}
                />
            )}

            {widgetData.type === 'media' && (
                <>
                    <MediaWidgetType
                        onChangeHandler={onChangeHandler}
                        widgetData={widgetData}
                    />
                    <TextInputFieldForWidget
                        inputTitle="Media Url:"
                        name="mediaUrl"
                        value={widgetData.mediaUrl}
                        classNameValue="mediaUrl"
                        type="text"
                        placeHolder="mediaUrl"
                        onChangeHandler={onChangeHandler}
                    />
                </>
            )}

            {widgetData.type === 'dayModeNightMode' && (
                <DayModeNightModeFields
                    onChangeHandler={onUniqueDataChangeHandler}
                    dayNightModeDefault={
                        widgetData?.uniqueData?.dayNightModeDefault || ''
                    }
                    dayNightModeData={
                        widgetData?.uniqueData?.dayNightModeData || ''
                    }
                />
            )}

            {widgetData.type === 'userPreferenceConfig' && (
                <UserPreferenceConfigModelFields
                    onChangeHandler={onUniqueDataChangeHandler}
                    uniqueData={widgetData?.uniqueData}
                />
            )}

            {widgetData.type === 'postsListEntireByCategories' && (
                <TextInputFieldForWidget
                    inputTitle="How Many Category Group?"
                    name="categoryCount"
                    type="number"
                    value={widgetData?.uniqueData?.categoryCount}
                    classNameValue="count"
                    placeHolder="count"
                    onChangeHandler={onUniqueDataChangeHandler}
                />
            )}

            {(widgetData.type === 'posts' ||
                widgetData.type === 'postsList' ||
                widgetData.type === 'postsSwiper' ||
                widgetData.type === 'metaWithImage' ||
                widgetData.type === 'meta' ||
                widgetData.type === 'postsListEntireByCategories' ||
                widgetData.type === 'postsSlider') && (
                <TextInputFieldForWidget
                    inputTitle={
                        widgetData.type === 'postsListEntireByCategories'
                            ? 'How Many Posts Per Group'
                            : 'Count :'
                    }
                    name="count"
                    type="number"
                    value={widgetData.uniqueData?.count}
                    classNameValue="count"
                    placeHolder="count"
                    onChangeHandler={onUniqueDataChangeHandler}
                />
            )}

            {(widgetData.type === 'posts' ||
                widgetData.type === 'postsList' ||
                widgetData.type === 'postsSwiper' ||
                widgetData.type === 'postsSlider') && (
                <TextInputFieldForWidget
                    inputTitle="Selected Meta For PostsRenderer:"
                    name="selectedMetaForPosts"
                    type="text"
                    value={widgetData?.uniqueData?.selectedMetaForPosts}
                    classNameValue="selectedMetaForPosts"
                    placeHolder="selectedMetaForPosts"
                    onChangeHandler={onUniqueDataChangeHandler}
                />
            )}

            {widgetData.type === 'searchBar' && (
                <SearchTypeInputFields
                    uniqueData={widgetData?.uniqueData}
                    widgetSettings={widgetSettings}
                    onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    onUniqueDataChangeHandlerWithTranslate={
                        onUniqueDataChangeHandlerWithTranslate
                    }
                />
            )}

            {widgetData.type === 'multipleLinkTo' && (
                <MultipleLinkWidgetModelFields
                    widgetSettings={widgetSettings}
                    widgetData={widgetData}
                    setWidgetData={setWidgetData}
                />
            )}

            {widgetData.type === 'linkTo' && (
                <LinkTypeWidgetModelFields
                    widgetSettings={widgetSettings}
                    uniqueData={widgetData?.uniqueData}
                    onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    onUniqueDataChangeHandlerWithTranslate={
                        onUniqueDataChangeHandlerWithTranslate
                    }
                />
            )}

            {(widgetData.type === 'meta' ||
                widgetData.type === 'metaWithImage') && (
                <>
                    <SelectFieldForWidget
                        title={'Meta Type:'}
                        name={'metaType'}
                        //widgetData?.metaType will be removed
                        value={
                            widgetData?.uniqueData?.metaType ||
                            widgetData?.metaType
                        }
                        options={
                            widgetData.type === 'metaWithImage'
                                ? ['categories', 'actors']
                                : ['tags', 'categories', 'actors']
                        }
                        onChangeHandler={onUniqueDataChangeHandler}
                    />
                    <div className="checkInputFieldForWidget widgetSection">
                        <p>Grouping Metas:</p>
                        {/*//@ts-ignore*/}
                        <input
                            type="checkbox"
                            name="grouping"
                            checked={widgetData?.uniqueData?.grouping}
                            onChange={e => onUniqueDataChangeHandler(e)}
                        />
                    </div>
                </>
            )}

            {widgetData.type === 'logo' && (
                <LogoTypeWidgetModelFields
                    widgetSettings={widgetSettings}
                    onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    widgetData={widgetData}
                    onUniqueDataChangeHandlerWithTranslate={
                        onUniqueDataChangeHandlerWithTranslate
                    }
                />
            )}

            {widgetData.type === 'advertise' && (
                <>
                    <SelectFieldForWidget
                        title={'Advertise Type:'}
                        name={'advertiseType'}
                        value={widgetData?.uniqueData?.advertiseType}
                        options={advertiseType}
                        onChangeHandler={onUniqueDataChangeHandler}
                    />
                    { widgetData?.uniqueData?.advertiseType === 'script' &&
                        <SelectFieldForWidget
                            title={'Advertise Place:'}
                            name={'advertisePlace'}
                            value={widgetData?.uniqueData?.advertisePlace}
                            options={advertisePlaceType}
                            onChangeHandler={onUniqueDataChangeHandler}
                        />
                    }



                    <div className={'monaco-editor-section'}>
                        <p>Advertise Code:</p>
                        <MonacoEditor
                            name={'adCode'}
                            language={'html'}
                            theme={'vs-dark'}
                            defaultValue={widgetData.uniqueData?.adCode}
                            value={widgetData.uniqueData?.adCode}
                            onParentChangeHandler={onUniqueDataChangeHandler}
                        />
                    </div>


                </>
            )}

            {(widgetData.type === 'posts' ||
                widgetData.type === 'postsList' ||
                widgetData.type === 'postsSwiper' ||
                widgetData.type === 'metaWithImage' ||
                widgetData.type === 'meta' ||
                widgetData.type === 'postsSlider') && (
                <SelectFieldForWidget
                    title={'Sort By:'}
                    name={'sortBy'}
                    value={widgetData.sortBy}
                    options={
                        widgetData.type === 'metaWithImage' ||
                        widgetData.type === 'meta'
                            ? [
                                  'updatedAt',
                                  'createdAt',
                                  'count',
                                  'index',
                                  'rank',
                                  'views',
                                  'likes',
                              ]
                            : [
                                  'updatedAt',
                                  'createdAt',
                                  'views',
                                  'likes',
                                  'random',
                              ]
                    }
                    onChangeHandler={onChangeHandler}
                />
            )}

            {(widgetData.type === 'posts' ||
                widgetData.type === 'postsList' ||
                widgetData.type === 'postsSwiper' ||
                widgetData.type === 'postsSlider') && (
                <SelectFieldForWidget
                    title={'Post Type:'}
                    name={'postType'}
                    value={widgetData?.postType}
                    options={postTypes}
                    onChangeHandler={onChangeHandler}
                />
            )}

            {(widgetData.type === 'posts' ||
                widgetData.type === 'postsList' ||
                widgetData.type === 'postsSwiper' ||
                widgetData.type === 'metaWithImage' ||
                widgetData.type === 'postsSlider') && (
                <>
                    <SelectFieldForWidget
                        title={'Card Width Desktop:'}
                        name={'cardWidthDesktop'}
                        value={widgetData.cardWidthDesktop}
                        options={[116.6, 209.8, 255, 320]}
                        onChangeHandler={onChangeHandler}
                    />
                    <div className="checkInputFieldForWidget widgetSection">
                        <p>Pagination:</p>
                        <input
                            type="checkbox"
                            name="pagination"
                            checked={widgetData.pagination}
                            onChange={e => onCheckboxChangeHandler(e)}
                        />
                    </div>
                </>
            )}
            {widgetData.type === 'imagesSlider' && (
                <ImagesSliderTypeWidgetModelFields
                    onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    uniqueData={widgetData.uniqueData}
                />
            )}

            {(widgetData.type === 'postsSlider' ||
                widgetData.type === 'imagesSlider') && (
                <SliderWidgetFields
                    onUniqueDataJsonChangeHandler={
                        onUniqueDataJsonChangeHandler
                    }
                    uniqueData={widgetData.uniqueData}
                />
            )}
        </>
    );
};
export default UniqueFields;
