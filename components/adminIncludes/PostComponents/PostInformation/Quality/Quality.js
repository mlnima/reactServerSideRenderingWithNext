const Quality = props => {
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Quality</p>
                </div>
                <div className="editor">
                    <div className="option">
                        <select defaultValue={props.postData.quality} name='quality' onChange={ e => props.onChangeHandler(e) }>
                            <option value='240p'>240p</option>
                            <option value='360p'>360p</option>
                            <option value='480p'>480p</option>
                            <option value='720p'>720p</option>
                            <option value='1080p'>1080p</option>
                            <option value='1440p'>1440p</option>
                            <option value='2160p'>2160p</option>
                            <option value='4120p'>4120p</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }else return null

};
export default Quality;

