import { getDictionary } from '../../../get-dictionary';
import './page.styles.scss';
import MessengerPageContent from './components/messengerPageContent/MessengerPageContent';
import { IPageProps } from '@repo/typescript-types';
import localDetector from "@lib/localDetector";

export const generateMetadata = async () => {
    return {
        // alternates: {
        //     canonical: '/messenger',
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/messenger`
        //             return finalValue
        //         },{}),
        // },
        title: 'Messenger',
    };
};

const MessengerPage = async (props: IPageProps) => {
    const params = await props.params;

    const { lang } = params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);

    return (
        <div id={'content'} className={`page-no-sidebar messengerPageParent`}>
            <main id={'primary'} className={'main messengerPage'}>
                <MessengerPageContent dictionary={dictionary} />
            </main>
        </div>
    );
};

export default MessengerPage;
