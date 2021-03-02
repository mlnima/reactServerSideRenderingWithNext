import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {AppContext} from "../../../../context/AppContext";
import {getAbsolutePath} from "../../../../_variables/_variables";
import {getSetting} from "../../../../_variables/ajaxVariables";

const eCommerceSettings = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});

    useEffect(() => {
        console.log(props)
    }, [props]);
    return (
        <AdminLayout>
            ECommerceSettings
            <div className='eCommerceSettings-translate-settings'>
                <div className='eCommerceSettings-translate-settings-section'>

                </div>
            </div>
            <div className='eCommerceSettings-settings'>

            </div>
        </AdminLayout>
    );
};


export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let identity;
    const identityData = await getSetting('identity', domainName, false);
    identity = identityData.data.setting ? identityData.data.setting.data : {}

    return {props: {domainName, identity}}
}


export default eCommerceSettings;
