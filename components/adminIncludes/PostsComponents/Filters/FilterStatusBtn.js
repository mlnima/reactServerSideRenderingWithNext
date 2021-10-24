// import React, { useContext } from 'react';
// import { AppContext } from "../../../../context/AppContext";
// import Link from 'next/link'
//
// const FilterStatusBtn = props => {
//     const contextData = useContext(AppContext);
//
//     // const onClickHandler = e => {
//     //     let status = e.target.name;
//     //     contextData.dispatchAdminPostsData(adminPostsData => ({
//     //         ...adminPostsData,
//     //         status,
//     //         pageNo: 1,
//     //         author: 'all'
//     //     }))
//     // };
//
//     return (
//         <div className='FilterStatusBtn'>
//             {/*<Link href={ {*/}
//             {/*    pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'all' }*/}
//             {/*} }><a className='adminPaginationActionLink'>All</a></Link>*/}
//             {/*<Link href={ {*/}
//             {/*    pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'draft' }*/}
//             {/*} }><a className='adminPaginationActionLink'>Draft</a></Link>*/}
//             {/*<Link href={ {*/}
//             {/*    pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'published' }*/}
//             {/*} }><a className='adminPaginationActionLink'>Published</a></Link>*/}
//             {/*<Link href={ {*/}
//             {/*    pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'pending' }*/}
//             {/*} }><a className='adminPaginationActionLink'>Pending</a></Link>*/}
//             {/*<Link href={ {*/}
//             {/*    pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'trash' }*/}
//             {/*} }><a className='adminPaginationActionLink'>Trash</a></Link>*/}
//             {/*<Link href={ {*/}
//             {/*    pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'true' }*/}
//             {/*} }><a className='adminPaginationActionLink'>Reported</a></Link>*/}
//
//         </div>
//     );
// };
// // export default FilterStatusBtn;