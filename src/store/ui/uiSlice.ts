import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    // addNewEmptyNote: (state, { payload }: PayloadAction<Note>) => {
    //   state.notes.push(payload);
    //   state.isSaving = false;
    // },
  },
  // extraReducers: (builder) => {
  //   // builder.addCase(startNote.fulfilled, (state, { payload }) => {
  //   //   state.notes.push(payload.note);
  //   //   state.isSaving = false;
  //   //   state.active = payload.note;
  //   // });
  // },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
