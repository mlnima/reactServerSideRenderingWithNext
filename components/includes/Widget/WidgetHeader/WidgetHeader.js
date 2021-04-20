import {useContext} from 'react';
import Link from 'next/link'
import {AppContext} from '../../../../context/AppContext';
import {useRouter} from "next/router";

const WidgetHeader = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const title = props.translations ? props.translations[router.locale || contextData.state.activeLanguage] ? props.translations[router.locale ||contextData.state.activeLanguage].title || props.title : props.title : props.title
    if (props.title) {
        return (
            <div className='widget-Header' >
                <h1 className='widget-header-title'>{title}</h1>
                {props.redirectLink && props.redirectToTitle && !props.footerLink ? <Link href={props.redirectLink}><a aria-label={props.redirectToTitle}>{props.redirectToTitle}</a></Link>:null }
            </div>
        );
    } else return null

};

export default WidgetHeader;
