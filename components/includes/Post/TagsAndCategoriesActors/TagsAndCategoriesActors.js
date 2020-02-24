import React, { useEffect, useState, useContext } from 'react';
import Link from "next/link";
import FA from 'react-fontawesome'

const TagsAndCategoriesActors = props => {
    const [ state, setState ] = useState({
        data: props.data || [],
        type: props.type || 'tags',
        fontawesome: ''
    });

    useEffect(() => {
        let fontawesome = '';
        switch ( props.type ) {
            case 'actors':
                fontawesome = 'star'
                break
            case 'tags':
                fontawesome = 'tags'
                break
            case 'categories':
                fontawesome = 'folder'
                break
        }

        setState({
            ...state,
            fontawesome
        })
    }, []);

    const renderData = state.data.map(item => {
        const path = '/' + state.type + '/' + item;
        return (
            <Link href={ path } key={ item }><a className={ state.type }>{ item }</a></Link>
        )
    });

    if (props.data.length > 1) {
        return (
            <div className={ state.type + ' tags-categories-actors' }>
                <span><FA className='fontawesomeMedium' name={ state.fontawesome }/> { state.type.charAt(0).toUpperCase() + state.type.substring(1) }:</span>
                <div className="content">
                    { renderData }
                </div>
            </div>
        );
    } else return null

};
export default TagsAndCategoriesActors;