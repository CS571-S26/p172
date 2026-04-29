import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Carousel
        interval={null}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        prevLabel="Previous image"
        nextLabel="Next image"
      >
        {images.map((src, idx) => (
          <Carousel.Item key={`${src}-${idx}`}>
            <img
              className="d-block w-100"
              style={{ height: '450px', objectFit: 'cover' }}
              src={src}
              alt={`${title} photo ${idx + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex gap-2 p-3 bg-white flex-wrap justify-content-center" aria-label="Image thumbnails">
        {images.map((src, idx) => (
          <button
            key={`thumb-${src}-${idx}`}
            type="button"
            className={`p-0 border-0 bg-transparent ${activeIndex === idx ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Show image ${idx + 1}`}
          >
            <img
              src={src}
              alt={`${title} thumbnail ${idx + 1}`}
              style={{
                width: '72px',
                height: '56px',
                objectFit: 'cover',
                borderRadius: '8px',
                outline: activeIndex === idx ? '2px solid #6366f1' : '1px solid #cbd5e1',
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ImageCarousel;
