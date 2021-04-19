const PostsPageInfo = props => {
    const metaType = props.metaType||''
    const upperCaseMeta = metaType.charAt(0).toUpperCase() + metaType.slice(1);
    return (
        <div className='posts-page-info'>
            <h1>{upperCaseMeta} : {decodeURI(props.metaName)}</h1>
        </div>
    );
};
export default PostsPageInfo;
