import React, {useEffect} from 'react';
import AppProvider from "../context/AppContext";
import '../styles/styles.scss';

import '../components/includes/AlertBox/AlertBox.scss';
import '../components/includes/checkOutPageComponents/CheckOutItemPreview/CheckOutItemPreview.scss';
import '../components/includes/checkOutPageComponents/CheckOutItemPreview/ItemCountUI.scss';
import '../components/includes/checkOutPageComponents/CheckoutPop/CheckoutPop.scss';
import '../components/includes/checkOutPageComponents/CheckoutPop/CheckOutSlideHeader/CheckOutSlideHeader.scss';
import '../components/includes/CommentsRenderer/CommentsRenderer.scss';
import '../components/includes/Loading/Loading.scss';
import '../components/includes/MetaContentForPostsPage/MetaContentForPostsPage.scss';
import '../components/includes/MetaElement/MetaElement.scss';
import '../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo.scss';
import '../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation.scss';
import '../components/includes/PaginationComponent/PaginationComponent.scss';
import '../components/includes/PostElement/PostElement.scss';
import '../components/includes/Posts/Posts.scss';
import '../components/includes/ProgressBar/ProgressBar.scss';
import '../components/includes/Widget/Widget.scss';
import '../components/includes/widgets/widgetsMainStyle.scss';
import '../components/widgetsArea/WidgetArea/WidgetArea.scss';
import '../components/includes/CardElement/CardElement.scss'
import './post/Post.scss'
import './maintenance/maintenance.scss'
import './meta/meta.scss'
import './checkout/checkout.scss'
import '../components/layouts/AppLayout.scss'
import '../components/layouts/AdminLayout.scss'
import '../styles/globalAdminPanel.scss';
import '../components/includes/AdminTools/Console/Console.scss';
import '../components/includes/AdminTools/AdminTools.scss';
import '../pages/auth/registerLogin.scss';
import '../pages/profile/Profile.scss';



// export function reportWebVitals(metric) {
//     console.log(metric)
// }

const MyApp = ({Component, pageProps}) => {

    return (
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    )

};

export default MyApp;
