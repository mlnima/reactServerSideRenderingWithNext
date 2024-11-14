import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import ClientSideLogic from "./components/ClientSideLogic";
import {IPageProps} from "@repo/typescript-types";

const alternatesGenerators = new AlternatesGenerators()

export const generateMetadata = async (props: IPageProps) => {
    const params = await props.params;
    return {
        title: 'Login',
        alternates: alternatesGenerators.staticPage(params.lang,'login')
    }
}

const loginPage = async (props: IPageProps) => {
    const params = await props.params;
    const {lang} = params;


    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main loginPage'}>
                <h1>Login</h1>
                <ClientSideLogic/>
            </main>
        </div>
    )
}

export default loginPage;