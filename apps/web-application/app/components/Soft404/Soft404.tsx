import React, {FC} from "react";
import Link from "next/link";
import './Soft404.styles.scss'

interface IProps {
    dictionary: {
        [key: string]: string
    }
}

const Soft404: FC<IProps> = ({dictionary}) => {

    return (
        <div id={'primary'} className='post-page' >
            <main id={'content'} className={`page-no-sidebar`}>
            <div className={'soft404'}>
                <h1>{dictionary?.['Nothing found'] || 'Nothing found'}</h1>
                <p>{
                    dictionary?.['Nothing found Description'] ||
                    'It seems we can’t find what you’re looking for. Perhaps searching can help'}
                </p>
                <Link href="/" className='back-to-homepage'>
                    <h2>
                        {dictionary?.['Go To Homepage'] || 'Go To Homepage'}
                    </h2>
                </Link>

            </div>
            </main>
        </div>
    )
};

export default Soft404
