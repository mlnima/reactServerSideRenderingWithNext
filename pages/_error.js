import React from 'react';
import AppLayout from '../components/layouts/AppLayout'
import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import Footer from '../components/widgetsArea/Footer/Footer'


const Error = props => {

    return (
        <AppLayout>
            <SiteSettingSetter { ...props }/>
            <div className='error-page'>
                <h1 className='error-page-message'>
                    { props.errorCode
                        ? `error ${ props.errorCode } occurred on server`
                        : 'An error occurred on client' }
                </h1>
            </div>
            <Footer widgets={ props.widgets } position='footer'/>
        </AppLayout>
    )
}


export const getServerSideProps = async ({req,res}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { props:{statusCode} }
}

export default Error
