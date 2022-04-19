import React, {FC} from "react";
import dynamic from "next/dynamic";
import postTypes from "@components/global/postTypes";
const SearchTypeInputFields = dynamic(() => import('@components/adminIncludes/widgetsModel/WidgetModel/SearchTypeInputFields/SearchTypeInputFields'));
const MultipleLinkWidgetModelFields = dynamic(() => import('@components/adminIncludes/widgetsModel/WidgetModel/MultipleLinkWidgetModelFields/MultipleLinkWidgetModelFields'));
const SelectFieldForWidget = dynamic(() => import('@components/adminIncludes/widgetsModel/WidgetModel/SelectFieldForWidget/SelectFieldForWidget'));
const LogoTypeWidgetModelFields = dynamic(() => import('@components/adminIncludes/widgetsModel/WidgetModel/LogoTypeWidgetModelFields/LogoTypeWidgetModelFields'));
const DayModeNightModeFields = dynamic(() => import('@components/adminIncludes/widgetsModel/WidgetModel/DayModeNightModeFields/DayModeNightModeFields'));
const FormTypeWidgetModelFields = dynamic(() => import('./FormTypeWidgetModelFields/FormTypeWidgetModelFields'));
const MenuWidgetModelFields = dynamic(() => import('./MenuWidgetModelFields/MenuWidgetModelFields'));
const LinkTypeWidgetModelFields = dynamic(() => import('./LinkTypeWidgetModelFields/LinkTypeWidgetModelFields'));
const MediaWidgetType = dynamic(() => import('./MediaWidgetType/MediaWidgetType'));
const TextInputFieldForWidget = dynamic(() => import('./TextInputFieldForWidget/TextInputFieldForWidget'), {ssr: false});
const AdvertiseWidgetModelFields = dynamic(() => import('./AdvertiseWidgetModelFields'));
const ImagesSwiperTypeWidgetModelFields = dynamic(() => import('./ImagesSwiperTypeWidgetModelFields/ImagesSwiperTypeWidgetModelFields'));
const SwiperWidgetFields = dynamic(() => import('./SwiperWidgetFields/SwiperWidgetFields'));
const SliderWidgetFields = dynamic(() => import('./SliderWidgetFields/SliderWidgetFields'));

interface UniqueFieldsPropTypes {
    widgetData:any,
    widgetSettings:any,
    setWidgetSettings:any,
    onTextInputsDataChangeHandler:any,
    onUniqueDataJsonChangeHandler:any,
    onCheckboxChangeHandler:any,
    widgetId:string,
    setWidgetData,
    onChangeHandler,
    onUniqueDataChangeHandler
}

