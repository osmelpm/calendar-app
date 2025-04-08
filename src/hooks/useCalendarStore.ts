import { useDispatch, useSelector } from "react-redux";

import {
  RootState,
  AppDispatch,
  onAddNewEvent,
  CalendarEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSetActiveEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeEvent, events } = useSelector(
    (state: RootState) => state.calendar
  );

  const setActiveEvent = (calendarEvent: CalendarEvent) =>
    dispatch(onSetActiveEvent(calendarEvent));

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    //TODO:
    //* Go to backend
    if (calendarEvent._id) {
      //* Updating
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      //* Creating
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = async () => {
    //* Go to backend
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
