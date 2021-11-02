import {useDispatch, useSelector} from "react-redux";
import {editDesign} from "../../../../store/actions/settingsActions";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
const StyleSection = dynamic(() => import('../../../../components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const postElement = () => {
    const design = useSelector((store:StoreTypes) => store.settings.design)
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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})


export default postElement;
