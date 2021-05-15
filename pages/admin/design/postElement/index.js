import {useContext} from 'react';
import StyleSection from "../../../../components/adminIncludes/design/StyleSection/StyleSection";
import {AppContext} from "../../../../context/AppContext";

const postElement = () => {
    const contextData = useContext(AppContext);
    const onChangeHandler = e => {
        contextData.dispatchSiteDesign({
            ...contextData.siteDesign,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div>
                <p>Post Element Size:</p>
                <select name='postElementSize' onChange={e => onChangeHandler(e)} value={contextData.siteDesign.postElementSize}>
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
                <select name='postElementImageLoader' onChange={e => onChangeHandler(e)} value={contextData.siteDesign.postElementImageLoader}>
                    <option>select</option>
                    <option value='normal'>Normal</option>
                    <option value='next'>Next</option>
                </select>
            </div>
            {contextData.siteDesign.postElementImageLoader === 'next'?
                <div>
                    <p>Post Element Image Loader Type:</p>
                    <select name='postElementImageLoaderType' onChange={e => onChangeHandler(e)} value={contextData.siteDesign.postElementImageLoaderType}>
                        <option>select</option>
                        <option value='lazy'>Lazy</option>
                        <option value='eager'>Eager</option>
                    </select>
                </div>
            :null
            }

            <StyleSection name='postElementStyle' title='PostElement Design :'/>
        </>
    );
};
export default postElement;
