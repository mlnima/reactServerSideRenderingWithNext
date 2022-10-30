import React, {ChangeEventHandler, FC} from "react";
import dynamic from "next/dynamic";
import postTypes from "@_dataStructures/postTypes";
import {WidgetData, WidgetSettingsPropTypes} from "@_typeScriptTypes/widgets/Widget";

const SearchTypeInputFields = dynamic(() => import('./SearchTypeInputFields/SearchTypeInputFields'));
const MultipleLinkWidgetModelFields = dynamic(() => import('./MultipleLinkWidgetModelFields/MultipleLinkWidgetModelFields'));
const SelectFieldForWidget = dynamic(() => import('./SelectFieldForWidget/SelectFieldForWidget'));
const LogoTypeWidgetModelFields = dynamic(() => import('./LogoTypeWidgetModelFields/LogoTypeWidgetModelFields'));
const DayModeNightModeFields = dynamic(() => import('./DayModeNightModeFields/DayModeNightModeFields'));
const FormTypeWidgetModelFields = dynamic(() => import('./FormTypeWidgetModelFields/FormTypeWidgetModelFields'));
const MenuWidgetModelFields = dynamic(() => import('./MenuWidgetModelFields/MenuWidgetModelFields'));
const LinkTypeWidgetModelFields = dynamic(() => import('./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields'));
const MediaWidgetType = dynamic(() => import('./MediaWidgetType/MediaWidgetType'));
const TextInputFieldForWidget = dynamic(() => import('./TextInputFieldForWidget/TextInputFieldForWidget'), {ssr: false});
const AdvertiseWidgetModelFields = dynamic(() => import('./AdvertiseWidgetModelFields'));
const ImagesSliderTypeWidgetModelFields = dynamic(() => import('./ImagesSliderTypeWidgetModelFields/ImagesSliderTypeWidgetModelFields'));
const SwiperWidgetFields = dynamic(() => import('./SwiperWidgetFields/SwiperWidgetFields'));
const SliderWidgetFields = dynamic(() => import('./SliderWidgetFields/SliderWidgetFields'));

interface UniqueFieldsPropTypes {
    widgetData: any,
    widgetSettings: WidgetSettingsPropTypes,
    setWidgetSettings: any,
    onChangeHandlerWithTranslate: any,
    onUniqueDataJsonChangeHandler: any,
    onCheckboxChangeHandler: any,
    widgetId: string,
    setWidgetData:React.Dispatch<React.SetStateAction<any>> ,
    onChangeHandler:ChangeEventHandler<HTMLSelectElement | HTMLInputElement>,
    onUniqueDataChangeHandler:ChangeEventHandler<HTMLInputElement>,
    onUniqueDataChangeHandlerWithTranslate:ChangeEventHandler<HTMLInputElement>
}

