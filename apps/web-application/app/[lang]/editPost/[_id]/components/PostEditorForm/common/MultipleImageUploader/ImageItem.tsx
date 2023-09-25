// @ts-nocheck
'use client';
import React, {useRef, useEffect, useCallback} from 'react';
import {useDrag, useDrop, useDragLayer} from 'react-dnd';
// @ts-ignore
import throttle from 'lodash.throttle';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './ImageItem.styles.scss'

export interface ImageItemProps {
    image: any;
    index: number;
    moveImage: Function;
    setPreviewImage: Function;
    setPreviewStyle: Function;
    removeImage: Function;
}

export const ImageItem: React.FC<ImageItemProps> = (
    {
        image,
        index,
        moveImage,
        setPreviewImage,
        setPreviewStyle,
        removeImage
    }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'image',
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag, preview] = useDrag({
        type: 'image',
        item: {image, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: () => {
            setPreviewImage(null);
        },
    });

    const {initialOffset, currentOffset} = useDragLayer((monitor) => ({
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
    }));

    drag(drop(ref));

    const throttledSetPreviewStyle = useCallback(
        throttle((file: File, currentOffset: any) => {
            setPreviewImage(file);
            setPreviewStyle({
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 100,
                left: currentOffset.x,
                top: currentOffset.y,
                transform: 'translate(0, 0)',
            });
        }, 100),
        [setPreviewImage, setPreviewStyle],
    );

    useEffect(() => {
        const handleTouchEnd = () => {
            if (isDragging) {
                setPreviewImage(null);
            }
        };
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, setPreviewImage]);

    useEffect(() => {
        if (isDragging && currentOffset) {
            throttledSetPreviewStyle(image, currentOffset);
        }
    }, [isDragging, currentOffset, image, throttledSetPreviewStyle]);

    const handleRemoveImage = () => {
        removeImage(index);
    };

    const imageStyle: React.CSSProperties = isDragging ? {width: '80px', height: '80px', objectFit: 'cover'} : {};

    return (
        <div className={"imageItem"} ref={ref}>
            <FontAwesomeIcon onClick={handleRemoveImage}
                             className={'remove-btn'}
                             icon={faXmark}
                             style={{width: 24, height: 24}}/>
            <img src={typeof image === 'string' ? image : image?.filePath} alt="" style={imageStyle}/>
        </div>
    );
};
