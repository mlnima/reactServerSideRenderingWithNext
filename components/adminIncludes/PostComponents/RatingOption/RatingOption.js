const RatingOption = props => {
    return (
        <select className={'custom-select'} name='rating' value={props.postData.rating || 'enable'} onChange={e=>{props.onChangeHandler(e)}}>
            <option value='enable'>Enable</option>
            <option value='disable'>Disable</option>
        </select>
    );
};
export default RatingOption;
