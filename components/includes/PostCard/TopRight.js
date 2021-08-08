const TopRight = props => {

    const quality =  props.quality === '2160p' ? '4K' :
                     props.quality === '1440p' ? '2K' :
                     props.quality === '1080p' ? 'HD' :
                     props.quality === '720p' ? 'SD' :
                     props.quality === '480p' ? 'SD' :
                     props.quality === '360p' ? 'SD' :
                     props.quality === '240p' ? 'SD' :
                     props.quality


    return (
        <span  className='top-right post-element-info-data'>
            <style jsx>{`
                      .top-right{
                        right: 3px;
                        top: 3px;
                        font-weight: bold;
                      }
                `}</style>
            {quality }
        </span>
    );
};
export default TopRight;
