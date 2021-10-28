import styled from "styled-components";
const TopRightStyledSpan = styled.span`
  right: 3px;
  top: 3px;
  font-weight: bold;
`

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
        <TopRightStyledSpan  className='top-right post-element-info-data'>
            {quality }
        </TopRightStyledSpan>
    );
};
export default TopRight;
