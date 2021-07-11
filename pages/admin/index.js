import {useState} from 'react'
//import Analytics from '../../components/adminIncludes/Analytics/Analytics'
import Link from "next/link";
import _ from "lodash";

const AdminHomePage = () => {
    const [state, setState] = useState({
        quickAccessLinks: [
            {
                name: 'Posts',
                pathURL: '/admin/assets?assetsType=posts'
            },
            {
                name: 'Users',
                pathURL: '/admin/assets?assetsType=users',
            },
            {
                name: 'Pages',
                pathURL: '/admin/assets?assetsType=pages',
            },
            {
                name: 'File Manager',
                pathURL: '/admin/fileManager',
            },
            {
                name: 'Widgets',
                pathURL: '/admin/design/widgets',
            },
            {
                name: 'Custom Styles',
                pathURL: '/admin/design/customStyles',
            },
            {
                name: 'Custom Colors',
                pathURL: '/admin/design/customColors',
            }
        ]
    })


    const renderQuickAccessLinks = state.quickAccessLinks.map(linkData => {
       // const url = state?.quickAccessLinks?.[link].pathURL

        return(

            <Link key={_.uniqueId('id_')} href={linkData.pathURL}>
                <a className='quick-access-link'>
                <style jsx>{`
                .quick-access-link{
                padding: 5px 10px;
                margin: 0 5px;
                color: white;
                background-color: black;
                }
                `}</style>
                    {linkData.name}
                </a>
            </Link>
        )
        // return null
    })
    return (
        <div>
            <style jsx>{`
                h1{
                    text-align: center;
                }
                .quick-access{
                
                }

            `}</style>
            <h1>Dashboard</h1>
            <div className='quick-access'>
                <h2>Quick Access</h2>
                {renderQuickAccessLinks}
            </div>


            {/*<Analytics/>*/}
        </div>

    );
};
export default AdminHomePage;