import React from "react";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Assets from "../pages/Assets/Assets";
import Post from "@components/pages/Post/Post";
import FileManager from "@components/pages/FileManager/FileManager";
import DesignSection from "@components/pages/Design/DesignSection";
import Terminal from "@components/pages/Tools/Terminal/Terminal";
import Tools from "@components/pages/Tools/Tools";
import Settings from "@components/pages/Settings/Settings";
import CustomScript from "@components/pages/Settings/CustomScripts/CustomScripts";
import Membership from "@components/pages/Settings/Membership/Membership";
import PostsExporter from "@components/pages/Exporter/PostsExporter/PostsExporter";
import Content from "@components/pages/Importer/Content";
import Youtube from "@components/pages/Importer/Youtube";
import PostsImporter from "@components/pages/Importer/PostsImporter";
import User from "@components/pages/User/User";
import Page from "@components/pages/Page/Page";
import Meta from "@components/pages/Meta/Meta";
import Form from "@components/pages/Form/Form";
import Translations from "@components/pages/Translations/Translations";
import General from "@components/pages/Settings/General/General";
import Widgets from "@components/pages/Design/Widgets/Widgets";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/assets" element={<Assets/>}/>
            <Route path="/dashboard/post" element={<Post/>}/>
            <Route path="/dashboard/user" element={<User/>}/>
            <Route path="/dashboard/page" element={<Page/>}/>
            <Route path="/dashboard/meta" element={<Meta/>}/>
            <Route path="/dashboard/form/:id" element={<Form/>}/>
            <Route path="/dashboard/fileManager" element={<FileManager/>}/>
            <Route path="/dashboard/design/widgets" element={<Widgets/>}/>
            <Route path="/dashboard/design/topBar"  element={<DesignSection name={'topBarStyle'}/>}/>
            <Route path="/dashboard/design/header"  element={<DesignSection name={'headerStyle'}/>}/>
            <Route path="/dashboard/design/navigation"  element={<DesignSection name={'navigationStyle'}/>}/>
            <Route path="/dashboard/design/postPage"  element={<DesignSection name={'postPageStyle'}/>}/>
            <Route path="/dashboard/design/postsPage"  element={<DesignSection name={'postsPageStyle'}/>}/>
            <Route path="/dashboard/design/actorPage"  element={<DesignSection name={'actorPageStyle'}/>}/>
            <Route path="/dashboard/design/actorsPage"  element={<DesignSection name={'actorsPageStyle'}/>}/>
            <Route path="/dashboard/design/categoryPage"  element={<DesignSection name={'categoryPageStyle'}/>}/>
            <Route path="/dashboard/design/categoriesPage"  element={<DesignSection name={'categoriesPageStyle'}/>}/>
            <Route path="/dashboard/design/tagPage"  element={<DesignSection name={'tagPageStyle'}/>}/>
            <Route path="/dashboard/design/tagsPage"  element={<DesignSection name={'tagsPageStyle'}/>}/>
            <Route path="/dashboard/design/cards"  element={<DesignSection name={'cardsCustomStyle'}/>}/>
            <Route path="/dashboard/design/footer"  element={<DesignSection name={'footerStyle'}/>}/>
            <Route path="/dashboard/design/customStyles"  element={<DesignSection name={'customStyles'}/>}/>
            <Route path="/dashboard/design/customColors"  element={<DesignSection name={'customColors'}/>}/>
            <Route path="/dashboard/tools" element={<Tools/>}/>
            <Route path="/dashboard/tools/terminal" element={<Terminal/>}/>
            <Route path="/dashboard/translations" element={<Translations/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
            <Route path="/dashboard/settings/customScript" element={<CustomScript/>}/>
            <Route path="/dashboard/settings/membershipSettings" element={<Membership/>}/>
            <Route path="/dashboard/settings/general" element={<General/>}/>
            <Route path="/dashboard/exporter/postsExporter" element={<PostsExporter/>}/>
            <Route path="/dashboard/importer/content" element={<Content/>}/>
            <Route path="/dashboard/importer/youtube" element={<Youtube/>}/>
            <Route path="/dashboard/importer/postsImporter" element={<PostsImporter/>}/>
            <Route path={'/dashboard/login'} element={<Login/>} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
};

export default MainRouter
