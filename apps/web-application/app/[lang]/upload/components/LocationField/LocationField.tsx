import React from 'react';
import { Post } from '@repo/typescript-types';

interface PropTypes {
    setEditingPost: React.Dispatch<React.SetStateAction<Post>>;
}

const LocationField: React.FC<PropTypes> = ({ setEditingPost }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingPost(prevState => ({
            ...prevState,
            uniqueData: {
                ...(prevState?.uniqueData || {}),
                [e.target.name]: e.target.value,
            },
        }));
    };

    return (
        <div className={'locationField'}>
            <h3>Location</h3>
            <div className={'field-section zip-area'}>
                <p>Zipcode</p>
                <input
                    type={'number'}
                    name={'zipCode'}
                    className={'primaryInput zip-code'}
                    onChange={e => onChangeHandler(e)}
                />
                <input
                    type={'text'}
                    name={'location'}
                    className={'primaryInput location'}
                    onChange={e => onChangeHandler(e)}
                />
            </div>
            <div className={'field-section'}>
                <p>Street, No. (optional)</p>
                <input
                    type={'text'}
                    name={'street'}
                    className={'primaryInput street'}
                    onChange={e => onChangeHandler(e)}
                />
            </div>
        </div>
    );
};

export default LocationField;
