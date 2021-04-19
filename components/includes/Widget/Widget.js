import React, {useEffect} from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import styled from "styled-components";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import('../Posts/Posts'))
const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
const SearchInputComponent = dynamic(() => import('../widgets/SearchInputComponent/SearchInputComponent'))
const AlphabeticalNumericalRangeLinksWidget = dynamic(() => import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'),{ ssr: false ,loading: () => <p>...</p> })
const Logo = dynamic(() => import('../widgets/Logo/Logo'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
const ImageSwiper = dynamic(() => import('../widgets/ImageSwiper/ImageSwiper'),{ ssr: false })
const PostSwiper = dynamic(() => import('../widgets/PostSwiper/PostSwiper'),{ ssr: false })
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))
let StyledSection = styled.section`${props => props.customStyles}`

const Widget = ({postElementStyle,postElementSize,isMobile,currentPageSidebar,referer,_id,data,viewType}) => {

    const idAttribute = data?.extraId ? {id: data?.extraId} : {}
    const generalProps = {
        currentPageSidebar,
        isMobile,
        id:_id,
        widget:true,
        referer,
        ...data
    }

    const postTypeProps = {
            ...generalProps,
            postElementSize:postElementSize,
            postElementStyle:postElementStyle
    }


    return (
        <StyledSection customStyles={data?.customStyles || ''}
                       className={'widget ' + (data?.extraClassName ?? '')}
                       {...idAttribute}>
            <WidgetHeader {...data}/>
            <WidgetText {...data} id={_id}/>
            {
                data.type === 'posts' ?<Posts {...postTypeProps} />:
                data.type === 'postsSwiper' ? <PostSwiper {...postTypeProps}/>  :
                data.type === 'multipleLinkTo' ? <MultipleLinkTo {...generalProps}/> :
                data.type === 'media' ? <MediaWidget {...generalProps}/> :
                data.type === 'recentComments' ? <RecentComments {...generalProps}/> :
                data.type === 'meta' ? <MetaWidget {...generalProps}/> :
                data.type === 'searchBar' ? <SearchInputComponent {...generalProps}/> :
                data.type === 'logo' ? <Logo {...generalProps}/> :
                data.type === 'alphabeticalNumericalRange' ? <AlphabeticalNumericalRangeLinksWidget {...generalProps}/> :
                data.type === 'language' ? <LanguagesSwitcher {...generalProps}/>:
                data.type === 'authentication' ? <Authentication {...generalProps}/> :
                data.type === 'linkTo' ? <LinkTo {...generalProps}/> :
                data.type === 'imageSwiper' ? <ImageSwiper {...generalProps}/> :
                data.type === 'menu' ? <MenuWidget {...generalProps}/> :
                data.type === 'shoppingCart' ? <ShoppingCart {...generalProps}/> :
                data.type === 'form' ? <FormWidget{...generalProps}/>
                :null
            }
            <WidgetFooter  {...data}/>
        </StyledSection>
    );
};
export default Widget;

// {TargetComponent ?
//     <TargetComponent
//         currentPageSidebar={currentPageSidebar}
//         isMobile={isMobile}
//         {...data}
//         id={_id}
//         widget={true}
//         viewType={viewType}
//         postElementSize={postElementSize}
//         postElementStyle={postElementStyle}
//         referer={referer}/>
//     : null
// }
//
// const TargetComponent =
//     data.type === 'posts' ? Posts :
//         data.type === 'multipleLinkTo' ? MultipleLinkTo :
//             data.type === 'media' ? MediaWidget :
//                 data.type === 'text' ? null :
//                     data.type === 'textEditor' ? null :
//                         data.type === 'recentComments' ? RecentComments :
//                             data.type === 'meta' ? MetaWidget :
//                                 data.type === 'searchBar' ? SearchInputComponent :
//                                     data.type === 'logo' ? Logo :
//                                         data.type === 'alphabeticalNumericalRange' ? AlphabeticalNumericalRangeLinksWidget :
//                                             data.type === 'language' ? LanguagesSwitcher :
//                                                 data.type === 'authentication' ? Authentication :
//                                                     data.type === 'linkTo' ? LinkTo :
//                                                         data.type === 'imageSwiper' ? ImageSwiper :
//                                                             data.type === 'postsSwiper' ? PostSwiper :
//                                                                 data.type === 'menu' ? MenuWidget :
//                                                                     data.type === 'shoppingCart' ? ShoppingCart :
//                                                                         data.type === 'form' ? FormWidget : null