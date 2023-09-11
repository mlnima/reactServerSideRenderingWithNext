import React from "react";
import {Routes, Route} from 'react-router-dom';
import InitialSettings from "@components/pages/settings/initialSettings/initialSettings";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import NotFound from "../components/pages/NotFound";
import Login from "../components/pages/Login";
import Assets from "../components/pages/Assets/Assets";
import Post from "@components/pages/Post/Post";
import FileManager from "@components/pages/FileManager/FileManager";
import DesignSection from "@components/common/settings/DesignSection";
import Terminal from "@components/pages/Tools/Terminal/Terminal";
import Tools from "@components/pages/Tools/Tools";
import CustomScript from "@components/pages/settings/initialSettings/CustomScripts";
import Membership from "@components/pages/settings/initialSettings/Membership";
import PostsExporter from "@components/pages/Backup/PostsExporter/PostsExporter";
import Content from "@components/pages/Importer/Content";
import Youtube from "@components/pages/Importer/Youtube";
import PostsImporter from "@components/pages/Importer/PostsImporter";
import User from "@components/pages/User/User";
import Page from "@components/pages/Page/Page";
import Meta from "@components/pages/Meta/Meta";
import Form from "@components/pages/Form/Form";
import Translations from "@components/pages/Translations/Translations";
import General from "@components/pages/settings/initialSettings/General/General";
import Widgets from "@components/pages/Design/Widgets/Widgets";
import Chatroom from "@components/pages/Chatroom/Chatroom";
import Backup from "@components/pages/Backup/Backup";
import DefaultPageSettings from "@components/pages/settings/defaultPagesSetttings/DefaultPageSettings";

const MainRouter = () => {
    return (
        <Routes>

            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/assets" element={<Assets/>}/>
            <Route path="/dashboard/post" element={<Post/>}/>
            <Route path="/dashboard/chatroom" element={<Chatroom/>}/>
            <Route path="/dashboard/user" element={<User/>}/>
            <Route path="/dashboard/page" element={<Page/>}/>
            <Route path="/dashboard/page/:pageName" element={<Page/>}/>
            <Route path="/dashboard/meta" element={<Meta/>}/>
            <Route path="/dashboard/form/:id" element={<Form/>}/>
            <Route path="/dashboard/fileManager" element={<FileManager/>}/>
            <Route path="/dashboard/settings/defaultPages" element={<DefaultPageSettings/>}/>
            <Route path="/dashboard/tools" element={<Tools/>}/>
            <Route path="/dashboard/tools/terminal" element={<Terminal/>}/>
            <Route path="/dashboard/translations" element={<Translations/>}/>
            <Route path="/dashboard/settings/initialSettings" element={<InitialSettings/>}/>
            <Route path="/dashboard/settings/widgets" element={<Widgets/>}/>
            <Route path="/dashboard/backup/postsExporter" element={<PostsExporter/>}/>
            <Route path="/dashboard/backup" element={<Backup/>}/>
            <Route path="/dashboard/importer/content" element={<Content/>}/>
            <Route path="/dashboard/importer/youtube" element={<Youtube/>}/>
            <Route path="/dashboard/importer/postsImporter" element={<PostsImporter/>}/>
            <Route path={'/dashboard/login'} element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>

            {/*//to remove   */}

                {/*<Route path="/dashboard/settings/general" element={<General/>}/>*/}
                {/*<Route path="/dashboard/settings/customScript" element={<CustomScript/>}/>*/}
            {/*   <Route path="/dashboard/settings/membershipSettings" element={<Membership/>}/>*/}
            {/*<Route path="/dashboard/settings/customStyles" element={<DesignSection name={'customStyles'}/>}/>*/}
            {/*<Route path="/dashboard/settings/customColors" element={<DesignSection name={'customColors'}/>}/>*/}
            {/*<Route path="/dashboard/settings/topBar" element={<DesignSection name={'topBarStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/header" element={<DesignSection name={'headerStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/navigation" element={<DesignSection name={'navigationStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/postPage" element={<DesignSection name={'postPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/postsPage" element={<DesignSection name={'postsPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/actorPage" element={<DesignSection name={'actorPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/actorsPage" element={<DesignSection name={'actorsPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/categoryPage" element={<DesignSection name={'categoryPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/categoriesPage" element={<DesignSection name={'categoriesPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/tagPage" element={<DesignSection name={'tagPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/tagsPage" element={<DesignSection name={'tagsPageStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/cards" element={<DesignSection name={'cardsCustomStyle'}/>}/>*/}
            {/*<Route path="/dashboard/settings/footer" element={<DesignSection name={'footerStyle'}/>}/>*/}
        </Routes>
    )
};

export default MainRouter
// "DesignSettings": {
//         "pathURL": "/dashboard/design/widgets",
//             "subItems": [
//                 {"name": "topBar", "url": "/dashboard/design/topBar"},
//                 {"name": "header", "url": "/dashboard/design/header"},
//                 {"name": "navigation", "url": "/dashboard/design/navigation"},
//                 {"name": "widgets", "url": "/dashboard/design/widgets"},
//                 {"name": "postPage", "url": "/dashboard/design/postPage"},
//                 {"name": "postsPage", "url": "/dashboard/design/postsPage"},
//                 {"name": "actorPage", "url": "/dashboard/design/actorPage"},
//                 {"name": "actorsPage", "url": "/dashboard/design/actorsPage"},
//                 {"name": "categoryPage", "url": "/dashboard/design/categoryPage"},
//                 {"name": "categoriesPage", "url": "/dashboard/design/categoriesPage"},
//                 {"name": "tagPage", "url": "/dashboard/design/tagPage"},
//                 {"name": "tagsPage", "url": "/dashboard/design/tagsPage"},
//                 {"name": "metasPage", "url": "/dashboard/design/metasPage"},
//                 {"name": "cards", "url": "/dashboard/design/cards"},
//                 {"name": "footer", "url": "/dashboard/design/footer"},
//                 {"name": "customStyles", "url": "/dashboard/design/customStyles"},
//                 {"name": "customColors", "url": "/dashboard/design/customColors"}
//         ]
// },