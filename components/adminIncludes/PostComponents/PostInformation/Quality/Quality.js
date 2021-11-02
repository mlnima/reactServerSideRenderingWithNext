import {useSelector} from "react-redux";

const Quality = props => {
    const post = useSelector((store) => store?.adminPanelPosts.post);
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Quality</p>
                </div>
                <div className="editor">
                    <div className="option">
                        <select className={'custom-select'} defaultValue={post.quality || 'HD'} name='quality' onChange={ e => props.onChangeHandler(e) }>
                            <option value='SD'>SD</option>
                            <option value='HD'>HD</option>
                            <option value='4K'>4K</option>
                            <option value='8K'>8K</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }else return null

};
export default Quality;

