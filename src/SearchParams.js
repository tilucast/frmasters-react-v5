import React, { useEffect, useState, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext); //theme, and the updater

  const requestPets = async (event) => {
    event.preventDefault();

    setTheme("darkcyan");

    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  };

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedsToString = breeds.map(({ name }) => name);
      setBreeds(breedsToString);
    }, console.error);
  }, [animal, setBreed]);

  return (
    <div className="search-params">
      <form onSubmit={requestPets}>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button
          style={{ backgroundColor: theme }}
          type="submit"
          disabled={!breed}
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
