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
import { Animal as ModifiedAnimal } from "./Details";
import { RouteComponentProps } from "@reach/router";
import {
  selectAllAnimals,
  selectAnimalById,
  setAnimal as setStoreAnimal,
  setBreeds as setBreedsStore,
} from "./reducers/animalsSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const currentAnimalOnState = useAppSelector((state) => state.animals.animal);

  const allAnimalsState = useAppSelector(selectAllAnimals);

  const dispatch = useAppDispatch();

  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [animal, AnimalDropdown] = useDropdown(
    "Animal",
    currentAnimalOnState || "dog",
    ANIMALS
  );
  const animalsState = useAppSelector((state) =>
    selectAnimalById(state, animal)
  );
  const [breed, BreedDropdown, __] = useDropdown(
    "Breed",
    "",
    animalsState?.breeds || breeds
  );
  const [pets, setPets] = useState<ModifiedAnimal[]>([]);
  const [theme, setTheme] = useContext(ThemeContext);

  const requestPets = /*async*/ (event: FormEvent) => {
    event.preventDefault();

    setTheme("darkcyan");

    pet.animals({ location, breed, type: animal }).then(({ animals }) => {
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
    });

    // const { animals } = await pet.animals({
    //   location,
    //   breed,
    //   type: animal,
    // });

    // const typedAnimals = animals.map((animal) => {
    //   return {
    //     id: animal.id,
    //     url: animal.url,
    //     name: animal.name,
    //     location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
    //     description: animal.description,
    //     media: animal.photos,
    //     breed: animal.breeds.primary,
    //     type: animal.type,
    //   };
    // });

    // setPets(typedAnimals || []);
  };

  useEffect(() => {
    dispatch(setStoreAnimal(animal));

    const findAnimal = allAnimalsState.find(
      (animal) => animal.animal === animalsState?.animal
    );

    if (findAnimal) return;

    pet.breeds(animal).then(({ breeds }) => {
      const breedsToString = breeds.map(({ name }) => name);
      setBreeds(breedsToString);
      dispatch(setBreedsStore({ animal, breeds: breedsToString, id: animal }));
    }, console.error);
  }, [animal, dispatch, allAnimalsState, animalsState?.animal]);

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
          // disabled={!breed} / comment this line when running testes here. Uncomment it afterwards. or not.
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
