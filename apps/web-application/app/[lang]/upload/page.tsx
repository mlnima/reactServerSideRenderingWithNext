import { getDictionary } from '../../../get-dictionary';
import './page.scss';
import UploadPageContent from './components/UploadPageContent/UploadPageContent';
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";



const uploader = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const {
        lang
    } = params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main uploadPage'}>
                <UploadPageContent
                    _id={searchParams?._id as string}
                    postType={searchParams?.postType as string}
                    dictionary={dictionary}
                    locale={locale}
                />
            </main>
        </div>
    );
};

export default uploader;

export const dynamic = 'force-dynamic';
export const generateMetadata = async () => {
    return {
        title: 'Edit Post',
    };
};
