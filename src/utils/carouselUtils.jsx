import React from 'react';

export const carouselDots = (carouselProps) => {
  const indexes = [];
  const { slideCount, slidesToShow, currentSlide } = carouselProps;
  const lenght = Math.ceil((slideCount / slidesToShow));
  const goToSlide = index => carouselProps.goToSlide(index * carouselProps.slidesToShow);

  for (let i = 0; i < lenght; i += 1) {
    indexes.push(i);
  }

  return (
    <div className="paging-dots">
      { indexes.map(index => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={(currentSlide === index) ? 'dots active' : 'dots'}
        >
          &bull;
        </button>
      )) }
    </div>
  );
};

export default carouselDots;
