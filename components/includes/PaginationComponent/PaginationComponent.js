import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'

const PaginationComponent = props => {
    const [ state, setState ] = useState({
        pages: [],
        elements:[]
    });

    let numberGen = (current) => {

        let numArr = [];
        if (current === 1) {
            for (let i = 1; i <= 7; i++) {
                numArr.push(i)
            }
        }
        if (current === 2) {
            numArr.push(1)
            for (let i = 2; i <= 7; i++) {
                numArr.push(i)
            }
        }
        if (current === 3) {
            numArr.push(1)
            numArr.push(2)
            for (let i = 3; i <= 7; i++) {
                numArr.push(i)
            }
        }
        if (current > 3) {
            let min = current - 3
            let max = current + 3
            for (let i = current; i <= max; i++) {
                numArr.push(i)
            }
            for (let i = current; i >= min; i--) {
                numArr.push(i)
            }
        }
        if (current > 3) {
            numArr.push(1)
        }
        if (Math.ceil(props.totalCount / props.size)) {
            numArr.push(parseInt(props.maxPage) - 1)
        }

        numArr = [ ...new Set(numArr) ];
        numArr = numArr.sort((x, y) => {
            return x - y
        });

        return numArr
    };



    useEffect(() => {

        setState({
            pages: numberGen(props.currentPage)
        });

    }, [ props ]);


    const renderPaginationItems= numberGen(props.currentPage).map(page=>{
        if (props.router){
            return(
                <Link key={page} href={{
                    pathname:props.router.pathname,query:{...props.router.query,page}
                }}><a>{page}</a></Link>
            )
        }
    })

    if (props.isActive) {
        return (
            <div className='pagination'>
                {renderPaginationItems }
            </div>
        );
    } else return null

};
export default withRouter(PaginationComponent);
