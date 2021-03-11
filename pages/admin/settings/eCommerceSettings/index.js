import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../../components/layouts/AdminLayout";
import {AppContext} from "../../../../context/AppContext";
import {getAbsolutePath} from "../../../../_variables/_variables";
import {getSetting} from "../../../../_variables/ajaxVariables";
import EcommerceSettingsInputSection from "../../../../components/adminIncludes/eCommerceSettingsPageComponents/EcommerceSettingsInputSection/EcommerceSettingsInputSection";

const eCommerceSettings = props => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        props.eCommerce ? contextData.dispatchECommerceSettings(props.eCommerce) : null
    }, [props]);


    return (
        <AdminLayout>
            <div className='e-commerce-Settings-page'>
                <div className='e-commerce-settings-translate-settings'>
                    <EcommerceSettingsInputSection name='proceedToCheckOutText' translation={true}/>
                    <EcommerceSettingsInputSection name='summaryText' translation={true}/>
                    <EcommerceSettingsInputSection name='totalText' translation={true}/>
                    <EcommerceSettingsInputSection name='taxText' translation={true}/>
                    <EcommerceSettingsInputSection name='shippingCostText' translation={true}/>
                </div>
                <div className='eCommerceSettings-settings'>
                    <EcommerceSettingsInputSection name='currency'/>
                    <EcommerceSettingsInputSection name='payPalId'/>
                    <EcommerceSettingsInputSection name='currencySymbol'/>
                </div>
            </div>
        </AdminLayout>
    );
};


export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let eCommerce;
    const eCommerceData = await getSetting('eCommerce', domainName, false);
    eCommerce = eCommerceData.data.setting ? eCommerceData.data.setting.data : {}

    return {props: {domainName, eCommerce}}
}


export default eCommerceSettings;
