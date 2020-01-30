import React, { Component } from 'react';
import Router from "../components/layouts/AppLayout";

import './index.scss'

class Home extends Component {
    static async getInitialProps(context) {
        const posts = [{title:'title1',body:'body1'}]

        return {
            posts
        }
    }
    render() {

        return (
            <>
                <Router>
                    <div className='HomePage'>
                        <h1>Header 1</h1>
                    </div>
                </Router>
            </>
        );
    }
}

export default Home;


//create-next-app