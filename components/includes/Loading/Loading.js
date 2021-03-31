import React, {useContext} from 'react';
import { AppContext } from "../../../context/AppContext";



const Loading = () => {
    const contextData = useContext(AppContext);
    const onStopLoadingHandler = ()=>{
        contextData.dispatchState({
            ...contextData.state,
            loading:false
        })
    }
        // return (
        //     <div className='Loading'>
        //
        //         <div className="lds-ring">
        //
        //             <div></div>
        //             <div></div>
        //
        //             <div></div>
        //
        //             <div></div>
        //
        //         </div>
        //         <button className='stopLoading fas fa-times' onClick={()=>onStopLoadingHandler()}/>
        //     </div>
        // );
    return null
};

export default Loading;
