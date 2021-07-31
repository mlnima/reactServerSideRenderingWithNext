import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";

const EditLinkForAdmin = ({_id}) => {
    const contextData = useContext(AppContext);
    if (contextData.userData.role === 'administrator') {
        return (
            <Link href={`/admin/post?id=${_id}`}>
                <a className='edit-btn-admin'>
                    <style jsx>{`
                        .edit-btn-admin{
                            color:var(--main-text-color);
                            background-color:var(--custom-green);
                            padding: 10px 20px;
                            margin: 20px 0 ;
                        }
                    `}</style>
                    Edit as Admin
                </a>
            </Link>
        )
    } else return null
};
export default EditLinkForAdmin;
