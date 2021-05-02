import Link from "next/link";

const WidgetFooter = props => {
    if (props.redirectLink && props.redirectToTitle && props.footerLink){
        return (
            <div className='widget-footer'>
            <style jsx>{`
                .widget-footer{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--widget-h-f-background-color) ;
                }
                a {
                    padding: 10px;
                    border-radius: 5px;
                    color: var( --widget-h-f-text-color);
                }
            `}</style>
                <Link href={props.redirectLink} >
                    <a>{props.redirectToTitle}</a>
                </Link>
            </div>
        );
    }else return null

};

export default WidgetFooter;
