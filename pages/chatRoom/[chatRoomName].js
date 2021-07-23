import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";

const chatRoom = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div>

        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'chatRoomPage')
    const widgets = firstLoadData.widgets
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}

export default chatRoom;
