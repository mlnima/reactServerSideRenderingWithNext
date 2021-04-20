import Link from "next/link";
const WidgetFooter = props => {
    if (props.redirectLink && props.redirectToTitle && props.footerLink){
        return (
            <div className='WidgetFooter'>
                <Link href={props.redirectLink} ><a>{props.redirectToTitle}</a></Link>
            </div>
        );
    }else return null

};

export default WidgetFooter;