const UniqueFields: FC<UniqueFieldsPropTypes> =
    ({
         widgetData,
         widgetSettings,
         setWidgetData,
         onChangeHandler,
         onUniqueDataChangeHandler,
         onChangeHandlerWithTranslate,
         onUniqueDataJsonChangeHandler,
         onCheckboxChangeHandler,
         onUniqueDataChangeHandlerWithTranslate
     }) => {


        return (
            <>
                {widgetData.type === 'form' &&
                    <FormTypeWidgetModelFields widgetSettings={widgetSettings}
                                               widgetData={widgetData}
                                               setWidgetData={setWidgetData}
                                               onChangeHandler={onChangeHandler}
                                               onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                               mobileNavigation={widgetData.mobileNavigation}
                    />
                }
                {widgetData.type === 'menu' &&
                    <MenuWidgetModelFields widgetData={widgetData}
                                           setWidgetData={setWidgetData}
                                           onChangeHandler={onChangeHandler}
                                           mobileNavigation={widgetData.mobileNavigation}
                                           widgetSettings={widgetSettings}

                    />
                }

                {widgetData.type === 'media' &&
                    <>
                        <MediaWidgetType onChangeHandler={onChangeHandler} widgetData={widgetData}/>
                        <TextInputFieldForWidget
                            inputTitle='Media Url:'
                            name='mediaUrl'
                            value={widgetData.mediaUrl}
                            classNameValue='mediaUrl'
                            type='text'
                            placeHolder='mediaUrl'
                            onChangeHandler={onChangeHandler}
                        />
                    </>
                }

                {widgetData.type === 'dayModeNightMode' &&
                    <DayModeNightModeFields onChangeHandler={onUniqueDataChangeHandler}
                                            dayNightModeData={widgetData?.uniqueData?.dayNightModeData || ''}
                    />
                }

                {(widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'meta' || widgetData.type === 'postsSlider') &&
                    <TextInputFieldForWidget
                        inputTitle='count :'
                        name='count'
                        type='number'
                        value={widgetData.count}
                        classNameValue='count'
                        placeHolder='count'
                        onChangeHandler={onChangeHandler}
                    />
                }

                {(widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'postsSlider') &&
                    <TextInputFieldForWidget inputTitle='Selected Meta For PostsRenderer:'
                                             name='selectedMetaForPosts'
                                             type='text' value={widgetData.selectedMetaForPosts}
                                             classNameValue='selectedMetaForPosts'
                                             placeHolder='selectedMetaForPosts'
                                             onChangeHandler={onChangeHandler}
                    />
                }

                {widgetData.type === 'searchBar' &&
                    <SearchTypeInputFields uniqueData={widgetData?.uniqueData}
                                           widgetSettings={widgetSettings}
                                           onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                           onUniqueDataChangeHandlerWithTranslate={onUniqueDataChangeHandlerWithTranslate}
                    />
                }

                {widgetData.type === 'multipleLinkTo' &&
                    <MultipleLinkWidgetModelFields widgetSettings={widgetSettings}
                                                   widgetData={widgetData}
                                                   setWidgetData={setWidgetData}
                    />
                }

                {widgetData.type === 'linkTo' &&
                    <LinkTypeWidgetModelFields
                        widgetSettings={widgetSettings}
                        uniqueData={widgetData?.uniqueData}
                        onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                        onUniqueDataChangeHandlerWithTranslate={onUniqueDataChangeHandlerWithTranslate}
                    />
                }

                {(widgetData.type === 'meta' || widgetData.type === 'metaWithImage' )&&
                    <SelectFieldForWidget title={'Meta Type:'}
                                          name={'metaType'}
                                          value={widgetData?.metaType}
                                          options={['tags', 'categories', 'actors']}
                                          onChangeHandler={onChangeHandler}
                    />
                }

                {widgetData.type === 'logo' &&
                    <LogoTypeWidgetModelFields widgetSettings={widgetSettings}
                                               onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                               widgetData={widgetData}
                                               onUniqueDataChangeHandlerWithTranslate={onUniqueDataChangeHandlerWithTranslate}
                    />
                }

                {widgetData.type === 'advertise' &&
                    <AdvertiseWidgetModelFields uniqueData={widgetData?.uniqueData}
                                                onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                    />

                }

                {(widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'meta' || widgetData.type === 'postsSlider') &&
                    <SelectFieldForWidget title={'Sort By:'}
                                          name={'sortBy'}
                                          value={widgetData.sortBy}
                                          options={widgetData.type === 'metaWithImage' || widgetData.type === 'meta' ?
                                              ['updatedAt', 'createdAt', 'count', 'index', 'rank', 'views', 'likes'] :
                                              ['updatedAt', 'createdAt', 'views', 'likes', 'random']
                                          }
                                          onChangeHandler={onChangeHandler}
                    />
                }

                {(widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'postsSlider') &&
                    <SelectFieldForWidget title={'Post Type:'}
                                          name={'postType'}
                                          value={widgetData?.postType}
                                          options={postTypes}
                                          onChangeHandler={onChangeHandler}
                    />
                }

                {(widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'postsSlider') &&
                    <>
                        <SelectFieldForWidget title={'Card Width Desktop:'}
                                              name={'cardWidthDesktop'}
                                              value={widgetData.cardWidthDesktop}
                                              options={[116.6, 209.8, 255, 320]}
                                              onChangeHandler={onChangeHandler}
                        />
                        <div className='checkInputFieldForWidget widgetSection'>
                            <p>Pagination:</p>
                            <input type='checkbox' name='pagination' checked={widgetData.pagination}
                                   onChange={e => onCheckboxChangeHandler(e)}/>
                        </div>
                    </>
                }
                {widgetData.type === 'imagesSlider' &&
                    <ImagesSliderTypeWidgetModelFields onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                                       uniqueData={widgetData.uniqueData}
                    />
                }

                {(widgetData.type === 'postsSlider' || widgetData.type === 'imagesSlider') &&
                    <SliderWidgetFields
                        onUniqueDataJsonChangeHandler={onUniqueDataJsonChangeHandler}
                        uniqueData={widgetData.uniqueData}
                    />
                }
            </>
        )
    };
export default UniqueFields
