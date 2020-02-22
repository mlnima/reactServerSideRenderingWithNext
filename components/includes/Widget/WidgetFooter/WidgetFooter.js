import React from 'react';

import Link from "next/link";
const WidgetFooter = props => {

    if (props.redirectTo && props.redirectToTitle ){
        return (
            <div className='WidgetFooter'>
                <Link href={props.redirectTo} ><a>{props.redirectToTitle}</a></Link>
            </div>
        );
    }else return null

};

export default WidgetFooter;
