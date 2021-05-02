const PostsPageInfo = props => {
    const metaType = props.metaType||''
    const upperCaseMeta = metaType.charAt(0).toUpperCase() + metaType.slice(1);
    return (
        <div className='posts-page-info'>
            <style jsx>{`
h1{
color:var(--main-text-color);
}
`}</style>
            <h1>{upperCaseMeta} : {decodeURI(props.metaName)}</h1>
        </div>
    );
};
export default PostsPageInfo;
