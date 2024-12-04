import ClientSideLogic from './components/ClientSideLogic';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

const alternatesGenerators = new AlternatesGenerators();

export const generateMetadata = async (props: IPageProps) => {
    const params = await props.params;
    const locale = localDetector(params.lang);
    return {
        title: 'Register',
        alternates: alternatesGenerators.staticPage(locale, 'register'),
    };
};

const registerPage = () => {
    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main registerPage'}>
                <ClientSideLogic />
            </main>
        </div>
    );
};

export default registerPage;
