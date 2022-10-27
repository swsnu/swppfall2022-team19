import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface HeroType {
  id: number;
  name: string;
  age: string;
}

export interface HeroState {
  heros: HeroType[];
  selectedHero: HeroType | null;
}

const initialState: HeroState = {
  heros: [],
  selectedHero: null,
};

export const fetchHeros = createAsyncThunk("hero/fetchHeros", async () => {
  const response = await axios.get<HeroType[]>("/api/hero/info/");
  return response.data;
});

export const fetchHero = createAsyncThunk(
  "hero/fetchHero",
  async (id: HeroType["id"], { dispatch }) => {
    const response = await axios.get(`/api/hero/info/${id}/`);
    return response.data ?? null;
  }
);

export const postHero = createAsyncThunk(
  "hero/postHero",
  async (hero: Pick<HeroType, "name" | "age" >, { dispatch }) => {
    const response = await axios.post("/api/hero/info/", hero);
    dispatch(heroActions.addHero(response.data));
  }
);

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ heros: HeroType[] }>) => {},
    getHero: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.heros.find(
        (hero) => hero.id === action.payload.targetId
      );
      state.selectedHero = target ?? null;
    },
    addHero: (
      state,
      action: PayloadAction<{ name: string; age: string }>
    ) => {
      const newHero = {
        id: state.heros[state.heros.length - 1].id + 1, // temporary
        name: action.payload.name,
        age: action.payload.age,
      };
      state.heros.push(newHero);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchHeros.fulfilled, (state, action) => {
      // Add user to the state array
      state.heros = action.payload;
    });
    builder.addCase(fetchHero.fulfilled, (state, action) => {
      state.selectedHero = action.payload;
    });
    builder.addCase(postHero.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const heroActions = heroSlice.actions;
export const selectHero = (state: RootState) => state.hero;

export default heroSlice.reducer;
