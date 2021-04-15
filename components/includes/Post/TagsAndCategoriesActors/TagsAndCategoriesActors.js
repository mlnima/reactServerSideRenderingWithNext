import React, {useEffect, useState, useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import { faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
let StyledDiv = styled.div`${props => props.stylesData}`;


const TagsAndCategoriesActors = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        data: props.data || [],
        type: props.type,
        fontawesome: ''
    });

    // const [styles, setStyles] = useState({
    //         color: 'white',
    //         backgroundColor: 'red'
    // })

    // useEffect(() => {
    //
    //     setStyles({
    //         ...styles,
    //         color: contextData.siteDesign.postMetaDataTextColor || 'white',
    //         backgroundColor: contextData.siteDesign.postMetaDataBackgroundColor || 'red',
    //     })
    // }, [contextData.siteDesign]);

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
        const path = `/posts?content=${item._id}`;
        const icon = state.type === 'categories' ? faFolder
            : state.type === 'tags' ? faTag
                : state.type === 'actors' ? faStar
                    : faTag
        return (
            <div key={item.name}  className='post-meta-item'>
                <FontAwesomeIcon icon={icon} className='meta-data-logo'  />
                <Link href={path}   key={item.name}>
                    <a className={state.type} >{item.name}</a>
                </Link>
            </div>
        )
    });

    if (props.data.length >= 1) {
        return (
            <StyledDiv className={state.type + ' tags-categories-actors'}>
                <span style={{color:contextData.siteDesign.postDescriptionTextColorColor || 'white'}}> {state.type.charAt(0).toUpperCase() + state.type.substring(1)}:</span>
                <div className="content">
                    {renderData}
                </div>
            </StyledDiv>
        );
    } else return null

};
export default TagsAndCategoriesActors;