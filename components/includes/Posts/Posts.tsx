import dynamic from "next/dynamic";
import {useRouter} from "next/router";
//import {likeValueCalculator} from "../../../_variables/_variables";
import _shortNumber from '../../../_variables/clientVariables/_shortNumber'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import ratingCalculator from "@_variables/util/ratingCalculator";
const MobilePromotionCard = dynamic(() => import('../cards/mobile/MobilePromotionCard/MobilePromotionCard'))
const VideoCardTypeList = dynamic(() => import('../cards/desktop/VideoCardTypeList/VideoCardTypeList'))
const PromotionCardListSmall = dynamic(() =>
    import('../cards/desktop/PromotionTypeCard/PromotionCardListSmall'))
const VideoTypeCard = dynamic(() => import('../cards/desktop/VideoCard/VideoCard'))
const PromotionTypeCard = dynamic(() => import('../cards/desktop/PromotionTypeCard/PromotionTypeCard'))
const ArticleTypeCard = dynamic(() => import('../cards/desktop/ArticleTypeCard/ArticleTypeCard'))
const DefaultTypeCard = dynamic(() => import('../cards/desktop/DefaultTypeCard/DefaultTypeCard'))
const LearnTypeCard = dynamic(() => import('../cards/desktop/LearnTypeCard/LearnTypeCard'))
const MobileVideoCard = dynamic(() => import('../cards/mobile/MobileVideoCard/MobileVideoCard'))
const MobileArticleCard = dynamic(() => import('../cards/mobile/MobileArticleCard/MobileArticleCard'))

const PostsContentStyledDiv = styled.div`
  display: flex;
  flex-direction: ${(props: { postElementSize: string }) => props.postElementSize === 'list' ? 'column' : 'row'};
  flex-wrap: ${(props: { postElementSize: string }) => props.postElementSize === 'listSmall' ? 'nowrap' : 'wrap'};
  justify-content: center;
  overflow-y: ${(props: { postElementSize: string }) => props.postElementSize === 'listSmall' ? 'scroll' : 'initial'};
  height: ${(props: { postElementSize: string }) => props.postElementSize === 'listSmall' ? '400px' : 'initial'};
  max-width: ${(props: { postElementSize: string }) => props.postElementSize === 'listSmall' ? '100%' : 'initial'};
  flex-direction: ${(props: { postElementSize: string }) => props.postElementSize === 'listSmall' ? 'column' : 'raw'};

  @media only screen and (min-width: 768px) {
    max-width: ${(props: { postElementSize: string }) => props.postElementSize === 'listSmall' ? '320px' : 'initial'};
  }
`

interface PostsComponentTypes {
    viewType?: string,
    _id?: string,
    posts?: PostTypes[],
    uniqueData?: {
        posts: PostTypes[],
        totalCount: number
    }
    widgetId?: string,
    postElementSize?: string,
    isSidebar?: boolean
}


const Posts = ({viewType, _id, posts, uniqueData, widgetId, postElementSize, isSidebar}: PostsComponentTypes) => {
    const dispatch = useDispatch()
    const {locale} = useRouter()

    const postsData = useSelector((store: StoreTypes) => {
        const elementSize = postElementSize ? postElementSize : store.settings?.design?.postElementSize
        return {
            elementSize,
            postsPerRawForMobile: store.settings?.identity?.postsPerRawForMobile || 2,
            isMobile: store.settings?.isMobile,
            cardWidth: elementSize === 'listSmall' ? 320 :
                elementSize === 'list' ? 116.6 :
                    elementSize === 'smaller' ? 209.8 :
                        elementSize === 'small' ? 255 :
                            elementSize === 'medium' ? 320 : 255
        }
    });

    const noImageUrl = '/static/images/noImage/no-image-available.png';

    return (
        <PostsContentStyledDiv className={'posts-content ' + (viewType ? viewType + '-posts-content' : 'standard')}
                               postElementSize={postsData.elementSize}
        >

            {(uniqueData?.posts || posts || []).map((post: PostTypes, index: number) => {

                // const title = (post?.translations?.[locale as string]?.title || post?.title as string)
                //     ?.replace('#', '');

                const title = process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ? post?.title?.replace('#', '') :
                              post?.translations?.[locale as string]?.title ? post?.translations?.[locale as string]?.title?.replace('#', '') :
                              post?.title?.replace('#', '');



                const dir = locale === 'fa' || locale === 'ar' && post?.translations?.[locale as string]?.title ?
                    'rtl' : 'ltr'
                const viewsNumber = post.views || 0
                const views = _shortNumber(viewsNumber)
                const rating = ratingCalculator(post.likes, post.disLikes)

                const postProps = {
                    dir,
                    views,
                    rating,
                    noImageUrl,
                    post,
                    postElementSize: postsData.elementSize,
                    widgetId,
                    cardWidth: postsData.cardWidth,
                    title

                }

                if (post.postType === 'video') {
                    if (postsData.elementSize === 'list') {
                        return <VideoCardTypeList isSidebar={isSidebar}
                                                  onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                  {...postProps}
                                                  key={index}
                        />
                    } else {
                        if (postsData.isMobile) {
                            return <MobileVideoCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                    postsPerRawForMobile={postsData.postsPerRawForMobile}
                                                    {...postProps}
                                                    key={index}
                            />
                        } else {
                            return <VideoTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                  {...postProps}
                                                  key={index}
                            />
                        }

                    }
                } else if (post.postType === 'promotion') {
                    if (postsData.elementSize === 'listSmall') {
                        // @ts-ignore
                        return <PromotionCardListSmall isSidebar={isSidebar}
                                                       onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                       {...postProps}
                                                       key={index}
                        />
                    } else {
                        if (postsData.isMobile) {
                            return <MobilePromotionCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                        postsPerRawForMobile={postsData.postsPerRawForMobile}
                                                        {...postProps}
                                                        key={index}
                            />
                        } else {
                            return <PromotionTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                      {...postProps}
                                                      key={index}
                            />
                        }

                    }
                } else if (post.postType === 'article') {
                    if (postsData.isMobile) {
                        return <MobileArticleCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                  postsPerRawForMobile={postsData.postsPerRawForMobile}
                                                  {...postProps}
                                                  key={index}
                        />
                    } else {
                        return <ArticleTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                                {...postProps}
                                                key={index}
                        />
                    }

                } else if (post.postType === 'learn') {
                    return <LearnTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                          {...postProps}
                                          key={index}
                    />
                } else return (
                    <DefaultTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                     {...postProps}
                                     key={index}
                    />
                )
            })}
        </PostsContentStyledDiv>
    );
};

export default Posts