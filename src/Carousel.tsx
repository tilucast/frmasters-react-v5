import React, { MouseEvent, useEffect, useState } from "react";

interface Media {
  media: {
    large: string;
    full: string;
    medium: string;
    small: string;
  }[];
}

const Carousel = ({ media }: Media) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    let hero = ["https://placecorgi.com/600/600"];
    if (media.length) {
      hero = media.map(({ large }) => large);
    }
    setPhotos(hero);
  }, [media]);

  const handlePhotoClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      setActivePhoto(+event.target.dataset.index); // parseInt, or wrap everything with Number()
    }
  };

  return (
    <div className="carousel">
      <img src={photos[activePhoto]} alt="animal" />
      <div className="carousel-smaller">
        {photos.map((photo, index) => (
          // i should try to implement a interaction with the keyboard as well
          // eslint-disable-next-line
          <img
            onClick={handlePhotoClick}
            key={photo}
            src={photo}
            alt="animal thumbnail"
            data-index={index}
            className={index === activePhoto ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
