import {FC} from "react";

interface PropTypes {
    onUniqueFieldsChangeHandler: ((e: any) => void)
}

const LocationField: FC<PropTypes> = ({onUniqueFieldsChangeHandler}) => {
    return (
        <div className={'locationField'}>
            <h3>Location</h3>
            <div className={'field-section zip-area'}>
                <p>Zipcode</p>
                <input type={'number'}
                       name={'zipCode'}
                       className={'primaryInput zip-code'}
                       onChange={onUniqueFieldsChangeHandler}/>
                <input type={'text'}
                       name={'location'}
                       className={'primaryInput location'}
                       onChange={onUniqueFieldsChangeHandler}/>
            </div>
            <div className={'field-section'}>
                <p>Street, No. (optional)</p>
                <input type={'text'}
                       name={'street'}
                       className={'primaryInput street'}
                       onChange={onUniqueFieldsChangeHandler}/>
            </div>
        </div>
    )
};

export default LocationField