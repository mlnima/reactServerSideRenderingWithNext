// import React, { Component } from 'react';
// import Router from "../components/layouts/AppLayout";
//
// import './index.scss'
//
// class Home extends Component {
//     static async getInitialProps(context) {
//         const posts = [{title:'title1',body:'body1'}]
//
//         return {
//             posts
//         }
//     }
//     render() {
//
//         return (
//             <>
//                 <Router>
//                     <div className='HomePage'>
//                         <h1>Header 1</h1>
//                     </div>
//                 </Router>
//             </>
//         );
//     }
// }
// export default Home;

import React,{useEffect,useState,useContext} from 'react';
import { AppContext } from "../context/AppContext";
import Router from "../components/layouts/AppLayout";

const Home = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    console.log(contextData.userData )
    return (
        <Router>
            <div className='HomePage'>
                <h1>Header 1</h1>
            </div>
        </Router>
    );
};

// Home.getInitialProps = async (context)=>{
//
// };

export default Home;


//create-next-app