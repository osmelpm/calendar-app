import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CalendarEvent, CalendarState } from "./types";

const initialState: CalendarState = {
  events: [],
  isLoadingEvents: true,
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onFetchEvents: (state, { payload }: PayloadAction<CalendarEvent[]>) => {
      state.events = payload;
      state.isLoadingEvents = false;
    },
    onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent?.id
        );
        state.activeEvent = null;
      }
    },
    onLogoutCalendar: (state) => {
      state.events = [];
      state.isLoadingEvents = true;
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onLogoutCalendar,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onFetchEvents,
} = calendarSlice.actions;
