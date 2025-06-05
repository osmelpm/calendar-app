import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

import { EventApiResp, EventCreationResp } from "./types";
import { calendarApi } from "../api";
import {
  onSetActiveEvent,
  onAddNewEvent,
  CalendarEvent,
  onDeleteEvent,
  onUpdateEvent,
  AppDispatch,
  RootState,
  onFetchEvents,
} from "../store";
import { formatEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeEvent, events } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveEvent = (calendarEvent: CalendarEvent) =>
    dispatch(onSetActiveEvent(calendarEvent));

  const startFetchingEvents = async () => {
    try {
      const { data } = await calendarApi.get<EventApiResp[]>(
        "/calendar/events"
      );
      dispatch(onFetchEvents(formatEvents(data)));
    } catch (error) {
      console.error(error);
    }
  };

  const startSavingEvent = async (
    calendarEvent: Omit<CalendarEvent, "user">
  ) => {
    try {
      if (calendarEvent.id) {
        const { id, ...event } = calendarEvent;
        //* Updating
        await calendarApi.put<EventCreationResp>(
          `/calendar/events/${id}`,
          event
        );

        dispatch(
          onUpdateEvent({
            ...calendarEvent,
            user: {
              _id: user!.uid,
              name: user!.name,
            },
          })
        );
      } else {
        //* Creating
        const {
          data: { id },
        } = await calendarApi.post<EventCreationResp>(
          "/calendar/events",
          calendarEvent
        );

        dispatch(
          onAddNewEvent({
            ...calendarEvent,
            id,
            user: {
              _id: user!.uid,
              name: user!.name,
            },
          })
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const message = data.message
          ? data.message
          : data?.errors.map((err: { msg: string }) => err.msg).join(" /n");

        Swal.fire("Saving Error", message, "error");
        return;
      }

      if (error instanceof Error) {
        Swal.fire("Saving Error", error.message, "error");
      }
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete<EventCreationResp>(
        `/calendar/events/${activeEvent?.id}`
      );
      dispatch(onDeleteEvent());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        Swal.fire("Deleting Error", data.message, "error");

        return;
      }

      if (error instanceof Error) {
        Swal.fire("Saving Error", error.message, "error");
      }
    }
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
    startFetchingEvents,
  };
};
