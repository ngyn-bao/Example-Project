import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { skillService } from "../../services/skill.service";

export const getValueSkillApi = createAsyncThunk(
  "skill/getValueSkillApi",
  async (_, thunkAPI) => {
    const response = await skillService.getListSkill();
    console.log(response);
    return response.data.content;
  },
);

const initialState = {
  listSkill: [],
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueSkillApi.fulfilled, (state, action) => {
      state.listSkill = action.payload;
    });
  },
});

export const {} = skillSlice.actions;

export default skillSlice.reducer;
