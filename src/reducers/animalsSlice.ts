import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
  ids: string[];
  animal: string;
  entities: {
    animal: string;
    breeds: string[];
  };
}

const animalsAdapter = createEntityAdapter<State>();
const initialState = animalsAdapter.getInitialState({ animal: "dog" });

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    setAnimal: (state, action) => {
      state.animal = action.payload;
    },
    setBreeds: (state, action) => {
      animalsAdapter.addOne(state, action.payload);
    },
  },
});

export const { setAnimal, setBreeds } = animalsSlice.actions;

export const { selectById: selectAnimalById } = animalsAdapter.getSelectors(
  (state: RootState) => state.animals
);

export default animalsSlice.reducer;
