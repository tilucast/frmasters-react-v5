import { Link } from "@reach/router";
import React from "react";

export const Pet = ({ name, animal, breed, media, location, id }) => {
  const hero = "http://placecorgi.com/300/300";

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={media.length ? media[0].small : hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};
