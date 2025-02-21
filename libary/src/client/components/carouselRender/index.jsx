import React from 'react';

const slideStyleCarousel = {
    borderRadius: 6,
    width: '100%',
    margin: 0,
    height: '24rem',
    color: '#fff',
    lineHeight: '50vh',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textShadow: '0 1px 2px rgb(0 0 0 / 60%)',
};

const CarouselSlide = ({ text, image, position='center' }) => {
    return (
        <div
            style={{
                ...slideStyleCarousel,
                backgroundImage: `url(${image})`,
                backgroundPosition: position,
            }}
        >
            <h1>{text}</h1>
        </div>
    );
};

export default CarouselSlide;
