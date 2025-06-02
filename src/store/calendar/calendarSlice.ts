import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

import { CalendarEvent, CalendarState } from "./types";

const events: CalendarEvent[] = [
  {
    _id: new Date().getTime(),
    title: "My birthday",
    notes: "It's my birthday today",
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      _id: "123",
      name: "John Doe",
    },
  },
];

const initialState: CalendarState = {
  events,
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent?._id
        );
        state.activeEvent = null;
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(startNote.fulfilled, (state, { payload }) => {
  //     state.notes.push(payload.note);
  //     state.isSaving = false;
  //     state.active = payload.note;
  //   });
  // },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
