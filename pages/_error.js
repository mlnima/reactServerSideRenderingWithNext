import React from 'react';
import AppLayout from '../components/layouts/AppLayout'
//import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'
//import Footer from '../components/widgetsArea/Footer/Footer'


const Error = props => {

    console.log(props)

    return (
        <AppLayout {...props}>

            <div className='error-page'>
                <h1 className='error-page-message'>
                    { props.errorCode
                        ? `error ${ props.errorCode } occurred on server`
                        : 'An error occurred on client' }
                </h1>
            </div>

        </AppLayout>
    )
}


export const getServerSideProps = async ({res,err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { props:{statusCode} }
}

export default Error
