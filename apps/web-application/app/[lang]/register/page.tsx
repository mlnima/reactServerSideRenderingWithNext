import ClientSideLogic from "./components/ClientSideLogic";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";

interface IProps {
    params: {
        lang: string
    }
}

const alternatesGenerators = new AlternatesGenerators()
export const generateMetadata = async ({params: {lang}}: IProps)=>({
    title: 'Register',
    alternates: alternatesGenerators.staticPage(lang,'register')
})
const registerPage = ({params: {lang}}: IProps) => {

    return (
        <div id={'content'} className={`page-no-sidebar`}>
            <main id={'primary'} className={'main registerPage'}>
                <ClientSideLogic/>
            </main>
        </div>
    )
}

export default registerPage;

