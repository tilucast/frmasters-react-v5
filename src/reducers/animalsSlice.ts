import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
  animal: string;
  breeds: string[];
  id: string;
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

export const {
  selectById: selectAnimalById,
  selectAll: selectAllAnimals,
} = animalsAdapter.getSelectors((state: RootState) => state.animals);

export default animalsSlice.reducer;
