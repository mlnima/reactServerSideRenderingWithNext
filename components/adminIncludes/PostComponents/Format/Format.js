import React,{useEffect,useState,useContext} from 'react';
import { AppContext } from "../../../../context/AppContext";
import './Format.scss'
const Format = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
        console.log(props )
    },[props]);

    return (
        <div className='Format'>
            <select defaultValue={contextData.editingPostData.format} name='format' onChange={e=>props.onChangeHandler(e)}>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
            </select>
        </div>
    );
};

Format.getInitialProps =  ({ req }) => {
    console.log(props )
    return { }
};

export default Format;