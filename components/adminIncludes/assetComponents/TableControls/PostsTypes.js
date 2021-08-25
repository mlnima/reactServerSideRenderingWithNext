import {useRouter} from "next/router";

const PostsTypes = () => {
    const router = useRouter()
    const onFormatChangeHandler = e => {
        router.push({
            pathname: router.pathname,
            query: {...router.query, postType: e.target.value}
        })
    }

    return (
        <div className='post-type asset-page-asset-type-selector'>
            <style jsx>{`
              .post-type {
                display: flex;
                align-items: center;
                justify-content: center;
                p {
                  margin: 0 10px;
                }
                select{
                background-color: var(--admin-input-background-color);
                }
              }
            `}</style>
            <p>Post Type :</p>
            <select onChange={e => onFormatChangeHandler(e)} value={router.query.postType}>
                <option value='all'>All</option>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='food'>Food</option>
                <option value='article'>Article</option>
                <option value='promotion'>Promotion</option>
            </select>
        </div>
    );
};
export default PostsTypes;
