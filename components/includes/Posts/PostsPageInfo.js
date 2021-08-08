const PostsPageInfo = ({titleToRender}) => {

    const title = decodeURIComponent(titleToRender|| '')
    return (
        <div className='posts-page-info'>
            <style jsx>{`
                .posts-page-info{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    h1{
                        color:var(--main-text-color);
                        text-align: center;
                    }
                }
            
            `}</style>
            <h1> {title.trim()}</h1>
        </div>
    );
};
export default PostsPageInfo;
