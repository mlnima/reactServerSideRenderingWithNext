import React from 'react';
import EcommerceSettingsInputSection from "../../../../components/adminIncludes/eCommerceSettingsPageComponents/EcommerceSettingsInputSection/EcommerceSettingsInputSection";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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
const eCommerceSettings = () => {

    return (

            <StyledDiv className='e-commerce-Settings-page'>
                <h3>Text and Translations : </h3>
                <div className='e-commerce-settings-translate-settings'>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='proceedToCheckOutText' translation={true} description='text on the button for proceeding the checkout'/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='summaryText' translation={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='totalText' translation={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='taxText' translation={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='shippingCostText' translation={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='VAT_includedText' translation={true}/>

                </div>
                <h3>Payments Settings : </h3>
                <div className='eCommerceSettings-settings'>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='currency' fieldRequired={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='VAT' fieldRequired={true} description='only the number of VAT percentage if your products prices are included VAT leave this field empty' inputType='number'/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='payPalId' fieldRequired={true} />
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='currencySymbol' fieldRequired={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='shopLocale' fieldRequired={true}/>
                    {/*// @ts-ignore*/}
                    <EcommerceSettingsInputSection name='defaultShippingCost' description='Leave empty if Prices are including the shipping cost' inputType='number'/>

                </div>
            </StyledDiv>

    );
};


// export const getServerSideProps = async ({req}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let eCommerce;
//     const eCommerceData = await getSetting('eCommerce', domainName, false);
//     eCommerce = eCommerceData.data.setting ? eCommerceData.data.setting.data : {}
//
//     return {props: {domainName, eCommerce}}
// }


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default eCommerceSettings;
