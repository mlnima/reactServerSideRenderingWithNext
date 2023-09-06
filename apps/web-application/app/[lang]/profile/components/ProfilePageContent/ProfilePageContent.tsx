import {FC} from "react";

interface IProps {
    dictionary:{
        [key:string]:string
    }
}

const ProfilePageContent: FC<IProps> = ({dictionary}) => {
    return (
        <main id={'primary'} className={'main profilePageContent'}>

        </main>
    )
};
export default ProfilePageContent
