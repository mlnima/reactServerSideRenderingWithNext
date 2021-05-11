import ImageRenderer from "../ImageRenderer/ImageRenderer";

const MetaElementImage = props => {
    return (
        <div className='meta-element-image-data'>
<style jsx>{`
.meta-element-image-data{
width: 100%;
max-width:320px;
aspect-ratio:16/9;
}
`}</style>
            <ImageRenderer
                imageUrl={props.imageUrl || props.noImageUrl}
                hoverHandler={props.hoverHandler}
                quality={props.quality}
                classNameValue='meta-element-image'
                loading='lazy'
                layout='fill'/>
        </div>
    );
};
export default MetaElementImage;
