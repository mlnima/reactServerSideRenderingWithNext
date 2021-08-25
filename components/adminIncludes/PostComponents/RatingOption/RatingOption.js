const RatingOption = props => {
    return (
        <div className='rating-option'>
            <select name='rating' value={props.postData.rating || 'enable'} onChange={e=>{props.onChangeHandler(e)}}>
                <option value='enable'>Enable</option>
                <option value='disable'>Disable</option>
            </select>
        </div>
    );
};
export default RatingOption;
