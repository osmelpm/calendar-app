import { useEffect, useState } from "react";

import { Calendar, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Navbar,
  FabAddNew,
  FabDelete,
  CalendarModal,
  CalendarEventBox,
} from "../";
import { localizer } from "../../helpers";
import { CalendarEvent } from "../../store";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const [lastView] = useState<View>(
    (localStorage.getItem("lastView") || "week") as View
  );
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startFetchingEvents } = useCalendarStore();
  const { user } = useAuthStore();

  useEffect(() => {
    startFetchingEvents();
  }, []);

  const eventStyleGetter: EventPropGetter<CalendarEvent> = (event) => {
    const isMyEvent = user?.uid === event.user._id;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660 ",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => openDateModal();

  const onSelect = (event: CalendarEvent) => setActiveEvent(event);

  const onViewChange = (event: View) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
