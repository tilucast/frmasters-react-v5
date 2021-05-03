import React, { useEffect, useState } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";

const Details = (props) => {
  const [animal, setAnimal] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pet.animal(props.id).then(({ animal }) => {
      setAnimal({
        animal: animal.name,
        name: animal.name,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
      });
      setLoading(false);
    }, console.error);
  }, [props.id]);

  if (loading) return <h1>Loading ...</h1>;

  const {
    name,
    breed,
    location,
    description,
    animal: animalApi,
    media,
  } = animal;

  return (
    <div className="details">
      <Carousel media={media} />
      <div className="">
        <h1>{name}</h1>
        <h2>{`${animalApi} - ${breed} - ${location}`}</h2>
        <button>Adopt {name}!</button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Details;
