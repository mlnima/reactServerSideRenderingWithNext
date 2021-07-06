import ImageRenderer from "../ImageRenderer/ImageRenderer";

const MetaElementImage = props => {
    // console.log(props)
    return (
        <div className='meta-element-image-data'>
<style jsx>{`
.meta-element-image-data{
position: relative;
width: 100%;
max-width:48vw;
aspect-ratio:16/9;
}
`}</style>
            <ImageRenderer
                imageUrl={props.imageUrl || props.noImageUrl}
                postElementSize={props.postElementSize}
                hoverHandler={props.hoverHandler}
                quality={props.quality}
                classNameValue='meta-element-image'
                loading='lazy'
                layout='fill'/>
        </div>
    );
};
export default MetaElementImage;
