import React from "react";
import { Animal } from "./Details";
import { Pet } from "./Pet";

let Results: React.FC<{ pets: Animal[] }> = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.type}
            breed={pet.breed}
            media={pet.media}
            location={pet.location}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

Results = React.memo(Results);

export default Results;