const UniqueFields: FC<UniqueFieldsPropTypes> =
    ({
         widgetData,
         widgetSettings,
         setWidgetData,
         onChangeHandler,
         onUniqueDataChangeHandler,
         onTextInputsDataChangeHandler,
         onUniqueDataJsonChangeHandler,
         onCheckboxChangeHandler
    }) => {
    return (
        <>
            {widgetData.type === 'form' ?
                <FormTypeWidgetModelFields widgetSettings={widgetSettings}
                                           widgetData={widgetData}
                                           setWidgetData={setWidgetData}
                                           onChangeHandler={onChangeHandler}
                                           onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                           mobileNavigation={widgetData.mobileNavigation}
                                       />
                :null
            }
            {widgetData.type === 'menu' ?
                <MenuWidgetModelFields widgetData={widgetData}
                                       setWidgetData={setWidgetData}
                                       onChangeHandler={onChangeHandler}
                                       mobileNavigation={widgetData.mobileNavigation}
                                       widgetSettings={widgetSettings}

                />
                :null
            }
            {widgetData.type === 'linkTo' ?
                <LinkTypeWidgetModelFields
                    widgetSettings={widgetSettings}
                    widgetData={widgetData}
                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                    onChangeHandler={onChangeHandler}
                    linkToText={widgetData.linkToText}
                    linkToWindowType={widgetData.linkToWindowType}
                    linkTo={widgetData.linkTo}
                    linkToType={widgetData.linkToType}
                    linkToAs={widgetData.linkToAs}
                />
                :null
            }
            {widgetData.type === 'media' ?
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
                :null
            }

            {widgetData.type === 'dayModeNightMode' ?
                <DayModeNightModeFields onChangeHandler={onUniqueDataChangeHandler}
                                        dayNightModeData={widgetData?.uniqueData?.dayNightModeData || ''}
                />
                : null
            }

            {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'meta' || widgetData.type === 'postsSlider' ?
                <TextInputFieldForWidget
                    inputTitle='count :'
                    name='count'
                    type='number'
                    value={widgetData.count}
                    classNameValue='count'
                    placeHolder='count'
                    onChangeHandler={onChangeHandler}
                />
                : null
            }

            {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'postsSlider' ?
                <TextInputFieldForWidget inputTitle='Selected Meta For PostsRenderer:'
                                         name='selectedMetaForPosts'
                                         type='text' value={widgetData.selectedMetaForPosts}
                                         classNameValue='selectedMetaForPosts'
                                         placeHolder='selectedMetaForPosts'
                                         onChangeHandler={onChangeHandler}
                />
                : null
            }

            {widgetData.type === 'searchBar' ?
                <SearchTypeInputFields widgetData={widgetData}
                                       widgetSettings={widgetSettings}
                                       onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                                       onChangeHandler={onChangeHandler}
                />
                : null
            }

            {widgetData.type === 'multipleLinkTo' ?
                <MultipleLinkWidgetModelFields widgetSettings={widgetSettings}
                                               widgetData={widgetData}
                                               setWidgetData={setWidgetData}
                />
                : null
            }

            {widgetData.type === 'meta' || widgetData.type === 'metaWithImage' ?
                <SelectFieldForWidget title={'Meta Type:'}
                                      name={'metaType'}
                                      value={widgetData.metaType}
                                      options={['tags', 'categories', 'actors']}
                                      onChangeHandler={onChangeHandler}
                />
                : null
            }

            {widgetData.type === 'logo' ?
                <LogoTypeWidgetModelFields widgetSettings={widgetSettings}
                                           onChangeHandler={onChangeHandler}
                                           widgetData={widgetData}
                                           onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                />
                : null
            }

            {widgetData.type === 'advertise' ?
                <AdvertiseWidgetModelFields uniqueData={widgetData?.uniqueData}
                                            onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                />
                : null
            }

            {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'meta' || widgetData.type === 'postsSlider' ?
                <SelectFieldForWidget title={'Sort By:'}
                                      name={'sortBy'}
                                      value={widgetData.sortBy}
                                      options={widgetData.type === 'metaWithImage' || widgetData.type === 'meta' ?
                                          ['updatedAt', 'createdAt', 'count', 'index', 'rank', 'views', 'likes'] :
                                          ['updatedAt', 'createdAt', 'views', 'likes', 'random']
                                      }
                                      onChangeHandler={onChangeHandler}
                /> : null
            }

            {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'postsSlider' ?
                <SelectFieldForWidget title={'Post Type:'}
                                      name={'postType'}
                                      value={widgetData?.postType}
                                      options={postTypes}
                                      onChangeHandler={onChangeHandler}
                />
                : null
            }

            {widgetData.type === 'posts' || widgetData.type === 'postsSwiper' || widgetData.type === 'metaWithImage' || widgetData.type === 'postsSlider' ?
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
                : null

            }
            {widgetData.type === 'imagesSwiper' || widgetData.type === 'imagesSlider' ?
                <ImagesSwiperTypeWidgetModelFields onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                                   uniqueData={widgetData.uniqueData}
                />
                : null
            }

            {widgetData.type === 'postsSwiper' || widgetData.type === 'imagesSwiper' ?
                <SwiperWidgetFields
                    onUniqueDataJsonChangeHandler={onUniqueDataJsonChangeHandler}
                    uniqueData={widgetData.uniqueData}
                />
                : null
            }

            {widgetData.type === 'postsSlider' || widgetData.type === 'imagesSlider' ?
                <SliderWidgetFields
                    onUniqueDataJsonChangeHandler={onUniqueDataJsonChangeHandler}
                    uniqueData={widgetData.uniqueData}
                />
                : null
            }
        </>
    )
};
export default UniqueFields
