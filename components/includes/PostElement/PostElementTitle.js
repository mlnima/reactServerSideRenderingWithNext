const PostElementTitle = ({title,postElementSize}) => {
    const listType = postElementSize === 'list'?
        `  -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin: 0 0 0 2px;`
        :''

    return (
        <h2 className='post-element-title'>
            <style jsx>{`
             .post-element-title{
              color:var(--post-element-text-color);
              font-size: 1rem;
              text-overflow: ellipsis;
              overflow: hidden;
              word-wrap: break-word;
              font-weight: initial;
              white-space: nowrap;
              width: 100%;
              margin: auto;
              max-width: 320px;
              ${listType}
             }
           `}</style>
            {title}
        </h2>
    );
};
export default PostElementTitle;
