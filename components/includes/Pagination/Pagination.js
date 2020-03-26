import React, { useEffect, useState, useContext } from 'react';
import Link from "next/link";


const Pagination = props => {
    const [ state, setState ] = useState({
        pages: [],
    });

    useEffect(() => {
        if (isNaN(props.postsData.pageNo)) {
            let pageNo = 1;
            setState({
                pages: numberGen(pageNo)
            });
        } else {
            setState({
                pages: numberGen(props.postsData.pageNo)
            });
        }
    }, [ props ]);

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
        if (Math.ceil(props.postsData.totalCount / props.postsData.size)) {
            numArr.push(parseInt(props.maxPage) - 1)
        }

        numArr = [ ...new Set(numArr) ];
        numArr = numArr.sort((x, y) => {
            return x - y
        });

        return numArr
    };

    let currentPageNumberStyle = (number) => {
        let style = {};
        let normalStyle = {
            color: 'white'
        };
        let activeStyle = {
            background: 'none',
            backgroundColor: ' #f90',
            color: ' #151719',
            fontWeight: 'bold',
            fontSize: 'large'
        };

        if (isNaN(props.activePage)) {
            let pageNo = 1;
            if (number === pageNo) {
                style = activeStyle
            }
        } else {
            if (number === props.activePage) {
                style = activeStyle
            } else {
                style = normalStyle
            }
        }
        return style
    };

    let pageNumbersGenerator = state.pages.map(num => {
        // let min = parseInt(props.maxPage) -3
        if (num > 0 && num <= (Math.ceil(props.totalCount / props.size) - 1)) {
            let numInBtn = num.toString();
            let path = props.mainLinkUrl + numInBtn
            return (<Link key={ num } href={ path }> <a style={ currentPageNumberStyle(num) }><span> { numInBtn } </span></a> </Link>)
        }

    });

    if (props.pagination) {
        return (
            <div className='Pagination'>
                { pageNumbersGenerator }
            </div>
        );
    } else {
        return null
    }

};
export default Pagination;