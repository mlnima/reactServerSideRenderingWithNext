import React from 'react';
//import AppLayout from '../components/layouts/AppLayout'
//import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'
//import Footer from '../components/widgetsArea/Footer/Footer'


const Error = ({statusCode}) => {

    return (

        <div className='error-page'>
            <h1 className='error-page-message'>
                {statusCode
                    ? `error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </h1>
        </div>


    )
}

//
// export const getServerSideProps = async ({res, err}) => {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404
//     return {statusCode}
// }

export default Error
