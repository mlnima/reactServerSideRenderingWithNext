import {useState} from 'react'
//import Analytics from '../../components/adminIncludes/Analytics/Analytics'
import Link from "next/link";
import _ from "lodash";
import styled from "styled-components";
const AdminHomePageStyledDiv = styled.div`
  h1{
    text-align: center;
  }
  .quick-access{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

   .quick-access-link{
     font-size: 12px;
     width: 150px;
     text-align: center;
     padding: 30px 10px;
     margin: 20px;
     color: white;
     background-color: black;
     border-radius: 10px;
     &:hover{
       transition: .4s;
       transform: scale(1.1);
     }
   }
  }
`
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
            },
            {
                name: 'Terminal',
                pathURL: '/admin/tools/terminal',
            }
        ]
    })


    const renderQuickAccessLinks = state.quickAccessLinks.map(linkData => {
       // const url = state?.quickAccessLinks?.[link].pathURL

        return(

            <Link key={_.uniqueId('id_')} href={linkData.pathURL}>
                <a className='quick-access-link'>
                    {linkData.name}
                </a>
            </Link>
        )
        // return null
    })
    return (
        <AdminHomePageStyledDiv>

            <h1>Dashboard</h1>
            <h2>Quick Access</h2>
            <div className='quick-access'>

                {renderQuickAccessLinks}
            </div>


            {/*<Analytics/>*/}
        </AdminHomePageStyledDiv>

    );
};
export default AdminHomePage;