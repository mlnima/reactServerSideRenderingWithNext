import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import './customStyle.scss';
import { getSetting, saveCustomStyle } from '../../../../_variables/ajaxVariables'
import { getAbsolutePath } from '../../../../_variables/_variables'


const customStyle = props => {

    const [ customStyle, setCustomStyle ] = useState( '')

    const onCustomStyleChangeHandler = e => {
        setCustomStyle(e.target.value)
    }

    const onCustomStyleSaveHandler = e => {
        e.preventDefault()
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        saveCustomStyle( customStyle ).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }


    useEffect(() => {
        console.log( props)
        if(props.customStyles.data){
            setCustomStyle(props.customStyles.data)
        }
    }, [props]);

    return (
        <AdminLayout>
            <div className='custom-style'>
                <form className='customStyle' onSubmit={ e => onCustomStyleSaveHandler(e) }>
                    <textarea value={  customStyle } onChange={ e => onCustomStyleChangeHandler(e) }/>
                    <button className='submitBtn' type='submit'>Save Custom Style</button>
                </form>
            </div>
        </AdminLayout>
    );
};

customStyle.getInitialProps = async ({ req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let customStyles;
    const customStylesData = await getSetting('customStyle', false, domainName);
    customStyles = customStylesData.data.setting ? customStylesData.data.setting : {}

    return {  customStyles }
}

export default customStyle;
