import React, { useEffect, useState } from "react";

const Carousel = ({ media }) => {
  const [photos, setPhotos] = useState([]);
  const [activePhoto, setActivePhoto] = useState(0);

  let hero = ["https://placecorgi.com/600/600"];

  useEffect(() => {
    if (media.length) {
      hero = media.map(({ large }) => large);
    }
    setPhotos(hero);
  }, []);

  const handlePhotoClick = (event) => {
    setActivePhoto(+event.target.dataset.index); // parseInt, or wrap everything with Number()
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
