import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";

const translate = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (

        <div className='translate-page'>
            <div className='translate-page-inputFields'>
                <div className='translate-page-inputFields-section'>
                    <p>Sentence or Word</p>
                    <textarea name='sentence'/>
                </div>
                <div className='translate-page-inputFields-section'>
                    <p>Language Code EN to</p>
                    <select>
                        <option value='de'>DE</option>
                        <option value='fa'>FA</option>
                    </select>
                </div>
                <div className='translate-page-inputFields-section'>
                    <p>Translate</p>
                    <textarea name='sentence'/>
                </div>
                <button>Save</button>

            </div>
        </div>

    );
};
export default translate;
