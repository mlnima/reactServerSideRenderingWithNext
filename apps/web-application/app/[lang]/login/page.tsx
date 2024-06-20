import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import ClientSideLogic from "./components/ClientSideLogic";

interface IProps {
    params: {
        lang: string
    }
}

const alternatesGenerators = new AlternatesGenerators()
export const generateMetadata = async ({params: {lang}}: IProps)=>({
    title: 'Login',
    alternates: alternatesGenerators.staticPage(lang,'login')
})

const loginPage = ({params: {lang}}: IProps) => {


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