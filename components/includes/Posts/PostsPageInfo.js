const PostsPageInfo = ({titleToRender}) => {
    return (
        <div className='posts-page-info'>
            <style jsx>{`
                h1{
                    color:var(--main-text-color);
                }
            `}</style>
            <h1> {decodeURI(titleToRender)}</h1>
        </div>
    );
};
export default PostsPageInfo;
