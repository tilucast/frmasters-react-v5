import React, {
  useEffect,
  useState,
  useContext,
  FormEvent,
  FunctionComponent,
} from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import { Animal } from "./Details";
import { RouteComponentProps } from "@reach/router";

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState<Animal[]>([]);
  const [theme, setTheme] = useContext(ThemeContext); //theme, and the updater

  const requestPets = async (event: FormEvent) => {
    event.preventDefault();

    setTheme("darkcyan");

    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    const typedAnimals = animals.map((animal) => {
      return {
        id: animal.id,
        url: animal.url,
        name: animal.name,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        type: animal.type,
      };
    });

    setPets(typedAnimals || []);
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
