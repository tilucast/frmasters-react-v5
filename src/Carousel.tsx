/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { Photo } from "@frontendmasters/pet";

interface Media {
  media: Photo[];
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

  const handlePhotoWithKeyboard = (event: KeyboardEvent) => {
    if (event.code === "ArrowRight") {
      setActivePhoto((state) => {
        if (state + 1 >= photos.length) {
          return state;
        } else {
          return state + 1;
        }
      });
    }

    if (event.code === "ArrowLeft") {
      setActivePhoto((state) => {
        if (state - 1 < 0) {
          return state;
        } else {
          return state - 1;
        }
      });
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={handlePhotoWithKeyboard}
      className="carousel"
    >
      <img src={photos[activePhoto]} alt="animal" />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {photos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={handlePhotoClick}
            className={index === activePhoto ? "active" : ""}
            css={css`
              border: none;
              outline: none;
              padding: 0;
              border-radius: 100%;
              background-color: transparent;
            `}
          >
            <img
              src={photo}
              alt="animal thumbnail"
              data-index={index}
              css={css`
                width: 100px;
                height: 100px;
                border: 4px solid ${index === activePhoto ? "#ad343e" : "red"};
                opacity: ${index === activePhoto ? 0.6 : 1};
                border-radius: 100%;
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
