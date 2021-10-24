import React from 'react';
import {getAbsolutePath} from "../../../../_variables/_variables";
import {getSetting} from "../../../../_variables/ajaxVariables";
import EcommerceSettingsInputSection from "../../../../components/adminIncludes/eCommerceSettingsPageComponents/EcommerceSettingsInputSection/EcommerceSettingsInputSection";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .e-commerce-settings-translate-settings , .eCommerceSettings-settings{
    margin: 10px;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 5px;
    justify-content: center;
    align-items: center;
    //margin: auto;
  }
`
const eCommerceSettings = props => {


    // useEffect(() => {
    //     props.eCommerce ? contextData.dispatchECommerceSettings(props.eCommerce) : null
    // }, []);


    return (

            <StyledDiv className='e-commerce-Settings-page'>
                <h3>Text and Translations : </h3>
                <div className='e-commerce-settings-translate-settings'>
                    <EcommerceSettingsInputSection name='proceedToCheckOutText' translation={true} description='text on the button for proceeding the checkout'/>
                    <EcommerceSettingsInputSection name='summaryText' translation={true}/>
                    <EcommerceSettingsInputSection name='totalText' translation={true}/>
                    <EcommerceSettingsInputSection name='taxText' translation={true}/>
                    <EcommerceSettingsInputSection name='shippingCostText' translation={true}/>
                    <EcommerceSettingsInputSection name='VAT_includedText' translation={true}/>
                </div>
                <h3>Payments Settings : </h3>
                <div className='eCommerceSettings-settings'>
                    <EcommerceSettingsInputSection name='currency' fieldRequired={true}/>
                    <EcommerceSettingsInputSection name='VAT' fieldRequired={true} description='only the number of VAT percentage if your products prices are included VAT leave this field empty' inputType='number'/>
                    <EcommerceSettingsInputSection name='payPalId' fieldRequired={true} />
                    <EcommerceSettingsInputSection name='currencySymbol' fieldRequired={true}/>
                    <EcommerceSettingsInputSection name='shopLocale' fieldRequired={true}/>
                    <EcommerceSettingsInputSection name='defaultShippingCost' description='Leave empty if Prices are including the shipping cost' inputType='number'/>

                </div>
            </StyledDiv>

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
