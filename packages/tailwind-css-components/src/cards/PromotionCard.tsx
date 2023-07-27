import React from 'react';

interface IProps {
    thumbnail: string; // URL of the thumbnail
    quality: string; // Quality of the video
    duration: string; // Duration of the video
    playTrailer: () => void; // Function to play the trailer
    title: string; // Title of the video
    views: number; // Number of views
}

const PromotionCard: React.FC<IProps> = ({thumbnail,title, views}) => {
    return (
        <div className="relative w-full md:w-[255px] h-[143.5px] md:h-auto">
            <img className="w-full h-full object-cover" src={thumbnail} alt={title}/>
            <div className="mt-2 text-sm font-medium">{title}</div>
            <div className="text-xs text-gray-600">{views} views</div>
        </div>
    );
}

export default PromotionCard;