import React, {useEffect, useState} from 'react';
import Link from "next/link";

const LinkTo = props => {
    if (props.linkTo && props.linkToType) {
        if (props.linkToType === 'internal') {
            return (
                <Link href={props.linkTo ? props.linkTo : '/'} as={props.linkToAs ? props.linkToAs : props.linkTo || '/'}><a>{props.linkToText}</a></Link>
            )
        } else if (props.linkToType === 'external') {
            return (
                <a href={props.linkTo} target={props.linkToWindowType?props.linkToWindowType:'_self'}>{props.linkToText}</a>
            );
        } else return null

    } else return null

};
export default LinkTo;
