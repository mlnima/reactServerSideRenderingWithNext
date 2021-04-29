const PostElementTitle = ({title}) => {

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
             }
           `}</style>
            {title}
        </h2>
    );
};
export default PostElementTitle;
