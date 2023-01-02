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

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/assets" element={<Assets/>}/>
            <Route path="/dashboard/post" element={<Post/>}/>
            <Route path="/dashboard/fileManager" element={<FileManager/>}/>
            <Route path="/dashboard/design/:section" element={<DesignSection/>}/>
            <Route path="/dashboard/tools" element={<Tools/>}/>
            <Route path="/dashboard/tools/terminal" element={<Terminal/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
            <Route path="/dashboard/settings/customScript" element={<CustomScript/>}/>
            <Route path="/dashboard/settings/membershipSettings" element={<Membership/>}/>
            <Route path="/dashboard/settings/membershipSettings" element={<Membership/>}/>
            <Route path="/dashboard/exporter/postsExporter" element={<PostsExporter/>}/>
            <Route path="/dashboard/importer/content" element={<Content/>}/>
            <Route path="/dashboard/importer/youtube" element={<Youtube/>}/>
            <Route path="/dashboard/importer/postsImporter" element={<PostsImporter/>}/>
            <Route element={<Login/>} path={'/dashboard/login'}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
};

export default MainRouter
