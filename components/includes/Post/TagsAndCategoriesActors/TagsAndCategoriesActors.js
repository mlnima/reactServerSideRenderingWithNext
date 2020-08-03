import React, {useEffect, useState, useContext} from 'react';
import Link from "next/link";
import FA from 'react-fontawesome'
import StarSvg from '../../../../static/images/fontawesome/star-solid.svg';
import TagSvg from '../../../../static/images/fontawesome/tag-solid.svg';
import CategorySvg from '../../../../static/images/fontawesome/folder-solid.svg';
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import {AppContext} from "../../../../context/AppContext";
import {faBars, faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const TagsAndCategoriesActors = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        data: props.data || [],
        type: props.type,
        fontawesome: ''
    });

    const [styles, setStyles] = useState({
            color: 'white',
            backgroundColor: 'red'
    })

    useEffect(() => {
        console.log(contextData.siteDesign)
        setStyles({
            ...styles,
            color: contextData.siteDesign.postMetaDataTextColor || 'white',
            backgroundColor: contextData.siteDesign.postMetaDataBackgroundColor || 'red',
        })
    }, [contextData.siteDesign]);




    useEffect(() => {
        let fontawesome = '';
        switch (props.type) {
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


    const renderData = props.data.map(item => {
        // let typeForUrl = state.type === 'categories' ? 'category'
        //     : state.type === 'tags' ? 'tag'
        //         : state.type === 'actors' ? 'actor'
        //             : 'tag'
        //
        const path = `/posts?content=${item._id}`;
        const icon = state.type === 'categories' ? faFolder
            : state.type === 'tags' ? faTag
                : state.type === 'actors' ? faStar
                    : faTag
        return (
            <div key={item.name} style={styles} className='post-meta-item'>
                <FontAwesomeIcon icon={icon} className='meta-data-logo'  />
                {/*<img className='fontawesomeSvgSmall' src={icon} alt=""/>*/}
                <Link href={path}   key={item.name}><a className={state.type} style={styles}>{item.name}</a></Link>
            </div>
        )
    });

    if (props.data.length >= 1) {
        return (
            <div className={state.type + ' tags-categories-actors'}>
                <span style={{color:contextData.siteDesign.postDescriptionTextColorColor || 'white'}}> {state.type.charAt(0).toUpperCase() + state.type.substring(1)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </div>
        );
    } else return null

};
export default TagsAndCategoriesActors;