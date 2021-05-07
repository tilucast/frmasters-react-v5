import React, { useContext, useEffect, useState } from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import pet, { Photo } from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

export interface Animal {
  id: string | number;
  url: string;
  name: string;
  type: string;
  location: string;
  description: string;
  media: Photo[];
  breed: string;
}

type RouteParams = { id: number };

const Details: any = ({ id }: RouteComponentProps<RouteParams>) => {
  // couldnt find an answer online, so ill leave it as any

  const [animal, setAnimal] = useState<Animal>({
    id: "",
    url: "",
    name: "",
    breed: "",
    description: "",
    location: "",
    media: [],
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: null });
  const [showModal, setShowModal] = useState(false);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    pet
      .animal(id)
      .then(({ animal }) => {
        setAnimal({
          id: animal.id,
          url: animal.url,
          name: animal.name,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          type: animal.type,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError({ error: true, message: error });
        setLoading(false);
      });
  }, [id]);

  const toggleModal = () => setShowModal((state) => !state);
  const adoptPet = () => navigate(animal.url);

  if (loading) return <h1>Loading ...</h1>;
  if (error.error) {
    return <h1>Something happened. This seems like it doesn't exists :/</h1>;
  }

  const { name, breed, location, description, media, type } = animal;

  return (
    <div className="details">
      <Carousel media={media} />
      <div className="">
        <h1>{name}</h1>
        <h2>{`${type} - ${breed} - ${location}`}</h2>
        <button
          className="adopt-button"
          onClick={toggleModal}
          style={{ backgroundColor: theme }}
        >
          Adopt {name}!
        </button>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div className="">
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={adoptPet}>Yes</button>
                <button onClick={toggleModal}>No, i'm cool.</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Details;
