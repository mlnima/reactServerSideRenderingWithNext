import React, { useEffect, useState, useContext } from 'react';

const PostSidebar = props => {
    const [ state, setState ] = useState({
        style:{
            gridArea:'sidebar'
        }
    });
    useEffect(() => {
        console.log(props )

    }, []);
    if (props.isActive){
        return (
            <div style={state.style} className='post-sidebar'>
                i am sidebar
                xxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxx
            </div>
        );
    }else return null;

};
export default PostSidebar;