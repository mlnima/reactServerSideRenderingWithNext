const PostElementTitle = ({title,postElementSize}) => {
    const listType = postElementSize === 'list'?
        `  -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 3;
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
              width: ${postElementSize === 'list'? '50%' : '100%'};
              margin: 5px auto auto auto;
              max-width: 320px;
              ${listType}
             }
           `}</style>
            {title}
        </h2>
    );
};
export default PostElementTitle;
