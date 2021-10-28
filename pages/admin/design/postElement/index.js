import StyleSection from "../../../../components/adminIncludes/design/StyleSection/StyleSection";
import {useDispatch, useSelector} from "react-redux";
import {editDesign} from "../../../../store/actions/settingsActions";

const postElement = () => {
    const design = useSelector(state => state.settings.design)
    const dispatch = useDispatch()

    return (
        <>
            <div>
                <p>Post Element Size:</p>
                <select name='postElementSize' onChange={e => dispatch(editDesign(e))} value={design.postElementSize}>
                    <option>select</option>
                    <option value='list'>List</option>
                    <option value='smaller'>smaller</option>
                    <option value='small'>small</option>
                    <option value='medium'>medium</option>
                    <option value='large'>large</option>
                    <option value='larger'>larger</option>
                </select>
            </div>
            <div>
                <p>Post Element Image Loader:</p>
                <select name='postElementImageLoader' onChange={e => dispatch(editDesign(e))} value={design.postElementImageLoader}>
                    <option>select</option>
                    <option value='normal'>Normal</option>
                    <option value='next'>Next</option>
                </select>
            </div>
            {design.postElementImageLoader === 'next' ?
                <div>
                    <p>Post Element Image Loader Type:</p>
                    <select name='postElementImageLoaderType' onChange={e => dispatch(editDesign(e))} value={design.postElementImageLoaderType}>
                        <option>select</option>
                        <option value='lazy'>Lazy</option>
                        <option value='eager'>Eager</option>
                    </select>
                </div>
                : null
            }

            <StyleSection name='postElementStyle' title='PostElement Design :'/>
        </>
    );
};
export default postElement;
