import React from 'react';
import {updateSetting} from '../../../store/clientActions/settingsActions'
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../store/clientActions/globalStateActions";
import {useRouter} from "next/router";

const SaveDesignChangesBtn = ({reload}) => {
    const dispatch = useDispatch()
    const design = useSelector(store => store?.settings.design)
    const router = useRouter()

    const onSaveHandler = () => {

        dispatch(setLoading(true))
        dispatch(updateSetting('design', design))
        if (reload){
            setTimeout(()=>{
                router.reload()
            },2000)
        }
    };

    return (
        <button className='btn btn-primary' onClick={() => onSaveHandler()}>
            Save Changes
        </button>
    );
};
export default SaveDesignChangesBtn;
