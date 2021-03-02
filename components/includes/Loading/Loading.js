import React, {useContext} from 'react';
import { AppContext } from "../../../context/AppContext";
import './Loading.scss'


const Loading = () => {
    const contextData = useContext(AppContext);
    const onStopLoadingHandler = ()=>{
        contextData.dispatchState({
            ...contextData.state,
            loading:false
        })
    }
    if (contextData.state.loading) {
        return (
            <div className='Loading'>

                <div className="lds-ring">

                    <div></div>
                    <div></div>

                    <div></div>

                    <div></div>

                </div>
                <button className='stopLoading fas fa-times' onClick={()=>onStopLoadingHandler()}/>
            </div>
        );
    } else return null
};

export default Loading;
