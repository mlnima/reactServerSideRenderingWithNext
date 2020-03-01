// import React, { useEffect } from 'react';
import React, { Component } from 'react';
import Logo from "./Logo/Logo";
import withRouter from "next/dist/client/with-router";

// const Header = props => {
//     useEffect(()=>{
//         console.log( props)
//     },[ props]);
//     return (
//         <div className='Header'>
//             <Logo/>
//         </div>
//     );
// };
//
// Header.getInitialProps = async ({pathname,query,req,res,err}) =>{
//     let testData = {
//         name : 'nima'
//     }
//     return {data:testData}
// }

class Header extends Component {
    static async getInitialProps({ req }) {
        let testData = {
            name: 'nima'
        }
        return { data: testData }
    }

    render() {
        console.log(this.props)
        return (
            <div className='Header'>
                <Logo/>
            </div>
        );
    }
}

export default Header;
// export default withRouter(Header);
