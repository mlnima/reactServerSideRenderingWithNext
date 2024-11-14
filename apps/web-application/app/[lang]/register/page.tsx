import ClientSideLogic from "./components/ClientSideLogic";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {IPageProps} from "@repo/typescript-types";

const alternatesGenerators = new AlternatesGenerators()

export const generateMetadata = async (props: IPageProps) => {
    const params = await props.params;

    return {
        title: 'Register',
        alternates: alternatesGenerators.staticPage(params.lang,'register')
    }
}
const registerPage = async (props: IPageProps) => {
    const params = await props.params;

    const {
        lang
    } = params;

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main registerPage'}>
                <ClientSideLogic/>
            </main>
        </div>
    )
}

export default registerPage;

