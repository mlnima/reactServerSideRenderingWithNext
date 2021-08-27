import {useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";

const LinkTo = props => {
    const contextData = useContext(AppContext);

    if (props.linkTo && props.linkToType) {
        if (props.linkToType === 'internal') {
            return (
                <Link href={props.linkTo ? props.linkTo : '/'} as={props.linkToAs ? props.linkToAs : props.linkTo || '/'}>
                    <a target={props.linkToWindowType ? props.linkToWindowType : '_self'}>
                    {props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].linkToText || props.linkToText : props.linkToText : props.linkToText}
                    </a>
                </Link>
            )
        } else if (props.linkToType === 'external') {
            return (
                <a href={props.linkTo} target={props.linkToWindowType ? props.linkToWindowType : '_self'}>
                    {props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].linkToText || props.linkToText : props.linkToText : props.linkToText}
                </a>
            );
        } else return null

    } else return null

};
export default LinkTo;
